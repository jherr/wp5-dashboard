const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/graph2",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:3001/graph2/",
    path: path.resolve(__dirname, "dist/graph2"),
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
      name: "graph2",
      library: { type: "var", name: "graph2" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        graph2: "./src/graph2",
      },
      shared: ["react", "recoil", "@emotion/core", "emotion-theming"],
    }),
  ],
};
