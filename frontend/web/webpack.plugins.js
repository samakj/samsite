const MCEP = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
    MiniExtractCss: new MCEP({filename: 'css/style.bundle.css'}),
    CopyStatic: new CopyPlugin([
        {from: 'src/assets'},
    ]),
    DotEnv: new DotEnv(),
};
