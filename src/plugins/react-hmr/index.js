const chalk = require('chalk')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = ({ webpackConfig, scripts, userConfig }) => {
  let entry = webpackConfig.entry
  let options = 'path=http://localhost:' + userConfig.port + '/__webpack_hmr&quiet=true&reload=true'
  if (Array.isArray(entry)) {
    webpackConfig.entry = entry.map(app => {
      return [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client?'+ options
      ].concat(app)
    })
  } else {
    Object.keys(webpackConfig.entry).forEach(function (name) {
      webpackConfig.entry[name] = [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client?' + options
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
