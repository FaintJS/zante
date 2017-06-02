const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const webpack = require('webpack')

module.exports = ({ webpackConfig }) => {
  webpackConfig.plugins.push(new HappyPack({
    id: 'eslint',
    threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
    loaders: ['babel-eslint']
  }))

  webpackConfig.module.rules.push({
    test: /\.jsx?/,
    use: ['eslint-loader'],
    enforce: 'pre'
  })

  return {
    webpackConfig
  }
}
