const path = require('path');
const configOverrides = require('./config-overrides');
module.exports = function override(config) {
    config = configOverrides(config);
    config.entry = path.resolve(__dirname, "src/headlessTest/index.tsx");


    return config;
};