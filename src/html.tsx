/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/html-has-lang */
import React from 'react';
import { HTMLProps } from './types';

const HTML = (props: HTMLProps) => (
    <html {...props.htmlAttributes}>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            {props.headComponents}
        </head>
        <body {...props.bodyAttributes}>
            {props.preBodyComponents}
            <div
                key="body"
                id="___gatsby"
                dangerouslySetInnerHTML={{ __html: props.body }}
            />
            {props.postBodyComponents}

            <noscript key="noscript" id="gatsby-noscript">
                <p className="Noscript">Please enable JavaScript!</p>
            </noscript>
        </body>
    </html>
);

export default HTML;
