const path = require("path");
const fableUtils = require("fable-utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

// webpack-serve
const history = require("connect-history-api-fallback");
const convert = require("koa-connect");

// Contains all built files, ignoring temporary files
// `./dist` is the default for Webpack
const buildDir = "./dist";
// Check for Webpack CLI's production flag to see if
// this is a production build
const isProduction = process.argv.indexOf("-p") !== -1;

// Configure Babel to compile Fable correctly
// const babelOptions = fableUtils.resolveBabelOptions({
//   presets: [
//     ["env", { "targets": { "browsers": "> 1%" }, "modules": false }]
//   ],
// });

// Common Webpack plugins
let plugins = [
  // Removes `./dist` to 
  new CleanWebpackPlugin([ buildDir ], {
    verbose: false,
  }),
  // Copies `./src/index.html` to `./dist` and adds
  // script tags for each of the bundles
  new HtmlWebpackPlugin({
    title: "App",
    template: "./src/index.html",
  }),
];

if (isProduction) {
  plugins = plugins.concat([
    new PrerenderSPAPlugin({
      // The path to the folder where index.html is.
      staticDir: path.resolve(__dirname, buildDir),
      // List of routes to prerender.
      routes: [
        "/",
        "/about",
        "/404",
      ],
      // Remove unnecessary whitespace
      //
      // HtmlWebpackPlugin offers minification as well,
      // but we perform it here to remove duplicated 
      // work
      minify: {
        collapseWhitespace: true,
      },
    }),
    // Inject preload/prefetch meta tags for each of
    // the bundles
    new ResourceHintWebpackPlugin(),
  ]);
}

module.exports = {
  // Default compilation mode
  // Webpack CLI's `-p` flag sets this to `production`
  mode: "development",
  // Create source maps in development
  devtool: isProduction ? "none" : "source-map",
  // Default entry is `./src/index.js`
  entry: "./src/fable-demo.fsproj",
  output: {
    filename: isProduction ? "[name].[hash].js" : "[name].js",
    // Use absolute URLs for bundles
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.fs(x|proj)?$/,
        use: {
          loader: "fable-loader",
          options: {
            // babel: babelOptions,
            define: isProduction ? [] : ["DEBUG"],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader",
        //   options: babelOptions,
        // },
        use: "babel-loader",
      },
    ],
  },
  plugins,
  // Fable dependencies can exist outside of the project's
  // root directory (e.g. `$HOME/.nuget`), so let Webpack
  // know where to find NPM packages
  resolve: {
    modules: [ path.resolve(__dirname, "./node_modules") ]
  },
};

// `webpack-serve` doesn't support History API fallbacks
// (loading `/index.html` for missing URLs), so we have
// to manually handle it ourselves
module.exports.serve = {
  content: [ buildDir ],
  add: (app, middleware, options) => {
    // see: https://github.com/bripkens/connect-history-api-fallback#options
    const historyOptions = {};
    app.use(convert(history(historyOptions)));
  },
};
