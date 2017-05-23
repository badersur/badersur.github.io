/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import moduleImporter from 'sass-module-importer';
import MarkdownIt from 'markdown-it';
import { readFileSync as fsRead } from 'fs';
import { safeLoad as yamlSafeLoad } from 'js-yaml';

import { stream as critical } from 'critical';

import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const md = new MarkdownIt('commonmark');

const finalDestination = process.env.ENV_DEST || 'pages';
const isGAE = finalDestination === 'gae';

const isTravis = process.env.TRAVIS || false;

console.log(`\nBuilding for ${finalDestination}...\n`);

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src(['app/scripts/**/*.js', '!app/scripts/vendors/*', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);

// Optimize images
gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(`${finalDestination}/images`))
    .pipe($.size({ title: 'images' }))
);

// Copy files
gulp.task('copy', () => {
  gulp.src([
    'app/*',
    '!app/*.html',
    '!app/templates'
  ])
    .pipe(gulp.dest(finalDestination))
    .pipe($.size({ title: 'copy root' }));

  gulp.src(['app/data/*'])
    .pipe(gulp.dest(`${finalDestination}/data`))
    .pipe($.size({ title: 'copy data' }));

  gulp.src([
    'node_modules/nunjucks/browser/nunjucks.min.js',
    'node_modules/jquery/dist/jquery.min.js'
  ])
    .pipe(gulp.dest(`${finalDestination}/scripts/vendors`))
    .pipe(gulp.dest('.tmp/scripts/vendors'))
    .pipe($.size({ title: 'copy scripts' }));
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
  return gulp.src([
    'app/styles/main.scss'
  ])
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

// Concatenate and minify JavaScript. Also, transpile ES2015 code to ES5.
gulp.task('scripts', () => {
  return gulp.src([
    './node_modules/material-design-lite/src/mdlComponentHandler.js',
    './node_modules/material-design-lite/src/layout/layout.js',
    './app/scripts/main.js'
  ])
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    // Output files
    .pipe($.size({ title: 'bundles' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${finalDestination}/scripts`))
    .pipe(gulp.dest('.tmp/scripts'));
});

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  let projects, courses, aboutMe;

  try {
    aboutMe = yamlSafeLoad(fsRead('./app/data/about-me.yaml', 'utf8'));
    projects = yamlSafeLoad(fsRead('./app/data/projects.yaml', 'utf8'));
    courses = JSON.parse(fsRead('./app/data/courses.json'));
  } catch (e) {
    console.log(e);
  }

  const manageEnvironment = environment => {
    environment.addFilter('markdown', str => md.render(str));
  };

  return gulp.src(['app/**/*.html', '!app/templates/*'])
    .pipe($.nunjucksRender({
      envOptions: {
        autoescape: false
      },
      manageEnv: manageEnvironment,
      path: 'app/templates/',
      data: {
        isGAE,
        isTravis,
        me: aboutMe,
        projects: projects.projects,
        providers: courses.providers,
        currentYear: (new Date()).getFullYear(),
        trackingID: isGAE ? 'UA-93913692-2' : 'UA-93913692-1',
        baseUrl: isGAE ?
          'https://badersur-push.appspot.com' : 'https://badersur.github.io'
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
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({ title: 'html', showFiles: true })))
    .pipe(gulp.dest(finalDestination));
});

// Watch files for changes & reload
gulp.task('serve', ['html', 'scripts', 'styles', 'copy'], () => {
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
    server: ['.tmp', 'app'],
    port: 3000,
    // don't open any URL automatically
    open: false
  });

  gulp.watch([
    'app/**/*.{html,yaml,json}',
    '!app/manifest.json'
  ], ['html', reload]);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);
});

// Copy over the scripts that are used in importScripts as part of the
// generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src([
    'node_modules/sw-toolbox/sw-toolbox.js',
    'app/scripts/sw/runtime-caching.js'
  ])
    .pipe(gulp.dest(`${finalDestination}/scripts/sw`));
});

// Append content hash to filenames
gulp.task('revision', ['copy-sw-scripts'], () => {
  return gulp.src([
    `${finalDestination}/**/*.css`,
    `${finalDestination}/**/*.js`,
    `!${finalDestination}/sw.js`,
    `${finalDestination}/**/*.png`,
    `${finalDestination}/**/*.svg`,
    `${finalDestination}/**/*.ico`
  ])
    .pipe($.rev())
    .pipe($.revDeleteOriginal())
    .pipe(gulp.dest(finalDestination))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(finalDestination));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', () => {
  const manifest = require(`./${finalDestination}/rev-manifest.json`);
  const rootDir = finalDestination;
  const filepath = path.join(rootDir, 'sw.js');

  let swOptions = {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: `${rootDir}-${pkg.name}` || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in
    // runtime-caching.js.
    importScripts: [
      manifest['scripts/sw/sw-toolbox.js'],
      manifest['scripts/sw/runtime-caching.js']
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/**/*.html`,
      `${rootDir}/*.json`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/',
    verbose: false
  };

  if (isGAE) {
    swOptions.dynamicUrlToDependencies = {
      '/ar/courses': [`${rootDir}/ar/courses.html`],
      '/ar/projects': [`${rootDir}/ar/projects.html`],
      '/en/courses': [`${rootDir}/en/courses.html`],
      '/en/projects': [`${rootDir}/en/projects.html`]
    };
  }

  return swPrecache.write(filepath, swOptions);
});

// Minify service worker.
gulp.task('minify-service-worker', () => {
  return gulp.src([
    `./${finalDestination}/sw.js`
  ])
    .pipe($.uglify())
    .pipe(gulp.dest(finalDestination));
});

// Clean output directory
gulp.task('clean', () => del([
  '.tmp',
  `${finalDestination}/*`,
  `!${finalDestination}/.git`
], { dot: true }));

// Build production files
gulp.task('build', ['clean'], cb =>
  runSequence(
    'styles',
    ['lint', 'html', 'scripts', 'images', 'copy'],
    'critical',
    'revision',
    'generate-service-worker',
    'minify-service-worker',
    cb
  )
);

// Rewrite occurences of filenames which have been renamed by gulp-rev
gulp.task('replace', ['build'], () => {
  const manifest = gulp.src(`./${finalDestination}/rev-manifest.json`);

  return gulp.src([
    `${finalDestination}/**/*.html`,
    `${finalDestination}/manifest.*`
  ])
    .pipe($.revReplace({
      manifest: manifest,
      replaceInExtensions: ['.html', '.json', '.webapp']
    }))
    .pipe(gulp.dest(finalDestination));
});

gulp.task('default', ['replace']);

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
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
  })
);

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
