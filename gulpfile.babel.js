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

import pkg from './package.json';
import courses from './app/data/courses.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const finalDestination = process.env.ENV_DEST || 'pages';
const isGAE = finalDestination === 'gae';

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src(['app/scripts/**/*.js', '!node_modules/**'])
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
    .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () => {
  gulp.src([
    'app/*',
    '!app/*.html',
    '!app/partials',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest(finalDestination))
    .pipe($.size({title: 'copy'}));

  gulp.src(['app/data/*'])
    .pipe(gulp.dest(`${finalDestination}/data`))
    .pipe($.size({title: 'copy data'}));
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
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(`${finalDestination}/styles`))
    .pipe(gulp.dest('.tmp/styles'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', () => {
  gulp.src([
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
    .pipe($.size({title: 'scripts - main'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${finalDestination}/scripts`))
    .pipe(gulp.dest('.tmp/scripts'));

  gulp.src([
    './node_modules/material-design-lite/src/mdlComponentHandler.js',
    './node_modules/material-design-lite/src/layout/layout.js',
    './app/scripts/shared.js'
  ])
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('shared.js'))
    .pipe($.uglify())
    // Output files
    .pipe($.size({title: 'scripts - shared'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${finalDestination}/scripts`))
    .pipe(gulp.dest('.tmp/scripts'));
});

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  const providers = courses.providers;

  return gulp.src(['app/**/*.html', '!app/partials/*'])
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        mainScripts: false,
        downloadLink: '',
        source: '',
        website: '',
        currentYear: (new Date()).getFullYear(),
        author: pkg.author,
        providers: providers,
        isGAE: isGAE,
        trackingID: isGAE ? 'UA-93913692-2' : 'UA-93913692-1'
      }
    }))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file'
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
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest(finalDestination));
});

// Clean output directory
gulp.task('clean', () => del(
  ['.tmp', `${finalDestination}/*`, `!${finalDestination}/.git`],
  {dot: true}
));

// Watch files for changes & reload
gulp.task('serve', ['html', 'scripts', 'styles'], () => {
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
    port: 3000
  });

  gulp.watch(['app/**/*.html'], ['html', reload]);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);
});

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
    port: 3001
  })
);

// Append content hash to filenames
gulp.task('revision', ['copy-sw-scripts'], () => {
  return gulp.src([
    `${finalDestination}/**/*.css`,
    `${finalDestination}/**/*.js`,
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

// Build production files
gulp.task('build', ['clean'], cb =>
  runSequence(
    'styles',
    ['lint', 'html', 'scripts', 'images', 'copy'],
    'revision',
    'generate-service-worker',
    cb
  )
);

// Rewrite occurences of filenames which have been renamed by gulp-rev
gulp.task('default', ['build'], () => {
  const manifest = gulp.src(`./${finalDestination}/rev-manifest.json`);

  return gulp.src([
    `${finalDestination}/*.html`,
    `${finalDestination}/**/*.js`,
    `!${finalDestination}/google334d7caabe96fad5.html`
  ])
    .pipe($.revReplace({manifest: manifest}))
    .pipe(gulp.dest(finalDestination));
});

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src([
    'node_modules/sw-toolbox/sw-toolbox.js',
    'app/scripts/sw/runtime-caching.js'
  ])
    .pipe(gulp.dest(`${finalDestination}/scripts/sw`));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', () => {
  const manifest = require(`./${finalDestination}/rev-manifest.json`);
  const rootDir = finalDestination;
  const filepath = path.join(rootDir, manifest['sw.js']);

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      manifest['scripts/sw/sw-toolbox.js'],
      manifest['scripts/sw/runtime-caching.js']
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/',
    dynamicUrlToDependencies: {
      '/courses': [`${rootDir}/courses.html`],
      '/projects': [`${rootDir}/projects.html`]
    }
  });
});

gulp.task('deploy', ['default'], () => {
  return gulp.src(`${finalDestination}/**/*`)
    .pipe($.ghPages({
      branch: 'master'
    }));
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
