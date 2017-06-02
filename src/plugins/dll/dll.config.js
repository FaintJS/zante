var path = require('path')
var webpack = require('webpack')
var chalk = require('chalk')
var pkg = require(
  path.join(process.cwd(), 'package.json')
)
if (!pkg.dependencies || !Object.keys(pkg.dependencies).length) {
    chalk.red('❌ zante-plugin-dll error: zero dependencies found in package.json.DLL plugin need at least one dependency')
    process.exit(0)
}

module.exports = {
  entry: {
    dll: Object.keys(pkg.dependencies || {})
  },
  output: {
    path: path.join(process.cwd(), '.zante'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      path: path.join(process.cwd(), '.zante', '[name]-manifest.json')
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
