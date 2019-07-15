/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

const supportedLangs = ['en', 'ar'];
const defaultLang = 'en';

/** @type {import('gatsby').GatsbyNode} */
const gatsbyNode = {
  createPages({ actions }) {
    const { createPage, createRedirect } = actions;

    const indexTemplate = path.resolve('./src/templates/index.tsx');
    const projectsTemplate = path.resolve('./src/templates/projects.tsx');
    const coursesTemplate = path.resolve('./src/templates/courses.tsx');
    const errorTemplate = path.resolve('./src/templates/404.tsx');

    supportedLangs.forEach(lang => {
      createPage({
        path: `/${lang}/`,
        component: indexTemplate,
        context: { lang },
      });

      createPage({
        path: `/${lang}/projects/`,
        component: projectsTemplate,
        context: { lang },
      });

      createPage({
        path: `/${lang}/404.html`,
        component: errorTemplate,
        context: { lang },
      });

      if (lang === defaultLang) {
        createPage({
          path: '/index.html',
          component: indexTemplate,
          context: { lang },
        });

        createPage({
          path: `/${lang}/courses/`,
          component: coursesTemplate,
          context: {},
        });

        createPage({
          path: '/404.html',
          component: errorTemplate,
          context: { lang, multiLangs: true },
        });
      }
    });

    createRedirect({
      fromPath: '/',
      toPath: `/${defaultLang}/`,
      redirectInBrowser: true,
    });

    createRedirect({
      fromPath: '/index.html',
      toPath: `/${defaultLang}/`,
      redirectInBrowser: true,
    });
  },
};

module.exports = gatsbyNode;
