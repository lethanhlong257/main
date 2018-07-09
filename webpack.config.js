// cau hinh cho dong goi tap tin nguon va dich
module.exports = {
    entry: './views/admin/index.js',
    output: {
        filename: './public/bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query:{
                    presets: ['es2015' , 'react', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'cheap-source-map'
}