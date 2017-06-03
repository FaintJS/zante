const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
module.exports = ({ webpackConfig, scripts }) => {
  webpackConfig.devtool = 'eval-source-map'
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())

  webpackConfig.plugins.push(new webpack.NamedModulesPlugin())
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }))
  scripts.push(({ webpackConfig, server, compiler }) => {
    server.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      historyApiFallback: true,
      stats: {
        colors: true,
        chunks: false,
        warnings: false
      }
    }))
  })
  return {
    webpackConfig,
    scripts
  }
}
