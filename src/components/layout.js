/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Main from './main';
import Footer from './footer';
import { useSiteMetadata } from '../hooks/use-site-metadata';

import '../styles/layout.css';

const Layout = ({ children, lang, pageLink }) => {
  const {
    // @ts-ignore
    title: { [lang]: siteTitle },
  } = useSiteMetadata();

  return (
    <div className="App-wrapper">
      <Header siteTitle={siteTitle} lang={lang} />
      <Main>{children}</Main>
      <Footer siteTitle={siteTitle} lang={lang} pageLink={pageLink} />
    </div>
  );
};

Layout.propTypes = {
  lang: PropTypes.string.isRequired,
  pageLink: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
