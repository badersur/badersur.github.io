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
      component: path.resolve('./src/templates/index.tsx'),
      context: { lang },
    });

    createPage({
      path: `${lang}/projects/`,
      component: path.resolve('./src/templates/projects.tsx'),
      context: { lang },
    });

    createPage({
      path: `${lang}/404.html`,
      component: path.resolve('./src/templates/404.tsx'),
      context: { lang },
    });

    if (lang === 'en') {
      createPage({
        path: 'index.html',
        component: path.resolve('./src/templates/index.tsx'),
        context: { lang },
      });

      createPage({
        path: `${lang}/courses/`,
        component: path.resolve('./src/templates/courses.tsx'),
      });

      createPage({
        path: '404.html',
        component: path.resolve('./src/templates/404.tsx'),
        context: { lang, multiLangs: true },
      });
    }
  });
};
