const path = require('path')
const webpack = require('webpack')
module.exports = ({ webpackConfig }) => {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(process.cwd(), 'node_modules')
          ) === 0
        )
      }
    })
  )
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  )
  return {
    webpackConfig
  }
}
