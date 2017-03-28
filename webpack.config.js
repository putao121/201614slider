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
    //启动了一个http服务器
    devServer: {
        port: 8080,//服务路径
        inline: true,//当源码修改后会自动重新打包并刷新浏览器
        contentBase: './build'//静态文件根目录
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015"]
                },
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.(png|jpg|gif|bmp)$/,
                loader:'url-loader?limit=30000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}