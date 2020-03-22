const MCEP = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    MiniExtractCss: new MCEP({filename: 'css/style.bundle.css'}),
    CopyStatic: new CopyPlugin([
        {from: 'src/assets'},
    ]),
};
