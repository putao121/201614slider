var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//console.log(path.resolve('build'));
//console.log(__dirname);
module.exports = {
    entry: './src/index.js',//入口文件
    output: {
        path: path.resolve('./build'),//路径
        filename: 'bundle.js'//
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}