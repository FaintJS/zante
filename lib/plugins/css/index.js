module.exports = ({ webpackConfig }) => {
  webpackConfig.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          module: true,
          localIdentName: '[name]_[local]_[hash:base64:3]'
        }
      },
      'postcss-loader'
    ]
  })
  webpackConfig.module.rules.push({
    test: /\.global\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          module: false,
          localIdentName: '[name]_[local]_[hash:base64:3]'
        }
      },
      'postcss-loader'
    ]
  })
  return {
    webpackConfig
  }
}
