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
const init = () => {
    glob.sync(`${src}/entry/!**!/!*.js`, {}, (er, files) => {
        if (er !== null) {
            console.log('glob error:', er)
            return
        } else {
            files.forEach((filePath) => {
                const p = filePath.split('entry')[1]
                const fileEntryName = p.substring(p.indexOf('/') + 1, p.lastIndexOf('/'))
                const conf = {
                    template: `${src}/entry/${fileEntryName}/index.html`,
                    filename: `${fileEntryName}/index.html`,
                    chunksSortMode: 'dependency'
                }
                new HtmlWebpackPlugin(conf)
                outputHtml.push(new HtmlWebpackPlugin(conf))
                entries[fileEntryName] = filePath
            })
            /*const config = {
                entry: entries,
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
                    compress: true,
                    hot: true,
                    proxy: {
                        '/api': {
                            target: 'http://localhost:3000',
                            pathRewrite: {'^/api' : ''}
                        }
                    },
                    port: 8081
                }
            }
            return config*/
        }
    })
}
/*glob(`${src}/entry/!**!/!*.js`, {}, (er, files) => {
    if (er !== null) {
        console.log('glob error:', er)
        return
    } else {
        const arr = []
        files.forEach((filePath) => {
            const o = {}
            const p = filePath.split('entry')[1]
            const fileEntryName = p.substring(p.indexOf('/') + 1, p.lastIndexOf('/'))
            // console.log('-----', filePath, filename)
            console.log('-----', fileEntryName)
            o.entry = {
                app: filePath
            }
            o.output = {
                path: path.resolve(process.cwd(), 'dist'),
                publicPath: process.env.NODE_ENV === 'production' ? '/assets' : '/',
                filename: '[name].[hash:8].js'
            }
            o.module = {
                loaders: [
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    }
                ]
            }
            o.plugins = [
                new webpack.HotModuleReplacementPlugin(),
                new HtmlWebpackPlugin({
                    template: `${src}/entry/${fileEntryName}/index.html`,
                    filename: `${fileEntryName}/index.html`
                })
            ]
        })
    }
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**!/!*.js"]
    // er is an error object or null.
})*/
/*const outputHtml = () => {
    glob(`${src}/entry/!**!/!*.js`, {}, (er, files) => {
        if (er !== null) {
            console.log('glob error:', er)
            return
        } else {
            const arr = []
            files.forEach((filePath) => {
                const p = filePath.split('entry')[1]
                const fileEntryName = p.substring(p.indexOf('/') + 1, p.lastIndexOf('/'))
                const conf = {
                    template: `${src}/entry/${fileEntryName}/index.html`,
                    filename: `${fileEntryName}/index.html`,
                    chunksSortMode: 'dependency',
                }
                new HtmlWebpackPlugin(conf)
                arr.push(new HtmlWebpackPlugin(conf))
            })
            return arr
        }
    })
}*/
const o = glob.sync(`${src}/entry/!**!/!*.js`)
console.log('+++++++++++++++++++++', o)
module.exports = {
    entry: {
        app: `${src}/entry/page1/index.js`
    },
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
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: `${src}/entry/page1/index.html`,
            filename: 'page1/index.html'
        })
    ],
    devServer: {
        compress: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        },
        port: 8083
    }
};
/*const obj = {
    entry: {
        app: `${src}/entry/page1/index.js`
    },
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
        compress: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        },
        port: 8081
    }
}*/

/*module.exports = {
    entry: entries,
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
        compress: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        },
        port: 8081
    }
}*/
