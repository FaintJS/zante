module.exports = ({ webpackConfig }) => {
  webpackConfig.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          module: true,
          localIdentName: '[name]_[local]_[hash:base64:3]'
        }
      },
      'postcss-loader',
      'less-loader'
    ]
  })
  webpackConfig.module.rules.push({
    test: /\.global\.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          module: false,
          localIdentName: '[name]_[local]_[hash:base64:3]'
        }
      },
      'postcss-loader',
      'less-loader'
    ]
  })
  return {
    webpackConfig
  }
}
