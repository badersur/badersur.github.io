import React from 'react';
import PropTypes from 'prop-types';
import { Parser, HtmlRenderer } from 'commonmark';

import { useMiscYamlData } from '../hooks/use-misc-data';

const mdReader = new Parser();
// @ts-ignore
const mdWriter = new HtmlRenderer({ softbreak: ' ' });

/**
 * Project component
 *
 * @param {import('..').ProjectProps} props
 */
const Project = ({ lang, data }) => {
  const {
    link,
    linkType,
    // @ts-ignore
    name: { [lang]: name },
    // @ts-ignore
    description: { [lang]: description },
  } = data;
  const parsedDescription = mdReader.parse(description);
  const descriptionInHtml = mdWriter.render(parsedDescription);

  const {
    headings: {
      // @ts-ignore
      [linkType]: { [lang]: linkText },
    },
  } = useMiscYamlData();

  return (
    <div className="Project Board">
      <h2>
        <a href={link}>{name}</a>
      </h2>

      <div
        className="Project-description"
        dangerouslySetInnerHTML={{ __html: descriptionInHtml }}
      />

      <a href={link} className="Project-link Button">
        {linkText}
      </a>
    </div>
  );
};

Project.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.shape({
      ar: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.shape({
      ar: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
    link: PropTypes.string.isRequired,
    linkType: PropTypes.string.isRequired,
  }).isRequired,
};

export default Project;
