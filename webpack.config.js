const HtmlWebpackPlugin = require("html-webpack-plugin");
const DayjsWebpackPlugin = require("dayjs-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./public/src/index.html",
  filename: "./index.html",
});

const daysjsPlugin = new DayjsWebpackPlugin();

module.exports = {
  entry: path.resolve(__dirname, "public/src/index"),
  output: {
    path: path.resolve(__dirname, "public/dist"),
    publicPath: "./public",
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|gif|otf|png|svg|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [htmlPlugin, daysjsPlugin],
};
