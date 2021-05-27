module.exports = {
    plugins: ['node_modules/jsdoc-vuejs', 'plugins/markdown'],
    source: {
        include: ['src/**', 'README.md'],
        includePattern: '\\.(vue|js)$',
    },
    opts: {
        encoding: 'utf8',
    },
};
