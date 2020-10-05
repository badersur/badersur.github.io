import React from 'react';
import {Link} from 'gatsby';
import {GithubIcon} from './icons';

import pkg from '../../package.json';
import {FooterProps} from '../types';
import useMiscYamlData from '../hooks/use-misc-data';

const getFormattedYear = (date: number | Date, lang: string) => {
	const dateOptions = {year: 'numeric'};
	const dateLocales = lang === 'ar' ? 'ar-OM-u-nu-arab-ca-islamic' : 'en-OM';
	return new Intl.DateTimeFormat(dateLocales, dateOptions).format(date);
};

const Footer = ({siteTitle, lang, pageLink}: FooterProps) => {
	const {
		repository: {url: repoLink}
	} = pkg;
	const otherLang = lang === 'ar' ? 'en' : 'ar';
	const otherDir = lang === 'ar' ? 'ltr' : 'rtl';
	const otherPageLink = `/${otherLang}${pageLink || '/'}`;

	const repoCreationDate = new Date('2015-04-03T13:07:55Z');
	const currentDate = new Date();
	const repoCreationYear = getFormattedYear(repoCreationDate, lang);
	const currentYear = getFormattedYear(currentDate, lang);

	const {
		headings: {
			otherLang: {[lang]: otherLangText}
		},
		messages: {
			switchSiteLang: {[lang]: switchSiteLangMessage}
		}
	} = useMiscYamlData();

	return (
		<footer className="Footer">
			<div className="Content-wrapper">
				<div className="Footer-items">
					<p className="Footer-text">
						{`${siteTitle} `}
						&copy;
						{` ${repoCreationYear} `}
						&mdash;
						{` ${currentYear}`}
					</p>

					<div className="Footer-links">
						<a href={repoLink} lang="en" dir="ltr">
							<GithubIcon/>
						</a>

						{/* credit: https://stackoverflow.com/a/10805292 */}
						<span title={switchSiteLangMessage.replace(/\r?\n|\r/, '')}>
							<Link
								to={otherPageLink}
								hrefLang={otherLang}
								lang={otherLang}
								dir={otherDir}
								className="Footer-lang-switcher"
							>
								{otherLangText}
							</Link>
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
