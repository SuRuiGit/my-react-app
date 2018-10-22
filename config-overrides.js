const { injectBabelPlugin, getLoader } = require('react-app-rewired');
const autoprefixer = require('autoprefixer');
const theme = require('./package.json').theme;
const fileLoaderMatcher = function (rule) {
    return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(['import', {
        libraryName: 'antd-mobile',
        // style: 'css',
        style: true, // use less for customized theme
    }], config);
    console.log(config.module.rules[2].oneOf);
    config.module.rules[2].oneOf.unshift(
        {
            test: /\.less$/,
            use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        // theme vars, also can use theme.js instead of this.
                        modifyVars: theme,
                    },
                },
            ]
        }
    );

    // file-loader exclude
    let l = getLoader(config.module.rules, fileLoaderMatcher);
    l.exclude.push(/\.less$/);

    return config;
};