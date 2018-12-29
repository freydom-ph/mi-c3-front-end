const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { minimize: true }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
                "style-loader", 
                "css-loader", 
                "sass-loader" 
            ]
          }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./index.html",
          filename: "./index.html"
        })
      ]
  };