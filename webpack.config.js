const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

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
      name: "taskana_workplace",
      filename: "remoteEntry.js",
      exposes: {
        './Module': './/src/app/app.module.ts',
        './Component': './/src/app/app.component.ts'
      },

        shared: {
          "@angular/core": { singleton: true, requiredVersion: "~11.1.0" },
          "@angular/common": { singleton: true, requiredVersion: "~11.1.0" },
          "@angular/router": { singleton: true, requiredVersion: "~11.1.0" },
          "@angular/platform-browser": {},
          ...sharedMappings.getDescriptors()
        }

    }),
    sharedMappings.getPlugin(),
  ],
};
