# [badersur.github.io][1] [![Build Status](https://travis-ci.org/badersur/badersur.github.io.svg?branch=dev)](https://travis-ci.org/badersur/badersur.github.io)

This is the source code for [my github pages][1] and the
[Google App Engine application][2]. It's a Progressive Web Application (PWA)
showing my skills, completed courses, projects and blog posts.


## Features

- Responsive website - using [Material Design Lite][3].

- Performance optimization - Images, JavaScript, HTML and CSS are minifed and
 concatenated using [gulp][4].

- ES2015 support using [Babel][5].

- Offline support - Thanks to [Service Worker][6] [pre-caching][7]. This is made
 possible by [sw-precache][8].

- The features of [Google's Web Starter Kit][9] :)


## Quickstart

Download or clone this repository and build on what is included in the `app` directory.

Be sure to look over the [installation docs](docs/install.md) to verify your
environment is prepared to run WSK.

Once you have verified that your system can run WSK, check out the
[commands](docs/commands.md) available to get started.


## Thanks

- [Google's Web Starter Kit][9]

- [gulp-nunjucks-render plugin][10]

- [Jeffrey Way][11]

- [Ryan Christiani][12]

- [Google's lighthouse Chrome extension][13]

- [Travis CI][14]

- All awesome open source projects :)


[1]: https://badersur.github.io
[2]: https://badersur-push.appspot.com
[3]: https://github.com/google/material-design-lite
[4]: https://github.com/gulpjs/gulp
[5]: https://github.com/babel/babel
[6]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[7]: https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226
[8]: https://github.com/GoogleChrome/sw-precache
[9]: https://github.com/google/web-starter-kit
[10]: https://github.com/carlosl/gulp-nunjucks-render
[11]: https://laracasts.com/series/es6-cliffsnotes
[12]: https://www.youtube.com/playlist?list=PL57atfCFqj2h5fpdZD-doGEIs0NZxeJTX
[13]: https://github.com/GoogleChrome/lighthouse
[14]: https://travis-ci.org
