const os = require('os')
const HappyPack = require('happypack')

module.exports = ({ webpackConfig, userConfig }, options = {}) => {
  webpackConfig.plugins.push(new HappyPack({
    id: 'es',
    threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
    loaders: ['babel-loader'],
    verbose: false
  }))

  webpackConfig.module.rules.push({
    test: /\.jsx?$/,
    use: ['happypack/loader?id=es'],
    include: options.include || userConfig.source,
    exclude: options.exclude || []
  })
  return {
    webpackConfig
  }
}
