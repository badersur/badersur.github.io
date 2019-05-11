import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skill component
 *
 * @param {import('..').SkillProps} props
 */
const Skill = ({ lang, data }) => {
  const {
    // @ts-ignore
    text: { [lang]: text },
    techList,
  } = data;

  return (
    <div className="Skill">
      <p>{text}</p>

      <ul className="Skill-list">
        {techList.map(tech => (
          <li className="Skill-list-item" lang="en" dir="ltr">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

Skill.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    text: PropTypes.shape({
      ar: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
    techList: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Skill;
