import React from 'react';

import Course from './course';
import { CourseProviderProps } from '..';

const CourseProvider = ({ data }: CourseProviderProps) => {
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

export default CourseProvider;
