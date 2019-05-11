import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Project from '../components/project';

import '../styles/projects.css';

/**
 * Projects template
 *
 * @param {import('..').ProjectsTemplateProps} props
 */
const ProjectsTemplate = ({ data, pageContext }) => {
  const { lang } = pageContext;
  const pageLink = '/projects/';
  const projectsNode = data.allMiscYaml.edges[0].node;
  const {
    headings: {
      // @ts-ignore
      projects: { [lang]: projects },
    },
    messages: {
      // @ts-ignore
      projectsDescription: { [lang]: projectsDescription },
    },
  } = projectsNode;
  const projectsYamlEdges = data.allProjectsYaml.edges;

  return (
    <Layout lang={lang} pageLink={pageLink}>
      <SEO
        lang={lang}
        multiLangs
        pageLink={pageLink}
        title={projects}
        description={projectsDescription}
      />

      <section className="Projects">
        <h1>{projects}</h1>

        <div className="Projects-list">
          {projectsYamlEdges.map(({ node: project }) => (
            <Project lang={lang} data={project} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

ProjectsTemplate.propTypes = {
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
            projects {
              ar
              en
            }
          }
          messages {
            projectsDescription {
              ar
              en
            }
          }
        }
      }
    }

    allProjectsYaml {
      edges {
        node {
          name {
            ar
            en
          }
          description {
            ar
            en
          }
          link
          linkType
        }
      }
    }
  }
`;

export default ProjectsTemplate;
