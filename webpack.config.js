const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const isProd = process.env.NODE_ENV === "production";
const cssDev = ["style-loader", "css-loader", "sass-loader"]
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "sass-loader"]
});

const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const config = {
    entry: {
        app: SRC_DIR + "/app/index.js",
        bootstrap: bootstrapConfig
    },
    output: {
        path: DIST_DIR,
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    "file-loader?name=images/[name].[ext]",
                    "image-webpack-loader"
                ]
            }, {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            }, {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                use: 'imports-loader?jQuery=jquery'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        hot: true,
        open: true,
        openPage: ""

    },
    plugins: [
        new HtmlWebpackPlugin({
            /* minify: { collapseWhitespace: true },*/
            hash: true,
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            filename: "/css/[name].css",
            disable: !isProd,
            allChunks: true
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
            purifyOptions: {
                minify: true
            }
        })
    ]
};

module.exports = config;