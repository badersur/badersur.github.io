'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfigs = require('./webpack.config.js');
const path = require('path');
const del = require('del'); // rm -rf
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const moduleImporter = require('sass-module-importer');
const MarkdownIt = require('markdown-it');
const workbox = require('workbox-build');

const fsRead = require('fs').readFileSync;
const yamlSafeLoad = require('js-yaml').safeLoad;
const critical = require('critical').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const md = new MarkdownIt('commonmark');

const isTravis = process.env.TRAVIS || false;

const finalDestination = process.env.DEST || 'pages';
const isGAE = finalDestination === 'gae';

const extension = (isTravis || isGAE) ? '' : '.html';
const baseUrl = 'https://bader-sur.appspot.com';
const trackingID = isGAE ? 'UA-93913692-3' : 'UA-93913692-1';

const languages = ['ar', 'en'];
const paths = ['/', '/projects', '/courses'];

const manageEnvironment = environment => {
  environment.addFilter('markdown', str => md.render(str));
  // Credit: https://github.com/mozilla/nunjucks/issues/1000
  environment.addFilter('toFixed',
    (num, digits) => parseFloat(num).toFixed(digits));
};

console.log(`\nBuilding for ${finalDestination}...\n`);

// Clean output directory
gulp.task('clean', () => {
  return del([
    '.tmp',
    `${finalDestination}/*`,
    `!${finalDestination}/.git`,
  ], { dot: true });
});

// Copy files
gulp.task('copy', () => {
  gulp.src([
    './app/*',
    '!./app/*.html',
    '!./app/robots.txt',
    '!./app/sitemap.xml',
    '!./app/templates',
  ])
    .pipe(gulp.dest(finalDestination))
    .pipe($.size({ title: 'copy root' }));

  return gulp.src('./app/data/**/*')
    .pipe(gulp.dest(`${finalDestination}/data`))
    .pipe($.size({ title: 'copy data' }));
});

// Optimize images
gulp.task('images', () => {
  return gulp.src('./app/images/**/*{png,svg}')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(`${finalDestination}/images`))
    .pipe($.size({ title: 'images' }));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src('./app/styles/main.scss')
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      importer: moduleImporter()
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({ title: 'styles' }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(`${finalDestination}/styles`))
    .pipe(gulp.dest('.tmp/styles'));
});

// Lint JavaScript
gulp.task('lint', () => {
  return gulp.src([
    './app/scripts/**/*.js',
    '!node_modules/**'
  ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
});

const scriptify = (config) => {
  return gulp.src('./app/scripts/main.js')
    .pipe(gulpWebpack(config, webpack))
    .pipe(gulp.dest(`./${finalDestination}/scripts`));
};

gulp.task('scripts_modern', () => {
  return scriptify(webpackConfigs[0]);
});

gulp.task('scripts_legacy', () => {
  return scriptify(webpackConfigs[1]);
});

gulp.task('scripts', gulp.series('scripts_modern', 'scripts_legacy'));

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  let projects;
  let courses;
  let aboutMe;

  try {
    aboutMe = yamlSafeLoad(fsRead('./app/data/about-me.yaml', 'utf8'));
    projects = yamlSafeLoad(fsRead('./app/data/projects.yaml', 'utf8'));
    courses = JSON.parse(fsRead('./app/data/courses.json'));
  } catch (e) {
    console.log(e);
  }

  return gulp.src([
    './app/**/*.html',
    '!./app/templates/*'
  ])
    .pipe($.nunjucksRender({
      envOptions: { autoescape: false },
      manageEnv: manageEnvironment,
      path: './app/templates/',
      data: {
        isGAE,
        baseUrl,
        isTravis,
        extension,
        trackingID,

        me: aboutMe,
        projects: projects.projects,
        providers: courses.providers,
        currentYear: (new Date()).getFullYear()
      }
    }))
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))
    .pipe(gulp.dest('.tmp/'))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      minifyJS: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({
      title: 'html',
      showFiles: true
    })))
    .pipe(gulp.dest(finalDestination));
});

// Build the sitemap & update robots.txt
gulp.task('sitemap', () => {
  return gulp.src([
    './app/sitemap.xml',
    './app/robots.txt'
  ])
    .pipe($.nunjucksRender({
      inheritExtension: true,
      envOptions: { autoescape: false },
      manageEnv: manageEnvironment,
      data: {
        paths,
        baseUrl,
        languages
      }
    }))
    .pipe(gulp.dest(finalDestination));
});

// Watch files for changes & reload
gulp.task('serve', gulp.series(
  'clean',
  gulp.parallel('html', 'scripts', 'styles', 'copy', 'sitemap'),
  () => {
    browserSync({
      notify: false,
      // Customize the Browsersync console logging prefix
      logPrefix: 'WSK',
      // Allow scroll syncing across breakpoints
      scrollElementMapping: ['main', '.mdl-layout'],
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      server: [finalDestination, 'app'],
      port: 3000,
      // don't open any URL automatically
      open: false
    });

    gulp.watch('./app/**/*.{html,yaml,json}', gulp.series('html', reload));
    gulp.watch('./app/styles/**/*.{scss,css}', gulp.series('styles', reload));
    gulp.watch('./app/scripts/**/*.js', gulp.series('lint', 'scripts', reload));
    gulp.watch('./app/*.{xml,txt}', gulp.series('sitemap'));
    gulp.watch('./app/images/**/*', reload);
  }
));

// Generate & Inline Critical-path CSS
gulp.task('critical', () => {
  return gulp.src([
    `${finalDestination}/**/*.html`,
    `!${finalDestination}/index.html`,
    `!${finalDestination}/courses.html`,
    `!${finalDestination}/projects.html`
  ])
    .pipe(critical({
      base: `${finalDestination}/`,
      inline: true,
      minify: true,
      css: [`${finalDestination}/styles/main.css`],
      // 5 minutes
      timeout: 5 * 60 * 1000
    }))
    .on('error', err => console.log(err.message))
    .pipe(gulp.dest(finalDestination));
});

// Append content hash to filenames
gulp.task('revision', () => {
  return gulp.src([
    `${finalDestination}/**/*.css`,
    `${finalDestination}/**/*.js`,
    `!${finalDestination}/scripts/vendors-*`,
    `!${finalDestination}/sw.js`,
    `${finalDestination}/**/*.png`,
    `${finalDestination}/**/*.svg`,
    `${finalDestination}/**/*.ico`
  ])
    .pipe($.rev())
    .pipe($.revFormat({ prefix: '.' }))
    .pipe($.revDeleteOriginal())
    .pipe(gulp.dest(finalDestination))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(finalDestination));
});

// Generate a service worker file that will provide offline functionality for
// local resources and runtime caching.
gulp.task('generate-service-worker', () => {
  let wbOptions = {
    globDirectory: finalDestination,
    globPatterns: [
      '{ar,en}/*.html',
      '**/*.css',
      '**/github-mark*.png',
      '**/hamburger*.svg',
      '*.webmanifest'
    ],
    ignoreUrlParametersMatching: [/./],
    swDest: path.join(finalDestination, 'sw.js'),
    dontCacheBustUrlsMatching: /\.\w{10}\./,
    cacheId: `BaderSur-${finalDestination}`,
    clientsClaim: true,
    skipWaiting: true,
    directoryIndex: 'index.html',
    runtimeCaching: [
      {
        urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
        handler: 'cacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: { maxEntries: 10 },
          cacheableResponse: {
            statuses: [0, 200]
          }
        },
      },
      {
        urlPattern: /\.(?:png|gif|jpg)$/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 10 }
        },
      },
      {
        urlPattern: /\.js$/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'scripts',
          expiration: { maxEntries: 10 }
        },
      },
      {
        urlPattern: new RegExp('^https://bader-nasser.appspot.com/apis/(.*)'),
        handler: 'staleWhileRevalidate',
        options: {
          cacheName: 'posts',
          expiration: { maxEntries: 10 }
        },
      }
    ]
  };

  if (!extension) {
    wbOptions.templatedUrls = {
      '/ar/courses': 'ar/courses.html',
      '/ar/projects': '/ar/courses.html',
      '/en/courses': '/ar/courses.html',
      '/en/projects': '/ar/courses.html'
    };
  }

  return workbox.generateSW(wbOptions)
    .then(() => console.info('Service worker generation completed.'))
    .catch(err => console.warn(`Service worker generation failed: ${err}`));
});

// Rewrite occurences of filenames which have been renamed by gulp-rev
gulp.task('replace', () => {
  const manifest = gulp.src(`./${finalDestination}/rev-manifest.json`);

  return gulp.src([
    `${finalDestination}/**/*.html`,
    `${finalDestination}/manifest.*`
  ])
    .pipe($.revReplace({
      manifest: manifest,
      replaceInExtensions: ['.html', '.webmanifest', '.webapp']
    }))
    .pipe(gulp.dest(finalDestination));
});

// Build production files
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('lint', 'html', 'styles', 'scripts', 'images', 'copy', 'sitemap'),
  'critical',
  'revision',
  'generate-service-worker',
  'replace'
));

// Build and serve the output from the dist build
gulp.task('serve:dist', gulp.series('default', () => {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: finalDestination,
    port: 3001,
    // don't open any URL automatically
    open: false
  });

  gulp.watch([
    './app/**/*.{html,yaml,json}',
    './app/styles/**/*.{scss,css}',
    './app/scripts/**/*.js',
    './app/images/**/*',
    './app/manifest.webmanifest'
  ], gulp.series('default', reload));
  gulp.watch('./app/*.{xml,txt}', gulp.series('sitemap'));
}));
