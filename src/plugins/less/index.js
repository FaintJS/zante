module.exports = ({ webpackConfig }) => {
  webpackConfig.module.rules.push({
    test: (file) => {
      return file.endsWith('.less') && !file.endsWith('.global.less')
    },
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
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
          modules: false
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
