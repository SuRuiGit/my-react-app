const { injectBabelPlugin, getLoader } = require('react-app-rewired');
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(['import', {
        libraryName: 'antd-mobile',
        // style: 'css',
        style: true, // use less for customized theme
    }], config);
    return config;
};