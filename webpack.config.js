const path = require('path');

// PLUGINS Y MODIFICADORES DE CSS Y SCSS/SASS

const HtmlWebpackPlugin = require('html-webpack-plugin'); // Para el template del HTML que va a usar Webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Para reducir los CSS
const { SourceMapDevToolPlugin } = require('webpack'); // Para conocer el SourceMap de nuestro proyecto
const ESLintPlugin = require('eslint-webpack-plugin');

// Configuración de puerto
const port = process.env.PORT || 3000;

// Exportar configuraciones de Webpack
module.exports = {
    stats: {
        children: true,
    },
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        historyApiFallback: true
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // Reglas para archivos de JS y JSX
            // Tienen que pasar el LINTING para poder pasar
            {
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                /*use: [
                    'eslint-loader',
                    'source-map-loader',
                ]*/
            },
            //Regles para archivos JS y JSX
            // Reglas de Babel ES y JSX
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                          ],
                    },
                },
            },
            // Reglas archivos CSS, SASS y SCSS
            {
                test: /(\.css|\.scss)$/,
                use: [
                     MiniCssExtractPlugin.loader ,
                     'css-loader' ,
                     'sass-loader' ,
                     "style-loader",
                ],
            },
            // Reglas para los archivos de imágenes
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        // Template HTML
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './css/styles.css'
        }),
        new SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        modules: [
            'node-modules'
        ],
        alias: {
            'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
          },
    }
}
