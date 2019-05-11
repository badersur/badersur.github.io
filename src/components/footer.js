import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// @ts-ignore
import pkg from '../../package';
import { useMiscYamlData } from '../hooks/use-misc-data';

library.add(faGithub);

/**
 * @param {number | Date} date
 * @param {string} lang
 */
const getFormattedYear = (date, lang) => {
  const dateOptions = { year: 'numeric' };
  const dateLocales = lang === 'ar' ? 'ar-OM-u-nu-arab-ca-islamic' : 'en-OM';
  return new Intl.DateTimeFormat(dateLocales, dateOptions).format(date);
};

const Footer = ({ siteTitle, lang, pageLink }) => {
  const {
    repository: { url: repoLink },
  } = pkg;
  const otherLang = lang === 'ar' ? 'en' : 'ar';
  const otherDir = lang === 'ar' ? 'ltr' : 'rtl';
  const otherPageLink = `/${otherLang}${pageLink}`;

  const repoCreationDate = new Date('2015-04-03T13:07:55Z');
  const currentDate = new Date();
  const repoCreationYear = getFormattedYear(repoCreationDate, lang);
  const currentYear = getFormattedYear(currentDate, lang);

  const {
    headings: {
      // @ts-ignore
      otherLang: { [lang]: otherLangText },
    },
    messages: {
      // @ts-ignore
      switchSiteLang: { [lang]: switchSiteLangMsg },
    },
  } = useMiscYamlData();

  return (
    <footer className="Footer">
      <div className="Content-wrapper">
        <div className="Footer-items">
          <p className="Footer-text">
            {siteTitle} &copy; {repoCreationYear} &mdash; {currentYear}
          </p>

          <div className="Footer-links">
            <a href={repoLink} lang="en" dir="ltr">
              <FontAwesomeIcon
                icon={faGithub}
                size="2x"
                title="github icon"
                className="Font-awesome-icon"
                fixedWidth
              />
            </a>

            {/* credit: https://stackoverflow.com/a/10805292 */}
            <span title={switchSiteLangMsg.replace(/\r?\n|\r/, '')}>
              <a
                href={otherPageLink}
                hrefLang={otherLang}
                lang={otherLang}
                dir={otherDir}
                className="Footer-lang-switcher"
              >
                {otherLangText}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  lang: PropTypes.string.isRequired,
  pageLink: PropTypes.string,
  siteTitle: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  pageLink: '/',
};

export default Footer;
