import React from 'react';
import PropTypes from 'prop-types';

/**
 * Course component
 *
 * @param {import('..').CourseProps} props
 */
const Course = ({ data }) => {
  const { link, name } = data;

  return (
    <a href={link} className="Course Board">
      {name}
    </a>
  );
};

Course.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default Course;
