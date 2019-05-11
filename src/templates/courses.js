import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import CourseProvider from '../components/course-provider';
import SEO from '../components/seo';

import '../styles/courses.css';

/**
 * Courses template
 *
 * @param {import('..').CoursesTemplateProps} props
 */
const CoursesTemplate = ({ data }) => {
  const lang = 'en';
  const pageLink = '/courses/';
  const miscYamlNode = data.allMiscYaml.edges[0].node;
  const coursesDescription = miscYamlNode.messages.coursesDescription[lang];
  const courseProvidersYamlEdges = data.allCourseProvidersYaml.edges;

  return (
    <Layout lang={lang}>
      <SEO
        lang={lang}
        pageLink={pageLink}
        title="Courses"
        description={coursesDescription}
      />

      <section className="Courses">
        <h1>Completed Online Courses</h1>

        {courseProvidersYamlEdges.map(({ node: courseProvider }) => (
          <CourseProvider data={courseProvider} />
        ))}
      </section>
    </Layout>
  );
};

CoursesTemplate.propTypes = {
  data: PropTypes.any.isRequired,
};

export const query = graphql`
  query {
    allMiscYaml {
      edges {
        node {
          messages {
            coursesDescription {
              en
            }
          }
        }
      }
    }

    allCourseProvidersYaml {
      edges {
        node {
          provider
          profile
          courses {
            name
            link
          }
        }
      }
    }
  }
`;

export default CoursesTemplate;
