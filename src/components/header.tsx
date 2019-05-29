import React from 'react';
import { Link } from 'gatsby';

import { HeaderProps } from '..';
import { useMiscYamlData } from '../hooks/use-misc-data';

const Header = ({ siteTitle, lang }: HeaderProps) => {
  const {
    headings: {
      overview: { [lang]: overview },
      projects: { [lang]: projects },
      blog: { [lang]: blog },
    },
  } = useMiscYamlData();

  const blogUrl = `https://bader-nasser.appspot.com/${lang}/`;

  return (
    <header className="Header">
      <div className="Content-wrapper">
        <div className="Nav-bar">
          <h1 className="Nav-bar-header">
            <Link to={`/${lang}/`}>{siteTitle}</Link>
          </h1>

          <ul className="Nav-bar-items">
            <li className="Nav-item">
              <Link to={`/${lang}/`}>{overview}</Link>
            </li>

            <li className="Nav-item">
              <Link to={`/${lang}/projects/`}>{projects}</Link>
            </li>

            <li className="Nav-item">
              <a href={blogUrl}>{blog}</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
