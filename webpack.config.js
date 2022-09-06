const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new Dotenv(),
    new webpack.ProvidePlugin({ process: "process/browser" }),
  ],

  watch: true,
  devtool: "eval-source-map",
};
