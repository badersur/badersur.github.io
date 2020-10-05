import React from 'react';
// credid:
// https://github.com/rockchalkwushock/codybrunner.me/blob/8c662cb7939eb5795559caccd180ba85e46f3f28/src/components/commons/Icon.js#L5
import {
	faGithub,
	faTwitter,
	faTelegram
} from '@fortawesome/free-brands-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IconProps} from '../types';

library.add(faGithub, faTwitter, faTelegram, faEnvelope);

const getIcon = (name: string) => {
	switch (name) {
		case 'email':
			return faEnvelope;
		case 'twitter':
			return faTwitter;
		case 'telegram':
			return faTelegram;
		case 'github':
			return faGithub;
		default:
			return faEnvelope;
	}
};

const Icon = ({name}: IconProps) => (
	<FontAwesomeIcon
		fixedWidth
		size="2x"
		icon={getIcon(name)}
		title={`${name} icon`}
		className="Font-awesome-icon"
	/>
);

export const EmailIcon = () => <Icon name="email"/>;
export const TwitterIcon = () => <Icon name="twitter"/>;
export const TelegramIcon = () => <Icon name="telegram"/>;
export const GithubIcon = () => <Icon name="github"/>;
