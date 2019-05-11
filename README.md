# [badersur.github.io][bs-pages] v4 [![Build Status](https://travis-ci.org/badersur/badersur.github.io.svg?branch=dev)](https://travis-ci.org/badersur/badersur.github.io)

This is the source code for [my github pages][bs-pages]. It's a Progressive Web
Application (PWA) showing my skills, completed courses, projects and blog posts
using [React][react] and [Gatsby][gatsby].


## Features

- Responsive design using vanilla CSS (Flexbox and Grid).

- Performance optimization - Images, JavaScript, HTML and CSS are minifed.

- Using modern JavaScript features.

- Offline support thanks to [Service Worker][sw] and `gatsby-plugin-offline`.

- Static asset revisioning by appending content hash to filenames for
 better caching.


## Prerequisites

[Node.js][node] and ([npm][npm] or [yarn][yarn]). I suggest using [nvm][nvm]
 to download Node.js and manage multiple versions of it.
  - npm is bundled with Node.js but you may want to update it using the
     command: `npm i npm@latest -g`
  - I use node 12 and npm 6.


## Usage

1. Clone this repo. using [git][git] or [download it][download].
    - `git clone https://github.com/badersur/badersur.github.io`

2. Open cmd/terminal and change your current directory to repo.'s directory.
    - `cd badersur.github.io`

3. Install the dependencies using npm or yarn.
    - `npm i`
    - `yarn`

4. Test the app locally using the commands:
    - `npm run develop` and visit the development version of the app
      at: http://localhost:8000/en/
    - `npm run build` to have a production-ready version of the app.
    - `npm run serve` and open the production version
      at: http://localhost:9000/en/

You may want to read my post: [Helpful resources and notes for Udacity's web
development course][blog-notes] to learn about web development and
Google App Engine.


## Thanks

- [React][react] and [Gatsby][gatsby] for their awesome projects

- [Jen Simmons][jen] and her amazing [Layout Land YouTube channel][layout-land]
  especially her mind-blowing [Resilient CSS series][resilient-css]

- [Wes Bos][wes] and his great projects and courses especially:
    - [What The Flexbox?! Course][wut-da-flex]
    - [`eslint-config-wesbos`][eslint-wes]
    - [dotfiles repo.][dotfiles]
    - [JavaScript30 Course][js30]

- [Traversy Media YouTube Channel][traversy] and their fantastic courses
  especially:
    - [Web Development Crash Courses][crash-courses]
    - [Vanilla JavaScript Playlist][vanilla-js]

- [Google's lighthouse project][lighthouse]

- [Travis CI][travis-ci]

- All awesome open source projects :)


## License

MIT © [Bader Nasser Al-Hashmi](https://github.com/BaderSur)


[bs-pages]: https://badersur.github.io
[sw]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[lighthouse]: https://github.com/GoogleChrome/lighthouse
[travis-ci]: https://travis-ci.org
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[nvm]: https://github.com/creationix/nvm
[git]: https://git-scm.com/downloads
[download]: https://github.com/badersur/badersur.github.io/archive/dev.zip
[blog-notes]: https://bader-nasser.appspot.com/en/resources-for-udacity-web-development-course?source=gh-readme
[react]: https://reactjs.org/
[gatsby]: https://www.gatsbyjs.org/
[gatsby-starter]: https://github.com/gatsbyjs/gatsby-starter-default
[resilient-css]: https://www.youtube.com/playlist?list=PLbSquHt1VCf1kpv9WRGMCA9_Nn4vCLZ9Y
[jen]: https://github.com/jensimmons
[layout-land]: https://www.youtube.com/channel/UC7TizprGknbDalbHplROtag/
[wes]: https://github.com/wesbos
[wut-da-flex]: https://www.youtube.com/playlist?list=PLu8EoSxDXHP7xj_y6NIAhy0wuCd4uVdid
[eslint-wes]: https://github.com/wesbos/eslint-config-wesbos
[dotfiles]: https://github.com/wesbos/dotfiles
[js30]: https://www.youtube.com/playlist?list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH
[traversy]: https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA
[crash-courses]: https://www.youtube.com/playlist?list=PLillGF-RfqbYeckUaD1z6nviTp31GLTH8
[vanilla-js]: https://www.youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX
