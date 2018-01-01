// credit: https://github.com/philipwalton/webpack-esnext-boilerplate/blob/master/app/scripts/main.js
import 'babel-polyfill';
import 'material-design-lite';

class MyApp {
  constructor() {
    this.postsTemplate = '';
    this.errorTemplate = '';
    this.postsTemplateElement = document.getElementById('posts-template');
    this.errorTemplateElement = document.getElementById('error-template');
    this.lang = window.location.pathname.includes('/ar') ? 'ar' : 'en';
    this.footer = document.querySelector('footer');
    this.isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );
    this.blogUrl = this.isLocalhost ? `/data/apis/${this.lang}.json` :
      `https://bader-nasser.appspot.com/apis/${this.lang}/`;

    if (this.postsTemplateElement) {
      this.postsTemplate = this.postsTemplateElement.innerHTML;
    }
    if (this.errorTemplate) {
      this.errorTemplate = this.errorTemplateElement.innerHTML;
    }

    if (this.postsTemplate || this.errorTemplate) {
      this.addPosts();
    }

    if ('serviceWorker' in navigator) {
      console.log('Service worker is supported!');
      // Delay service worker registration until after the page has loaded
      // during the initial visit to achieve the best first-visit experience
      // Credit: https://developers.google.com/web/tools/workbox/guides/service-worker-checklist
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(() => console.log('Service worker registered!'))
          .catch(e => console.error('Error during service worker registration:', e));
      });
    } else {
      console.log('Service worker is **not** supported!!!');
    }
  }

  async addPosts() {
    const nunjucksEnv = await this.getNunjucksEnv();

    fetch(this.blogUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(jsonResponse => {
        const postsMarkup = nunjucksEnv.renderString(this.postsTemplate, {
          posts: jsonResponse.posts.slice(0, 2),
          lang: this.lang
        });
        this.insertHTML(postsMarkup);
      })
      .catch((error) => {
        console.log('Fetch failed!', error);
        const errorMarkup = nunjucksEnv.renderString(this.errorTemplate, {
          lang: this.lang
        });
        this.insertHTML(errorMarkup);
      });
  }

  async getNunjucksEnv() {
    const nunjucks = await import(/* webpackChunkName: "nunjucks" */ 'nunjucks');
    const env = nunjucks.configure({ autoescape: true });
    env.addFilter('localeDate', (dateString) => {
      const date = new Date(dateString);
      const dateFormatterOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      const dateLocales = (this.lang === 'ar') ? 'ar-EG-u-nu-arab-ca-islamic' : 'en-GB';
      const shortDate = new Intl.DateTimeFormat(
        dateLocales, dateFormatterOptions).format(date);

      return shortDate;
    });

    return env;
  }

  insertHTML(markup) {
    requestAnimationFrame(() => {
      this.footer.insertAdjacentHTML('beforebegin', markup);
    });
  }
}

new MyApp();
