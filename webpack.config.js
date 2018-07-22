const path = require('path');

var outputDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/hello-world.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: outputDir,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.soy/,
      use: {
        loader: 'soy-loader',
        options: {
          outputDir: outputDir
        }
      }
    }]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  }
};
