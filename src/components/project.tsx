import React from 'react';
import { Parser, HtmlRenderer } from 'commonmark';

import { ProjectProps } from '../types';
import useMiscYamlData from '../hooks/use-misc-data';

const mdReader = new Parser();
const mdWriter = new HtmlRenderer({ softbreak: ' ' });

const Project = ({ lang, data }: ProjectProps) => {
    const {
        link,
        linkType,
        name: { [lang]: name },
        description: { [lang]: description },
    } = data;
    const parsedDescription = mdReader.parse(description);
    const descriptionInHtml = mdWriter.render(parsedDescription);

    const {
        headings: {
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

export default Project;
