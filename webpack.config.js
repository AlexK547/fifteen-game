const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/assets/scripts', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'main[contenthash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Fifteen game',
      filename: 'main.html',
      template: "src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}