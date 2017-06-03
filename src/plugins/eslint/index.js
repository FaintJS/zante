const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const webpack = require('webpack')

module.exports = ({ webpackConfig, userConfig }, options = {}) => {
  webpackConfig.plugins.push(new HappyPack({
    id: 'eslint',
    threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
    loaders: ['eslint-loader'],
    verbose: false
  }))

  webpackConfig.module.rules.push({
    test: /\.jsx?/,
    use: ['happypack/loader?id=eslint'],
    enforce: 'pre',
    include: options.include || userConfig.source,
    exclude: options.exclude || []
  })

  return {
    webpackConfig
  }
}
