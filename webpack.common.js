module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']},
      {test:/\.(png|svg|jpg|gif)$/,
        use: ['file-loader']},
      {test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']}
    ]
  },
};