import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => (
  <main className="Main">
    <div className="Content-wrapper">{children}</div>
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
