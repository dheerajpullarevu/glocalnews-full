const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  webpack.chainWebpack((config) => {
    // Add any webpack config customizations here
    config.resolve.alias.set(
      '@nativescript/theme',
      resolve(__dirname, 'node_modules/@nativescript/theme')
    );
  });

  return webpack.resolveConfig();
};