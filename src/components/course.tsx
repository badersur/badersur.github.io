import React from 'react';

import {CourseProps} from '../types';

const Course = ({data}: CourseProps) => {
	const {link, name} = data;

	return (
		<a href={link} className="Course Board">
			{name}
		</a>
	);
};

export default Course;
