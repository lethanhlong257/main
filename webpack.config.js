const path = require('path')

module.exports = {
    entry: './helper/app.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'public')
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query:{
                    presets: ['es2015','react', 'stage-2'],
                    plugins:[ 'transform-object-rest-spread' ]
                },
                test: /\.jsx$/,
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: './public',
        host: 'localhost',
        port: '3000'
    }
}