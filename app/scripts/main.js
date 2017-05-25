/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */

(function(global) {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if ('serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = () => {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            let installingWorker = registration.installing;

            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');

                default:
                // Ignore
              }
            };
          }
        };
      }).catch(e => {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here
  const mainPagePaths = ['/ar/', '/ar/index.html', '/en/', '/en/index.html'];
  let pathname = window.location.pathname;
  let lang = pathname.includes('/ar') ? 'ar' : 'en';

  if (mainPagePaths.includes(pathname)) {
    let $postsSection = $('.section--center').last();
    let $postsTemplate = $('#posts-template').html();
    let $errorTemplate = $('#error-template').html();
    let env = global.nunjucks.configure({ autoescape: true });

    env.addFilter('localeDate', dateString => {
      let date = new Date(dateString);
      let dateFormatterOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      let dateLocales = (lang === 'ar') ? 'ar-EG-u-nu-arab-ca-islamic' : 'en-GB';
      let shortDate = new Intl.DateTimeFormat(
        dateLocales, dateFormatterOptions).format(date);

      return shortDate;
    });

    let blogUrl = isLocalhost ?
      '/data/blog.json' : 'https://bader-sur.appspot.com/blog.json';

    global.$.ajax(blogUrl, { timeout: 10000 })
      .done(data => {
        $postsSection.after(env.renderString($postsTemplate, {
          posts: data.posts.slice(0, 2),
          lang
        }));
      })
      .fail(() => $postsSection.after(env.renderString($errorTemplate, { lang })));
  }
})(self);
