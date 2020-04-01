module.exports = {
    '/': {
        template: 'index.ejs',
        output: 'index.html',
        ssrTemplate: 'index.html',
        title: 'Personal Page - Sam Jones',
    },
    '/personal/': {
        template: 'index.ejs',
        ssrTemplate: 'index.html',
        title: 'Personal Page - Sam Jones',
    },
    '/digital-cv/': {
        template: 'index.ejs',
        output: 'digital-cv.html',
        ssrTemplate: 'digital-cv.html',
        title: 'Digital CV - Sam Jones',
    },
    '/projects/': {
        template: 'index.ejs',
        output: 'projects.html',
        ssrTemplate: 'projects.html',
        title: 'Projects Page - Sam Jones',
    },
    '/personal/travel/': {
        template: 'index.ejs',
        output: 'travel.html',
        ssrTemplate: 'travel.html',
        title: 'Travel Page - Sam Jones',
    },
};
