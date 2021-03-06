import path from 'path';

import {GatsbyConfig} from 'gatsby';
import postcssPresetEnv from 'postcss-preset-env';

const PORT = process.env.NODE_ENV === 'development' ? 8000 : 9000;
const siteUrl = process.env.siteUrl ?? `http://localhost:${PORT}`;
const trackingId = process.env.trackingId ?? 'xyz';

const configs: GatsbyConfig = {
	siteMetadata: {
		siteUrl,
		twitter: '@BaderSur',
		siteTitle: {
			ar: 'بدر العفية',
			en: 'BaderSur'
		}
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-transformer-yaml',
		'gatsby-plugin-catch-links',
		{
			resolve: 'gatsby-plugin-typescript',
			options: {
				isTSX: true,
				allExtensions: true
				// jsxPragma: 'jsx', // defaults to "React"
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: path.join(__dirname, 'src', 'data')
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: path.join(__dirname, 'src', 'images')
			}
		},
		{
			resolve: 'gatsby-plugin-postcss',
			options: {
				postCssPlugins: [
					postcssPresetEnv({
						stage: 0
					})
				]
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				exclude: ['/index.html', '/en/404.html', '/ar/404.html']
			}
		},
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId,
				head: false,
				anonymize: true,
				respectDNT: true,
				siteSpeedSampleRate: 10
			}
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
				cache_busting_mode: 'name'
			}
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		'gatsby-plugin-offline'
	]
};

export default configs;
