import React from 'react';
import {graphql} from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import {NotFoundTemplateProps} from '../types';

import '../styles/404.css';

const NotFoundTemplate = ({data, pageContext}: NotFoundTemplateProps) => {
	const {lang, multiLangs} = pageContext;
	const otherLang = lang === 'ar' ? 'en' : 'ar';
	const otherDir = otherLang === 'ar' ? 'rtl' : 'ltr';
	const miscYamlNode = data.allMiscYaml.edges[0].node;
	const {
		headings: {notFound},
		messages: {notFound: notFoundMessage}
	} = miscYamlNode;

	const notFoundInCurrentLang = notFound[lang];
	const notFoundMessageInCurrentLang = notFoundMessage[lang];
	const notFoundInOtherLang = notFound[otherLang];
	const notFoundMessageInOtherLang = notFoundMessage[otherLang];

	return (
		<Layout lang={lang}>
			<SEO noIndex title={notFoundInCurrentLang} lang={lang}/>

			<section className="Error-messages">
				<div className="Error-message Board">
					<h1>{notFoundInCurrentLang}</h1>
					<p>{notFoundMessageInCurrentLang}</p>
				</div>

				{multiLangs && (
					<div
						className="Error-message Board"
						lang={otherLang}
						dir={otherDir}
					>
						<h1>{notFoundInOtherLang}</h1>
						<p>{notFoundMessageInOtherLang}</p>
					</div>
				)}
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
                        notFound {
                            ar
                            en
                        }
                    }
                    messages {
                        notFound {
                            ar
                            en
                        }
                    }
                }
            }
        }
    }
`;

export default NotFoundTemplate;
