const path = require('path');

module.exports = {
  webpack: {
    alias: {
      'Root': path.resolve(__dirname, 'src/'),
      'Actions': path.resolve(__dirname, 'src/Actions'),
      'Reducers': path.resolve(__dirname, 'src/Reducers'),
      'Store': path.resolve(__dirname, 'src/Store'),
      'Modules': path.resolve(__dirname, 'src/Modules'),
      'Hooks': path.resolve(__dirname, 'src/Hooks'),
      'Pages': path.resolve(__dirname, 'src/Pages'),
      'Components': path.resolve(__dirname, 'src/Components'),
      'Services': path.resolve(__dirname, 'src/Services'),
      'HOCs': path.resolve(__dirname, 'src/HOCs'),
      'Styles': path.resolve(__dirname, 'src/Styles'),
      'Icons': path.resolve(__dirname, 'src/Icons'),
      'Images': path.resolve(__dirname, 'src/Images')
    }
  },
};