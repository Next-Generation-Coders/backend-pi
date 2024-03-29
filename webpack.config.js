const path =require ('path');


module.exports={

    entry: {
        main:'./app.js'
    },

    output:{
        path : path.join(__dirname,'dist'),
        publicPath:'/',
        filename: '[name].js',
        clean:true
    },

    mode:'development',
    target:'node',

    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                }
            }
        ]
    }

}