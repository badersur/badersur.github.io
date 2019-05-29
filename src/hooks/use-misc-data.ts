import { useStaticQuery, graphql } from 'gatsby';

import { MiscNode } from '..';

export const useMiscYamlData = (): MiscNode => {
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
