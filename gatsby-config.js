const PORT = process.env.NODE_ENV === 'development' ? 8000 : 9000;
const siteUrl = process.env.siteUrl || `http://localhost:${PORT}`;

module.exports = {
  siteMetadata: {
    siteUrl,
    twitter: '@BaderSur',
    title: {
      ar: 'بدر العفية',
      en: 'BaderSur',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/index.html', '/en/404.html', '/ar/404.html'],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-93913692-1',
        head: false,
        anonymize: true,
        respectDNT: true,
        siteSpeedSampleRate: 10,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'BaderSur',
        short_name: 'BaderSur',
        start_url: '/en/?source=pwa&utm_source=a2hs',
        background_color: '#663399',
        theme_color: '#663399',
        // In order to show the Add to Home Screen Prompt,
        // display must be set to standalone.
        display: 'standalone',
        // This path is relative to the root of the site.
        icon: 'src/images/logo.png',
        // `query`(default), `name`, or `none`
        cache_busting_mode: 'name',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
};
