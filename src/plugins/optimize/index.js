const webpack = require('webpack')

module.exports = ({ webpackConfig }) => {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
  webpackConfig.plugins.push(new webpack.optimize.AggressiveMergingPlugin({
    minSizeReduce: 1.5,
    moveToParents: true
  }))

  return {
    webpackConfig
  }
}
