import { useStaticQuery, graphql } from 'gatsby';

/**
 * A hook to get misc yaml data
 *
 * @returns {import('..').MiscNode} misc yaml nodes
 */
export const useMiscYamlData = () => {
  const {
    allMiscYaml: { edges },
  } = useStaticQuery(
    graphql`
      query MiscYamlQuery {
        allMiscYaml {
          edges {
            node {
              headings {
                overview {
                  ar
                  en
                }
                projects {
                  ar
                  en
                }
                blog {
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
                notFound {
                  ar
                  en
                }
                otherLang {
                  ar
                  en
                }
                download {
                  ar
                  en
                }
                source {
                  ar
                  en
                }
                website {
                  ar
                  en
                }
              }
              messages {
                indexDescription {
                  ar
                  en
                }
                projectsDescription {
                  ar
                  en
                }
                coursesDescription {
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
                notFound {
                  ar
                  en
                }
                switchSiteLang {
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
      }
    `
  );
  return edges[0].node;
};
