const path = require('path');

module.exports = async({config}) =>{

    config.module.rules.push({
        test:/\.css$/,
        use:['resolve-url-loader'],
        include:path.resolve(__dirname,'../')
    })

    config.module.rules.push({
        test:/\.(woff|woff2|eot|ttf|png)$/,
        use:[
            {
                loader:'file-loader',
                query: {
                    name:'[name].[ext]'
                }
            }
        ],
        include: path.resolve(__dirname,'../')
    })
    return config
}