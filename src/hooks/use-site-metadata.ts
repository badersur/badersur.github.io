// credit: https://www.gatsbyjs.org/docs/use-static-query/#composing-custom-usestaticquery-hooks
import {useStaticQuery, graphql} from 'gatsby';

import {SiteMetadata} from '../types';

/**
 * A hook to get site metadata from gatsby-config.js
 */
const useSiteMetadata = (): SiteMetadata => {
	const {
		site: {siteMetadata}
	} = useStaticQuery(
		graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        siteUrl
                        twitter
                        siteTitle {
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

export default useSiteMetadata;
