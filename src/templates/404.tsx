import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import { NotFoundTemplateProps } from '../types';

import '../styles/404.css';

const NotFoundTemplate = ({ data, pageContext }: NotFoundTemplateProps) => {
    const { lang, multiLangs } = pageContext;
    const otherLang = lang === 'ar' ? 'en' : 'ar';
    const otherDir = otherLang === 'ar' ? 'rtl' : 'ltr';
    const miscYamlNode = data.allMiscYaml.edges[0].node;
    const {
        headings: { notFound },
        messages: { notFound: notFoundMsg },
    } = miscYamlNode;

    const notFoundInCurrentLang = notFound[lang];
    const notFoundMsgInCurrentLang = notFoundMsg[lang];
    const notFoundInOtherLang = notFound[otherLang];
    const notFoundMsgInOtherLang = notFoundMsg[otherLang];

    return (
        <Layout lang={lang}>
            <SEO title={notFoundInCurrentLang} lang={lang} noIndex />

            <section className="Error-messages">
                <div className="Error-message Board">
                    <h1>{notFoundInCurrentLang}</h1>
                    <p>{notFoundMsgInCurrentLang}</p>
                </div>

                {multiLangs && (
                    <div
                        className="Error-message Board"
                        lang={otherLang}
                        dir={otherDir}
                    >
                        <h1>{notFoundInOtherLang}</h1>
                        <p>{notFoundMsgInOtherLang}</p>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export const query = graphql`
    query {
        allMiscYaml {
            edges {
                node {
                    headings {
                        notFound {
                            ar
                            en
                        }
                    }
                    messages {
                        notFound {
                            ar
                            en
                        }
                    }
                }
            }
        }
    }
`;

export default NotFoundTemplate;
