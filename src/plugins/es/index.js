const os = require('os')
const HappyPack = require('happypack')

module.exports = ({ webpackConfig }) => {
  webpackConfig.plugins.push(new HappyPack({
    id: 'es',
    threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
    loaders: ['babel-loader']
  }))

  webpackConfig.module.rules.push({
    test: /\.jsx?$/,
    use: ['babel-loader']
  })
  return {
    webpackConfig
  }
}
