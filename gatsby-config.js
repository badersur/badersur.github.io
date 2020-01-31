'use strict';

/**
 * Run TypeScript code without compiling it
 * ts-node register helps compiling and importing TypeScript modules
 * credit: https://github.com/assainov/gatsby-extensive-starter-typescript/blob/master/gatsby-config.js
 */
require('ts-node').register();

// @ts-ignore
module.exports = require('./gatsby-config.ts');
