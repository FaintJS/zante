const webpack = require('webpack')
const express = require('express')

module.exports = ({ webpackConfig, scripts }) => {
  webpackConfig.devtool = false
  webpackConfig.output.filename = 'js/[name].[chunkhash].js'
  webpackConfig.output.chunkFilename = 'js/[name].[chunkhash].js'

  webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin())

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }))

  scripts.push(({webpackConfig, server, compiler}) => {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err)
        }
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: true
        }) + '\n')
        server.use('/', express.static(webpackConfig.output.path))
      })
    })
  })
  return {
    webpackConfig,
    scripts
  }
}
