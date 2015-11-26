var path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'lib'),
    filename: "index.js",
    library: 'microstar',
    libraryTarget: 'commonjs2'
  },
  target: "node",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  }
};
