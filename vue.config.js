const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Starbuttons";
      return args;
    });
  },
  configureWebpack: {
    plugins:
      process.env.ENV === "PRODUCTION"
        ? [
            new SentryCliPlugin({
              include: ".",
              ignoreFile: ".sentrycliignore",
              ignore: ["node_modules", "webpack.config.js"],
              configFile: "sentry.properties"
            })
          ]
        : []
  },
  pwa: {
    themeColor: "#6375BC",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
      importWorkboxFrom: "disabled",
      importScripts:
        "https://cdn.jsdelivr.net/npm/workbox-sw@5.1.3/build/workbox-sw.min.js"
    }
  }
};
