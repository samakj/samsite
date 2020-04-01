const HtmlWebpackPlugin = require('html-webpack-plugin');
const MCEP = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const templateParameters = require('./src/page-templates/template-parameters');

module.exports = {
    MiniExtractCss: new MCEP({ filename: 'css/style.bundle.css' }),
    HtmlWebpackPlugin: new HtmlWebpackPlugin({
        template: 'src/page-templates/index.ejs',
        inject: false,
        ...templateParameters,
    }),
    CopyStatic: new CopyPlugin([
        { from: 'src/assets' },
    ]),
    DotEnv: new DotEnv(),
};
