import React from 'react';

import { SkillProps } from '../types';

const Skill = ({ lang, data }: SkillProps) => {
    const {
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

export default Skill;
