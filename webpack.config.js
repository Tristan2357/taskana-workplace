const webpack = require("webpack");
const ModuleFederationPlugin = require(
  "webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  output: {
    publicPath: "http://localhost:1337/",
    uniqueName: 'taskana_workplace'
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfeWorkplace",
      library: { type: "var", name: "mfeWorkplace" },
      filename: "remoteEntry.js",
      exposes: {
        WorkplaceModule: ".//src/app/workplace/workplace.module.ts"
      },

      shared: {
        "@angular/core": { eager: true, singleton: true },
        "@angular/common": { eager: true, singleton: true },
        "@angular/router": { eager: true, singleton: true },
        "taskana-workplace-lib": {}
      }
    }),
  ],
};
