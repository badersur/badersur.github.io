# [badersur.github.io][bs-pages] v5

[![Travis Status][travis-status-img]][travis-status]
[![Netlify Status][netlify-status-img]][netlify-status]

This is the source code for [my github pages][bs-pages]. It's a Progressive Web
Application (PWA) showing my skills, completed courses, projects and blog posts
using [React][react] and [Gatsby][gatsby].

## Links

-   [badersur.github.io][bs-pages] (built by [Travis CI][travis-ci])

-   [badersur.netlify.com][bs-netlify] (built by [Netlify][netlify]'s
    continuous deployment)

## Features

-   Responsive design using vanilla CSS (Flexbox and Grid).

-   Performance optimization - Images, JavaScript, HTML and CSS are minifed.

-   Using modern JavaScript/TypeScript features.

-   Offline support thanks to [Service Worker][sw] and `gatsby-plugin-offline`.

-   Static asset revisioning by appending content hash to filenames for
    better caching.

## Prerequisites

-   [Node.js][node] and ([npm][npm] or [yarn][yarn]).

    I suggest using [nvm][nvm] to download Node.js and manage multiple versions
    of it. `npm` is bundled with Node.js but you may want to update it using the
    command: `npm i npm@latest -g`

-   Or just use [Docker][docker]!

## Usage

1. Open the Terminal / Command Prompt (cmd).

2. Clone the repo. using [git][git] (or [download it][download]).

    `git clone https://github.com/badersur/badersur.github.io`

3. Change your current directory to repo.'s directory.

    `cd badersur.github.io`

4. Either use Docker or node package managers (npm / yarn):

    - Using Docker, and **if you have node installed**, then just run:

        - `npm run develop:docker` and visit http://localhost:8000/ to run the
          development version of the site.
        - `npm run serve:docker` and visit http://localhost:9000/ to run the
          production version.

        **In case you don't have node installed**, run:

        - for the development version:

            1. `docker-compose build` to _build_ it.
            2. `docker-compose up` to run it.

        - for the production version:

            1. `docker build -t bs-app .` to _build_ it.
            2. `docker run --rm --detach --publish 9000:9000 bs-app`

        Note: you may need to add `sudo` before the `docker` commands!

    - Using package managers:

        1. Install the dependencies using npm or yarn.

            - `npm i`
            - `yarn`

        2. Either use npm scripts or [Netlify CLI][netlify-cli]:

            - using npm scripts, run:

                - `npm run develop` and visit the development version of the app
                  at: http://localhost:8000/en/
                - `npm run build` to have a production-ready version of the app.
                - `npm run serve` and open the production version
                  at: http://localhost:9000/en/

            - using [Netlify CLI][netlify-cli], run:

                1. `npm install netlify-cli -g`
                2. `netlify dev` to serve the production version of the app
                   and visit the link shown in the screen...

You may want to read my post: [Helpful resources and notes for Udacity's web
development course][blog-notes] to learn about web development and
Google App Engine.

## Deploy to Netlify

Test deploying to Netlify with my app as a template, for free!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)][deploy]

_[What happens when you click 'Deploy to Netlify'?][deploy-info]_

## Thanks

-   [React][react] and [Gatsby][gatsby] for their awesome projects

-   [Jen Simmons][jen] and her amazing [Layout Land YouTube channel][layout-land]
    especially her mind-blowing [Resilient CSS series][resilient-css]

-   [Wes Bos][wes] and his great projects and courses especially:

    -   [What The Flexbox?! Course][wut-da-flex]
    -   [`eslint-config-wesbos`][eslint-wes]
    -   [dotfiles repo.][dotfiles]
    -   [JavaScript30 Course][js30]

-   [Traversy Media YouTube Channel][traversy] and their fantastic courses
    especially:

    -   [Web Development Crash Courses][crash-courses]
    -   [Vanilla JavaScript Playlist][vanilla-js]

-   [Google's lighthouse project][lighthouse]

-   [Travis CI][travis-ci]

-   [Netlify][netlify]

-   All awesome open source projects :)

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
[docker]: https://docs.docker.com/install/
[netlify-cli]: https://www.netlify.com/docs/cli/
[deploy]: https://app.netlify.com/start/deploy?repository=https://github.com/badersur/badersur.github.io
[deploy-info]: https://templates.netlify.com/#about-deploy-to-netlify
[netlify]: https://www.netlify.com/
[travis-status-img]: https://travis-ci.org/badersur/badersur.github.io.svg?branch=dev
[travis-status]: https://travis-ci.org/badersur/badersur.github.io
[netlify-status-img]: https://api.netlify.com/api/v1/badges/dd3c8289-3da3-441a-a8d2-1d3a003fbf49/deploy-status
[netlify-status]: https://app.netlify.com/sites/badersur/deploys
[bs-netlify]: https://badersur.netlify.com
