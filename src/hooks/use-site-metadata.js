// credit: https://www.gatsbyjs.org/docs/use-static-query/#composing-custom-usestaticquery-hooks
import { useStaticQuery, graphql } from 'gatsby';

/**
 * A hook to get site metadata from gatsby-config.js
 *
 * @returns {import('..').SiteMetadata} metadata
 */
export const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteUrl
            twitter
            title {
              ar
              en
            }
          }
        }
      }
    `
  );
  return siteMetadata;
};
