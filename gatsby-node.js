/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  ['ar', 'en'].forEach(lang => {
    createPage({
      path: `${lang}/`,
      component: path.resolve('./src/templates/index.js'),
      context: { lang },
    });

    createPage({
      path: `${lang}/projects/`,
      component: path.resolve('./src/templates/projects.js'),
      context: { lang },
    });

    createPage({
      path: `${lang}/404.html`,
      component: path.resolve('./src/templates/404.js'),
      context: { lang },
    });

    if (lang === 'en') {
      createPage({
        path: 'index.html',
        component: path.resolve('./src/templates/index.js'),
        context: { lang },
      });

      createPage({
        path: `${lang}/courses/`,
        component: path.resolve('./src/templates/courses.js'),
      });

      createPage({
        path: '404.html',
        component: path.resolve('./src/templates/404.js'),
        context: { lang, multiLangs: true },
      });
    }
  });
};
