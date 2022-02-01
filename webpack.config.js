const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  externals: [
    'react',
    'react-dom',
    'lodash',
    'immer',
    'styled-components',
    'styled-tools',
    '@idui/react-collapse',
    '@idui/react-toggle-controls',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
};
