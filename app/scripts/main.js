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

  if ('serviceWorker' in navigator) {
    // Delay service worker registration until after the page has loaded
    // during the initial visit to achieve the best first-visit experience
    // Credit: https://developers.google.com/web/tools/workbox/guides/service-worker-checklist
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .catch(e => console.error('Error during service worker registration:', e));
    });
  }

  let lang = window.location.pathname.includes('/ar') ? 'ar' : 'en';
  let $postsTemplate = $('#posts-template').html();

  if ($postsTemplate.length) {
    let $postsSection = $('.section--center').last();
    let $errorTemplate = $('#error-template').html();
    let env = nunjucks.configure({
      autoescape: true
    });

    env.addFilter('localeDate', dateString => {
      let date = new Date(dateString);
      let dateFormatterOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      let dateLocales = (lang === 'ar') ? 'ar-EG-u-nu-arab-ca-islamic' : 'en-GB';
      let shortDate = new Intl.DateTimeFormat(
        dateLocales, dateFormatterOptions).format(date);

      return shortDate;
    });

    let blogUrl = isLocalhost ? `/data/apis/${lang}.json` :
      `https://bader-nasser.appspot.com/apis/${lang}/`;

    $.ajax(blogUrl, {
        timeout: 10000
      })
      .done(data => {
        $postsSection.after(env.renderString($postsTemplate, {
          posts: data.posts.slice(0, 2),
          lang
        }));
      })
      .fail(() => $postsSection.after(env.renderString($errorTemplate, {
        lang
      })));
  }
})();
