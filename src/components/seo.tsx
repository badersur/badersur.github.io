/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import { SEOProps } from '..';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const SEO = ({
  title, description = '', lang = 'en',
  multiLangs = false, noIndex = false, pageLink = ''
}: SEOProps) => {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const otherLang = lang === 'ar' ? 'en' : 'ar';
  const {
    title: { [lang]: siteTitle },
    siteUrl,
    twitter,
  } = useSiteMetadata();
  const url = `${siteUrl}/${lang}${pageLink}`;
  const otherUrl = `${siteUrl}/${otherLang}${pageLink}`;

  return (
    <Helmet title={title} titleTemplate={`%s | ${siteTitle}`}>
      <html lang={lang} dir={dir} />
      {pageLink ? <link rel="canonical" hrefLang={lang} href={url} /> : null}
      {multiLangs ? <link rel="alternate" hrefLang={lang} href={url} /> : null}
      {multiLangs ? (
        <link rel="alternate" hrefLang={otherLang} href={otherUrl} />
      ) : null}

      {noIndex ? <meta name="robots" content="noindex" /> : null}
      {description ? <meta name="description" content={description} /> : null}

      <meta property="og:url" content={pageLink ? url : siteUrl} />
      <meta property="og:locale" content={lang} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:site:id" content={twitter} />
      <meta name="twitter:creator" content={twitter} />
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : null}
    </Helmet>
  );
};

export default SEO;
