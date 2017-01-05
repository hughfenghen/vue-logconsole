require('shelljs/global')
var ora = require('ora')
var path = require('path')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')

webpackConfig.plugins = [];

var c = merge(webpackConfig, {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin('[name].css')
    ]
})

var spinner = ora('building for production...')
spinner.start()

var assetsPath = config.build.assetsRoot
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(c, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
