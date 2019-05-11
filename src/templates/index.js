import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Parser, HtmlRenderer } from 'commonmark';

// credid:
// https://github.com/rockchalkwushock/codybrunner.me/blob/8c662cb7939eb5795559caccd180ba85e46f3f28/src/components/commons/Icon.js#L5
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitter,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import SEO from '../components/seo';
import Skill from '../components/skill';
import Layout from '../components/layout';

import '../styles/index.css';

library.add(faGithub, faTwitter, faTelegram, faEnvelope);

const mdReader = new Parser();
// @ts-ignore
const mdWriter = new HtmlRenderer({ softbreak: ' ' });

const getIcon = key => {
  switch (key) {
    case 'email':
      return faEnvelope;
    case 'twitter':
      return faTwitter;
    case 'telegram':
      return faTelegram;
    case 'github':
      return faGithub;
    default:
      return faEnvelope;
  }
};

/**
 * @param {import('..').IndexTemplateProps} props
 */
const IndexTemplate = ({ data, pageContext }) => {
  const { lang } = pageContext;
  const pageLink = '/';
  const miscYamlNode = data.allMiscYaml.edges[0].node;
  const {
    headings: {
      // @ts-ignore
      overview: { [lang]: overview },
      // @ts-ignore
      greeting: { [lang]: greeting },
      // @ts-ignore
      skills: { [lang]: skills },
      // @ts-ignore
      contact: { [lang]: contact },
    },
    messages: {
      // @ts-ignore
      indexDescription: { [lang]: indexDescription },
      // @ts-ignore
      greeting: { [lang]: greetingMsg },
      // @ts-ignore
      contact: { [lang]: contactMsg },
    },
  } = miscYamlNode;
  const parsedGreetingMsg = mdReader.parse(greetingMsg);
  const greetingMsgInHtml = mdWriter.render(parsedGreetingMsg);
  // @ts-ignore
  // eslint-disable-next-line prefer-destructuring
  const contactLinks = miscYamlNode.links;

  const allSkillsYamlEdges = data.allSkillsYaml.edges;

  const links = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in contactLinks) {
    // eslint-disable-next-line no-prototype-builtins
    if (contactLinks.hasOwnProperty(key)) {
      let link = contactLinks[key];
      if (key === 'email') {
        link = `mailto:${link}`;
      }
      const icon = getIcon(key);
      links.push(
        <a href={link} className="Contact-link" lang="en" dir="ltr">
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            title={`${key} icon`}
            className="Font-awesome-icon"
            fixedWidth
          />
        </a>
      );
    }
  }

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
        <div className="Contact-links">{links}</div>
      </section>
    </Layout>
  );
};

IndexTemplate.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.any.isRequired,
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
