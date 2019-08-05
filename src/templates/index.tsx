import React from 'react';
import { graphql } from 'gatsby';
import { Parser, HtmlRenderer } from 'commonmark';

import SEO from '../components/seo';
import Skill from '../components/skill';
import { IndexTemplateProps } from '../types';
import Layout from '../components/layout';
import {
    EmailIcon,
    GithubIcon,
    TelegramIcon,
    TwitterIcon,
} from '../components/icons';

import '../styles/index.css';

const mdReader = new Parser();
const mdWriter = new HtmlRenderer({ softbreak: ' ' });

const IndexTemplate = ({ data, pageContext }: IndexTemplateProps) => {
    const { lang } = pageContext;
    const pageLink = '/';
    const miscYamlNode = data.allMiscYaml.edges[0].node;
    const {
        headings: {
            overview: { [lang]: overview },
            greeting: { [lang]: greeting },
            skills: { [lang]: skills },
            contact: { [lang]: contact },
        },
        messages: {
            indexDescription: { [lang]: indexDescription },
            greeting: { [lang]: greetingMsg },
            contact: { [lang]: contactMsg },
        },
        links: { email, github, telegram, twitter },
    } = miscYamlNode;
    const parsedGreetingMsg = mdReader.parse(greetingMsg);
    const greetingMsgInHtml = mdWriter.render(parsedGreetingMsg);

    const allSkillsYamlEdges = data.allSkillsYaml.edges;

    return (
        <Layout lang={lang} pageLink={pageLink}>
            <SEO
                lang={lang}
                multiLangs
                pageLink={pageLink}
                title={overview}
                description={indexDescription}
            />

            <section className="Board">
                <h1>{greeting}</h1>
                <div dangerouslySetInnerHTML={{ __html: greetingMsgInHtml }} />
            </section>

            <section className="Board">
                <h2>{skills}</h2>

                {allSkillsYamlEdges.map(({ node: skill }) => (
                    <Skill lang={lang} data={skill} />
                ))}
            </section>

            <section className="Board">
                <h2>{contact}</h2>
                <p>{contactMsg}</p>
                <div className="Contact-links" lang="en" dir="ltr">
                    <a href={`mailto:${email}`} className="Contact-link">
                        <EmailIcon />
                    </a>

                    <a href={github} className="Contact-link">
                        <GithubIcon />
                    </a>

                    <a href={twitter} className="Contact-link">
                        <TwitterIcon />
                    </a>

                    <a href={telegram} className="Contact-link">
                        <TelegramIcon />
                    </a>
                </div>
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
                        overview {
                            ar
                            en
                        }
                        greeting {
                            ar
                            en
                        }
                        skills {
                            ar
                            en
                        }
                        contact {
                            ar
                            en
                        }
                    }
                    messages {
                        indexDescription {
                            ar
                            en
                        }
                        greeting {
                            ar
                            en
                        }
                        contact {
                            ar
                            en
                        }
                    }
                    links {
                        email
                        twitter
                        telegram
                        github
                    }
                }
            }
        }

        allSkillsYaml {
            edges {
                node {
                    text {
                        ar
                        en
                    }
                    techList
                }
            }
        }
    }
`;

export default IndexTemplate;
