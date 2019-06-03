const path = require('path');
const webpack = require('webpack');
const GitPlugin = require('git-revision-webpack-plugin');
const gitPlugin = new GitPlugin();

const gitWebpackPlugin = new webpack.DefinePlugin({
  'global.version': `'${gitPlugin.version()}'`,
});

const plugins = [
  gitWebpackPlugin
]

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: { 
      '@': path.resolve(__dirname, 'src'),
      
      "@headless": path.resolve(__dirname, "src/headless/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@database": path.resolve(__dirname, "src/headless/database/"),
      "@src": path.resolve(__dirname, "src/"),
      "@components2": path.resolve(__dirname, "src/components2/"),
      "@containers": path.resolve(__dirname, "src/containers/")
    }
  };

  config.plugins = [
    ...config.plugins,
    ...plugins
  ]

  return config;
};