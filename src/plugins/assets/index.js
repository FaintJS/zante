module.exports = ({ webpackConfig }) => {
  webpackConfig.module.rules.push({
    test: /\.json$/,
    use: ['json-loader']
  })
  webpackConfig.module.rules.push(
    {
      test: /\.(txt|md)$/,
      use: ['raw-loader']
    }
  )
  webpackConfig.module.rules.push({
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/[name].[hash].[ext]'
      }
    }]
  })
  webpackConfig.module.rules.push({
    test: /\.(eot|ttf|wav|mp3|woff|woff2)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash].[ext]'
      }
    }]
  })
  return {
    webpackConfig
  }
}
