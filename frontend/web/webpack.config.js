const path = require('path');
const plugins = require('./webpack.plugins');
const rules = require('./webpack.rules');
const resolve = require('./webpack.resolve');

module.exports = [
    // Server
    {
        resolve,
        mode: 'development',
        entry: [path.join(__dirname, 'src', 'server.ts')],
        target: 'node',
        name: 'server',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'js/server.bundle.js',
            publicPath: '/static/',
        },
        plugins: [plugins.MiniExtractCss],
        module: {
            rules: [rules.ts, rules.js, rules.scss],
        },
        devtool: 'source-map',
        stats: {
            children: false,
            colors: true,
        },
    },

    // Client
    {
        resolve,
        mode: 'development',
        output: {
            path: path.join(__dirname, 'public'),
            chunkFilename: 'js/[name].bundle.js',
            filename: 'js/[name].bundle.js',
            publicPath: '/static/',
        },
        plugins: [plugins.MiniExtractCss, plugins.CopyStatic],
        module: {
            rules: [rules.ts, rules.js, rules.scss],
        },
        devtool: 'source-map',
        entry: [path.join(__dirname, 'src', 'client.tsx')],
        target: 'web',
        name: 'client',
        stats: {
            children: false,
            colors: true,
        },
        optimization: {
            nodeEnv: 'development',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'initial',
                    },
                },
            },
        },
    },
];
