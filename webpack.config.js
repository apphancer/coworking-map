var Encore = require('@symfony/webpack-encore');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('web/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')

    .enableReactPreset()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use Sass/SCSS files
    .enableSassLoader()

    .copyFiles([
        {from: './assets/images', to: 'images/[path][name].[ext]'},
    ])

    .configureBabel(function(babelConfig) {
        // add additional presets
        // babelConfig.presets.push('@babel/preset-flow');

        // no plugins are added by default, but you can add some
        babelConfig.plugins.push('@babel/plugin-proposal-class-properties');
    }, {
        // node_modules is not processed through Babel by default
        // but you can whitelist specific modules to process
        // include_node_modules: ['foundation-sites']

        // or completely control the exclude
        // exclude: /bower_components/
    })

// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();