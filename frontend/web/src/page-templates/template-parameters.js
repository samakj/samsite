const themeColor = '#000000';
const webAppCapable = 'no';
const webAppTitle = 'Sam Jones Personal Website';
const startUrl = '/';

module.exports = {
    defaultTitle: 'Sam Jones - Personal Website',
    appMountId: 'app-root',
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
    description: 'Personal website for Sam Jones.',
    androidMeta: {
        themeColor,
        androidMeta: webAppCapable,
    },
    iOSMeta: {
        mobileWebAppTitle: webAppTitle,
        mobileWebAppCapable: webAppCapable,
        mobileWebAppStatusBarStyle: themeColor,
    },
    windowsMeta: {
        navbuttonColor: themeColor,
        tileColor: themeColor,
        tileImage: '',
        config: '',
    },
    pinnedSitesMeta: {
        applicationName: webAppTitle,
        toolTip: webAppTitle,
        startUrl: startUrl,
    },
};
