/**
 * Created by chensiwei on 2017/7/27.
 * process.env.CLIENT: pc || h5
 * process.env.CLIENT: dev || pro
 */
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
        vendor: ['babel-polyfill', 'jquery', 'vue']
    }),
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: process.env.NODE_ENV === 'production' ? '/assets' : '/',
        filename: '[name].[hash:8].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.less', '.css']
    },
    module: {
        noParse: [
            /node_modules\/vue\.runtime\.min/,
            /node_modules\/jquery\.min/,
            /node_modules\/babel-polyfill/
        ],
        rules: [
            {
                test: /\.(html|htm)$/,
                // use: [ 'file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
                use: {
                    loader: 'html-loader',
                    options: {interpolate: 'require'}
                }
            }, {
                test: /\.(css|less)$/,
                include: [path.resolve(__dirname, 'src')],
                exclude:  /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader',
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(sass|scss)$/,
                include: [path.resolve(__dirname, 'src')],
                exclude:  /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader',
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 3000,
                    name: '[name].[hash:7].[ext]'
                }
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: process.env.CLIENT === 'h5' ? {
                        presets: ['es2015']
                    } : process.env.CLIENT === 'pc' ? {
                        presets: ['es2015'],
                        plugins: [
                            require('babel-plugin-transform-es3-member-expression-literals'),
                            [require('babel-plugin-transform-es2015-classes'), {loose: true}],
                            require('babel-plugin-transform-es2015-object-super'),
                            require('babel-plugin-transform-es3-property-literals')
                        ]
                    } : {
                        presets: ['es2015']
                    }
                }
            }, {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015'],
                        plugins: [
                            require('babel-plugin-syntax-jsx')
                        ]
                    }
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader',
                            fallback: 'vue-style-loader'
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader',
                            fallback: 'vue-style-loader'
                        }),
                        less: ExtractTextPlugin.extract({
                            use: 'css-loader!less-loader',
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    },
                    extractCSS: true
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue': `${nodeModulesPath}/vue/dist/vue.min.js`,
            'jquery': `${nodeModulesPath}/jquery/dist/jquery.min.js`,
            'assets': `${src}/assets`
        }
    },
    plugins:[
        new ExtractTextPlugin('[name].css'),
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
        port: process.env.CLIENT === 'h5' ? 8083 : process.env.CLIENT === 'pc' ? 8084 : 8080
    }
}
