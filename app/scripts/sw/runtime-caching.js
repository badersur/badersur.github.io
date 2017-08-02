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

  global.toolbox.router.get('/blog.json', global.toolbox.networkFirst, {
    origin: 'https://badersur-v2.appspot.com',
    networkTimeoutSeconds: 10
  });

  global.toolbox.router.get(/\/sitemap(\.xml)?/, global.toolbox.networkFirst);

  global.toolbox.router.default = global.toolbox.cacheFirst;
})(self);
