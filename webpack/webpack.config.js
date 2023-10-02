const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})
console.log('---------------------------------')
console.log('---------------------------------')
console.log('---------------------------------')
console.log('---------------------------------')
console.log('---------------------------------')
console.log(resolve(__dirname, 'static'))
module.exports = {
    mode: 'development',
    plugins: [htmlPlugin],
    entry: resolve(__dirname, './src/main.js'),
    output: {
        path: resolve(__dirname, './dist/'),
        filename: 'bundle.js'
    },

    devServer: {
        open: true,
        contentBase: resolve(__dirname, 'static'),
        //   publicPath:'/test'
        // static: './'
        // compress: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include:resolve(__dirname, 'src'),
                enforce:'pre',
                use:{
                loader:'eslint-loader',
                options:{fix:true}
                }
            },
            {
                test: /.jsx?$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                 { useBuiltIns: 'usage', corejs: '3.25', targets: { chrome: '68' } }
                            ]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp)$/, use: [{ loader: 'url-loader', options: { name: '[hash:10].[ext]', esModule: false, limit: 10 * 1024 } }], type: 'javascript/auto' },
            { test: /.html$/, use: ['html-loader'] }
            // {test:/\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use:[{loader:'url-loader',options:{limit:100000,esModule:false}}],type: 'javascript/auto'}
        ]
    }
}