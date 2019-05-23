import React from 'react';
import PropTypes from 'prop-types';

// credid:
// https://github.com/rockchalkwushock/codybrunner.me/blob/8c662cb7939eb5795559caccd180ba85e46f3f28/src/components/commons/Icon.js#L5
import {
  faGithub,
  faTwitter,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faGithub, faTwitter, faTelegram, faEnvelope);

const getIcon = name => {
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

const Icon = ({ name }) => (
  <FontAwesomeIcon
    size="2x"
    fixedWidth
    icon={getIcon(name)}
    title={`${name} icon`}
    className="Font-awesome-icon"
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export const EmailIcon = () => <Icon name="email" />;
export const TwitterIcon = () => <Icon name="twitter" />;
export const TelegramIcon = () => <Icon name="telegram" />;
export const GithubIcon = () => <Icon name="github" />;
