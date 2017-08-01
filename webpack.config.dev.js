/**
 * Created by chensiwei on 2017/7/27.
 * process.env.CLIENT: pc || h5
 * process.env.CLIENT: dev || pro
 */
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const src = path.resolve(process.cwd(), 'src')
const entries = {}
const outputHtml = []
const files = glob.sync(`${src}/entry/${process.env.CLIENT}/**/*.js`)
files.forEach((filePath) => {
    const p = filePath.split(`${process.env.CLIENT}`)[1]
    const fileEntryName = p.substring(p.indexOf('/') + 1, p.lastIndexOf('/'))
    const conf = {
        template: `${src}/entry/${process.env.CLIENT}/${fileEntryName}/index.html`,
        filename: `${fileEntryName}/index.html`,
        // chunks: [fileEntryName, 'vendor'],
        chunks: [fileEntryName],
        chunksSortMode: 'dependency'
    }
    new HtmlWebpackPlugin(conf)
    outputHtml.push(new HtmlWebpackPlugin(conf))
    entries[fileEntryName] = filePath
})

module.exports = {
    devtool: 'source-map',
    entry: Object.assign(entries, {
        vendor: ['babel-polyfill', 'jquery']
    }),
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: process.env.NODE_ENV === 'production' ? '/assets' : '/',
        filename: '[name].[hash:8].js'
    },
    module: {
        noParse (content) {
            return /jquery|vue|babel-polyfill/.test(content)
        },
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: process.env.CLIENT === 'h5' ? {
                        presets: ['es2015']
                    } : {
                        presets: ['es2015'],
                        plugins: [
                            require('babel-plugin-transform-es3-member-expression-literals'),
                            [require('babel-plugin-transform-es2015-classes'), {loose: true}],
                            require('babel-plugin-transform-es2015-object-super'),
                            require('babel-plugin-transform-es3-property-literals')
                        ]
                    }
                }
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'vendor.[hash:8].js',
            minChunks: Infinity,
            minSize: 1,
        })
    ].concat(outputHtml),
    devServer: {
        host: '0.0.0.0',
        stats: {
            cached: false,
            colors: true
        },
        disableHostCheck: true,
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
        port: process.env.CLIENT === 'h5' ? 8083 : 8084
    }
}
