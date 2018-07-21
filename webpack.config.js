const path = require('path');

module.exports = {
  entry: './src/hello-world.js',
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.soy/,
      use: {
        loader: '@atlassian/atlassian-soy-loader',
        options: {
          i18n: 'src/*.properties',
          dontExpose: true
        }
      }
    }]
  }
};
