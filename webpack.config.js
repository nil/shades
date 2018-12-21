const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      c: path.resolve(__dirname, 'components/'),
      a: path.resolve(__dirname, 'assets/'),
      js: path.resolve(__dirname, 'src/js/'),
      store: path.resolve(__dirname, 'src/store.js')
    }
  }
};
