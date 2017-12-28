/* eslint-env worker */

// global.toolbox is defined in a different script, sw-toolbox.js,
// which is part of the https://github.com/GoogleChrome/sw-toolbox project.
// That sw-toolbox.js script must be executed first, so it needs to be listed
// before this in the importScripts() call that the parent service worker makes.

(global => {
  'use strict';

  global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    origin: /\.(?:googleapis|gstatic)\.com$/
  });

  global.toolbox.router.get(/^\/apis\/(ar|en)\/?$/, global.toolbox.networkFirst, {
    origin: 'https://bader-nasser.appspot.com',
    networkTimeoutSeconds: 10
  });

  global.toolbox.router.get(/\/sitemap(\.xml)?/, global.toolbox.networkFirst);

  global.toolbox.router.default = global.toolbox.networkFirst;
})(self);
