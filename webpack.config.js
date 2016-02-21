var path = require('path');

module.exports = {
  cache: false,
  entry: {
    bundle: './public/scripts/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts/build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'scripts/src'],
    fallback: path.join(__dirname, 'scripts/src')
  }
};
