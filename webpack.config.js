// credits: https://github.com/philipwalton/webpack-esnext-boilerplate/blob/master/tasks/bundles.js

const path = require('path');
const webpack = require('webpack');
const md5 = require('md5');

const publicPath = '/scripts/';
const outputDir = path.resolve(__dirname, '.tmp', 'scripts');

const getPathToScript = name => path.resolve(__dirname, 'app', 'scripts', name);

const getFilename = (support) => {
  let extension = '';
  if (support === 'legacy') {
    extension = '.es5';
  }
  // just works for runtime!
  return `[name]${extension}.js`;
};

const configurePlugins = (support) => {
  let extension = '';
  if (support === 'legacy') {
    extension = '.es5';
  }

  return [
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name === 'vendors~nunjucks') {
        const hashChunk = () => {
          return md5(Array.from(chunk.modulesIterable, (m) => {
            return m.identifier();
          }).join()).slice(0, 10);
        };
        return `vendors-nunjucks.${hashChunk()}${extension}`;
      }
      else if (chunk.name === 'main-legacy') {
        return `${chunk.name}${extension}`;
      }
      return chunk.name;
    }),
  ];
};

const configureBabelLoader = (browserlist) => {
  return {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          ['env', {
            debug: true,
            modules: false,
            useBuiltIns: true,
            targets: {
              browsers: browserlist,
            },
          }],
        ],
        plugins: ['syntax-dynamic-import'],
      },
    },
  };
};

const baseConfig = {
  mode: process.env.NODE_ENV || 'development',
  cache: {},
  devtool: '#source-map',
  optimization: {
    runtimeChunk: 'single',
  },
};

const modernConfig = Object.assign({}, baseConfig, {
  name: 'modern',
  entry: {
    'main': getPathToScript('main.js'),
  },
  output: {
    publicPath,
    path: outputDir,
    filename: (_chunkData) => getFilename('modern'),
  },
  plugins: configurePlugins('modern'),
  module: {
    rules: [
      configureBabelLoader([
        // The last two versions of each browser, excluding versions
        // that don't support <script type="module">.
        'last 2 Chrome versions', 'not Chrome < 60',
        'last 2 Safari versions', 'not Safari < 10.1',
        'last 2 iOS versions', 'not iOS < 10.3',
        'last 2 Firefox versions', 'not Firefox < 54',
        'last 2 Edge versions', 'not Edge < 15',
      ]),
    ],
  },
});

const legacyConfig = Object.assign({}, baseConfig, {
  name: 'legacy',
  entry: {
    'main-legacy': getPathToScript('main-legacy.js'),
  },
  output: {
    publicPath,
    path: outputDir,
    filename: (_chunkData) => getFilename('legacy'),
  },
  plugins: configurePlugins('legacy'),
  module: {
    rules: [
      configureBabelLoader([
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
      ]),
    ],
  },
});

module.exports = [modernConfig, legacyConfig];
