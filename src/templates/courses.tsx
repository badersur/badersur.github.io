import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import { CoursesTemplateProps } from '../types';
import CourseProvider from '../components/course-provider';

import '../styles/courses.css';

const CoursesTemplate = ({ data }: CoursesTemplateProps) => {
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
