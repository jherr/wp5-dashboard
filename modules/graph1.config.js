const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/graph1",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:3001/graph1/",
    path: path.resolve(__dirname, "dist/graph1"),
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "graph1",
      library: { type: "var", name: "graph1" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        graph1: "./src/graph1",
      },
      shared: ["react", "recoil", "@emotion/core", "emotion-theming"],
    }),
  ],
};
