/**
 * Created by chensiwei on 2017/7/27.
 */
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const src = path.resolve(process.cwd(), 'src')
const entries = {}
const outputHtml = []
const files = glob.sync(`${src}/entry/**/*.js`)
files.forEach((filePath) => {
    const p = filePath.split('entry')[1]
    const fileEntryName = p.substring(p.indexOf('/') + 1, p.lastIndexOf('/'))
    const conf = {
        template: `${src}/entry/${fileEntryName}/index.html`,
        filename: `${fileEntryName}/index.html`,
        chunks: [fileEntryName],
        chunksSortMode: 'dependency'
    }
    new HtmlWebpackPlugin(conf)
    outputHtml.push(new HtmlWebpackPlugin(conf))
    entries[fileEntryName] = filePath
})

module.exports = {
    devtool: 'source-map',
    entry: Object.assign(entries, {}),
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: process.env.NODE_ENV === 'production' ? '/assets' : '/',
        filename: '[name].[hash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ],
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ].concat(outputHtml),
    devServer: {
        host: '10.254.102.234',
        stats: {
            cached: false,
            colors: true
        },
        compress: true,
        hot: true,
        inline: true,
        proxy: {
            '/proxyajax/*': {
                target: 'http://t.3c.163.com',
                pathRewrite: {'^/proxyajax': 'http://t.3c.163.com'},
                changeOrigin: true,
                secure: false
            }
        },
        port: 8083
    }
}
