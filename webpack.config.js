const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    entry: './src/index.js',
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] }
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      path: path.resolve(__dirname, 'dist'),
      //publicPath: "/dist/",
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, "src/public"),
      publicPath:  "http://localhost:8080/dist", // '/dist/',
      // hotOnly: true,
      proxy: {
        '/': {
          target: 'http://localhost:3000/',
          secure: false,
        },
      },
    },
  // plugins: [new webpack.HotModuleReplacementPlugin()]
  };
};
