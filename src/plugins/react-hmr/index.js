const chalk = require('chalk')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = ({ webpackConfig, scripts, userConfig }) => {
  let entry = webpackConfig.entry
  if (Array.isArray(entry)) {
    webpackConfig.entry = entry.map(app => {
      return [
        'webpack-hot-middleware/client?reload=true',
        'webpack-dev-server/client?http://0.0.0.0:' + userConfig.port,
        'react-hot-loader/patch'
      ].concat(app)
    })
  } else {
    Object.keys(webpackConfig.entry).forEach(function (name) {
      webpackConfig.entry[name] = [
        'webpack-hot-middleware/client?reload=true',
        'webpack-dev-server/client?http://0.0.0.0:' + userConfig.port,
        'react-hot-loader/patch'
      ].concat(webpackConfig.entry[name])
    })
  }

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  console.log(chalk.yellow('zante tip: you are using react-hmr plugin. Please ensure you use react-hot-loader/babel plugin in babelrc for development env'))

  scripts.push(({ webpackConfig, server, compiler }) => {
    server.use(webpackHotMiddleware(compiler))
  })

  return {
    webpackConfig,
    scripts
  }
}
