/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';

import Main from './main';
import Header from './header';
import Footer from './footer';
import { LayoutProps } from '../types';
import useSiteMetadata from '../hooks/use-site-metadata';

import '../styles/layout.css';

const Layout = ({ children, lang, pageLink = '' }: LayoutProps) => {
    const {
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

export default Layout;
