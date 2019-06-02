const path = require('path');

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


  return config;
};