import React from 'react';
import {graphql} from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import {ProjectsTemplateProps} from '../types';
import Project from '../components/project';

import '../styles/projects.css';

const ProjectsTemplate = ({data, pageContext}: ProjectsTemplateProps) => {
	const {lang} = pageContext;
	const pageLink = '/projects/';
	const projectsNode = data.allMiscYaml.edges[0].node;
	const {
		headings: {
			projects: {[lang]: projects}
		},
		messages: {
			projectsDescription: {[lang]: projectsDescription}
		}
	} = projectsNode;
	const projectsYamlEdges = data.allProjectsYaml.edges;

	return (
		<Layout lang={lang} pageLink={pageLink}>
			<SEO
				multiLangs
				lang={lang}
				pageLink={pageLink}
				title={projects}
				description={projectsDescription}
			/>

			<section className="Projects">
				<h1>{projects}</h1>

				<div className="Projects-list">
					{projectsYamlEdges.map(({node: project}) => (
						<Project lang={lang} data={project} />
					))}
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
