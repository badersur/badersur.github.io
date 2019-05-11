import React from 'react';
import PropTypes from 'prop-types';

import Course from './course';

/**
 * Course Provider component
 *
 * @param {import('..').CourseProviderProps} props
 */
const CourseProvider = ({ data }) => {
  const { profile, provider, courses } = data;

  return (
    <div className="Course-provider">
      <h2>
        <span className="hidden">from</span> <a href={profile}>{provider}</a>
      </h2>

      <div className="Courses-list">
        {courses.map(course => (
          <Course data={course} />
        ))}
      </div>
    </div>
  );
};

CourseProvider.propTypes = {
  data: PropTypes.shape({
    provider: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CourseProvider;
