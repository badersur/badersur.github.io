// credit: https://www.gatsbyjs.org/docs/use-static-query/#composing-custom-usestaticquery-hooks
import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetadata {
  siteUrl: string;
  twitter: string;
  title: {
    ar: string,
    en: string,
  };
}

/**
 * A hook to get site metadata from gatsby-config.js
 */
export const useSiteMetadata = (): SiteMetadata => {
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
