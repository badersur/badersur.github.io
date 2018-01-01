# [badersur.github.io][bs-pages] [![Build Status](https://travis-ci.org/badersur/badersur.github.io.svg?branch=dev)](https://travis-ci.org/badersur/badersur.github.io)

This is the source code for [my github pages][bs-pages] and the
[Google App Engine application][bs-gae]. It's a Progressive Web Application (PWA)
showing my skills, completed courses, projects and blog posts.


## Features

- Responsive website using [Material Design Lite][mdl].

- Performance optimization - Images, JavaScript, HTML and CSS are minifed and
 concatenated using [gulp][gulp].

- ES2015 support using [Babel][babel].

- Offline support thanks to [Service Worker][sw] pre-caching.
 This is made possible by [Workbox][workbox].

- Inlined Critical-path CSS using [critical][critical].

- Static asset revisioning by appending content hash to filenames using
 [gulp-rev][gulp-rev] and [its brothers](package.json#L31-L33) :)

- The features of [Google's Web Starter Kit][wsk] :)


## Prerequisites

1. [Node.js][node] and ([npm][npm] or [yarn][yarn]). I suggest using [nvm][nvm]
 to download Node.js and manage multiple versions of it.
    - npm is bundled with Node.js but you may want to update it using the
     command: `npm i npm@latest -g`
    - I use node 10 and npm 6.

2. [gulp-cli][gulp-started]. Run `npm install --global gulp-cli` to install it.

3. [Google Cloud SDK][gcloud] if you want to test the application locally
 before deploying to Google App Engine.
    - _You also may need to install Python 2_. 


## Usage

1. Clone this repo. using [git][git] or [download it][download].
    - `git clone https://github.com/badersur/badersur.github.io`

2. Open cmd/terminal and change your current directory to repo.'s directory.
    - `cd ~/GitHub/badersur/badersur.github.io`

3. Install the dependencies using npm or yarn.
    - `npm i`
    - `yarn`

4. If you want to test working with GitHub pages then use gulp as follows:
    - Run `gulp` to build the app.
    - Run `gulp serve` to serve it **without** the service worker.
    - Run `gulp serve:dist` to serve it **with** the service worker.

5. If you want to test working with Google App Engine then use npm scripts
 as follows:
    - Run `npm run serve` to serve it **with** the service worker.
    - Run `npm run deploy` to deploy to GAE. You'll need to change the app ID!

6. Run `npm run build` to build the app for GitHub pages and GAE.


## Notes

- I add Google Analytics script when building the app on Travis to avoid ruining
 the data with local testing.

- The [GAE application][bs-gae] has the following features:
    - Server Side Redirection (302 redirect). I'm avoiding 301 redirect because
     I may want to redirect to somewhere else in the future.
    - Static assets (images, css & js) are cached for a year using HTTP caching
     headers.
    - <del>Clean URLs (eg. bader-sur.appspot.com/ar/projects).</del> _Somehow,
     HTML pages can be served without the `.html` extension on GitHub Pages!
     Jekyll magic?!_
    - Latest bits before pushing the source code to GitHub.

- You may want to read my post: [Helpful resources and notes for Udacity's web
 development course][blog-notes] to learn about web development and GAE.


## Thanks

- [Google's Web Starter Kit][wsk]

- [gulp-nunjucks-render plugin][nunjucks-render]

- [Jeffrey Way][jeffrey]

- [Ryan Christiani][ryan]

- [Google's lighthouse Chrome extension][lighthouse]

- [Google's PageSpeed Insights][insights]

- [Travis CI][travis-ci]

- All awesome open source projects :)


## License

MIT © [Bader Nasser Al-Hashmi](https://github.com/BaderSur)


[bs-pages]: https://badersur.github.io
[bs-gae]: https://bader-sur.appspot.com
[mdl]: https://github.com/google/material-design-lite
[gulp]: https://github.com/gulpjs/gulp
[gulp-started]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[babel]: https://github.com/babel/babel
[sw]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[workbox]: https://developers.google.com/web/tools/workbox/
[critical]: https://github.com/addyosmani/critical
[gulp-rev]: https://github.com/sindresorhus/gulp-rev
[wsk]: https://github.com/google/web-starter-kit
[nunjucks-render]: https://github.com/carlosl/gulp-nunjucks-render
[jeffrey]: https://laracasts.com/series/es6-cliffsnotes
[ryan]: https://www.youtube.com/playlist?list=PL57atfCFqj2h5fpdZD-doGEIs0NZxeJTX
[lighthouse]: https://github.com/GoogleChrome/lighthouse
[insights]: https://developers.google.com/speed/pagespeed/insights/
[travis-ci]: https://travis-ci.org
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[nvm]: https://github.com/creationix/nvm
[gcloud]: https://cloud.google.com/sdk/docs/
[git]: https://git-scm.com/downloads
[download]: https://github.com/badersur/badersur.github.io/archive/dev.zip
[blog-notes]: https://badersur-v2.appspot.com/blog/resources-for-udacitys-web-development-course?readyou=yep
