const path = require('path');

module.exports = {
  entry: './startgai.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};

