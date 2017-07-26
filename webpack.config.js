var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = process.env.NODE_ENV === "production";
var cssDev = ["style-loader", "css-loader", "sass-loader"]
var cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "sass-loader"]
});

var cssConfig = isProd ? cssProd : cssDev;

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR,
        filename: "app.bundle.js"
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
            filename: "app.css",
            disable: !isProd,
            allChunks: true
        })
    ]
};

module.exports = config;