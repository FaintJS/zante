const path = require('path')
const webpackMerge = require('webpack-merge')
const configKeys = require('../utils').configKeys

/**
 * base webpack config
 */
module.exports = ({app, rc, env}) => {
  let envConfig = env && rc.env && rc.env[env] ? rc.env[env] : {}
  let baseConfig = Object.assign({}, rc, envConfig)
  Object.keys(baseConfig).forEach(key => {
    if (configKeys.indexOf(key) === -1) {
      delete baseConfig[key]
    }
  })
  return webpackMerge({
    entry: {
      app: path.join(app, 'src/app.js')
    },
    output: {
      path: path.join(app, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.join(app, 'src')
      }
    },
    resolveLoader: {
      modules: [
        path.join(__dirname, '../../node_modules'),
        path.join(app, 'node_modules')
      ]
    },
    module: {
      rules: []
    },
    plugins: [],
    cache: true
  }, baseConfig)
}
