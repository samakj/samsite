var path = require('path');

module.exports = {
    alias: {
        '@samsite': path.join(__dirname, 'src'),
        '@samsite/public': path.join(__dirname, 'public'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
};
