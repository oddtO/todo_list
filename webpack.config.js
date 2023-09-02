const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode == "production";
  const config = {
    entry: "./src/js/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction ? './' : 'auto',
      clean: true,
    },

    mode: argv.mode,
    devtool: isProduction ? undefined : "inline-source-map",
    devServer: {
      static: "./dist",
      watchFiles: ["src/**/*", "public/**/*"],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
    optimization: {
      minimizer: [`...`, new CssMinimizerWebpackPlugin()],
      minimize: isProduction,
      usedExports: true,
    },
  };

  return config;
};
