const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: { 
      '@': path.resolve(__dirname, 'src'),
      
      "@headless": path.resolve(__dirname, "src/headless/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@database": path.resolve(__dirname, "src/headless/database/"),
      "@utils": path.resolve(__dirname, "src/utils/")
    }
  };
  config.plugins = [
    ...config.plugins,
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['javascript', 'typescript']
    })
  ]

  return config;
};