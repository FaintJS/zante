var process = require('process')
var webpack = require('webpack')
var webpackConfig = require('./dll.config')
var fs = require('fs')
var path = require('path')

module.exports = () => new Promise((resolve, reject) => {
  if (refresh()) {
    update()
    webpack(webpackConfig, function (err, stats) {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  } else {
    resolve()
  }
})

const refresh = () => {
  if (process.argv.indexOf('--dll') !== -1) {
    return true
  }

  let cachePath = path.join(process.cwd(), '.zante', 'dll-package.json')

  if (!fs.existsSync(cachePath)) {
    return true
  }

  let cache = require(cachePath)
  let pkg = require(
    path.join(process.cwd(), 'package.json')
  )

  if (Object.keys(cache.dependencies).length !== Object.keys(pkg.dependencies).length) {
    return true
  }

  return Object.keys(cache.dependencies).every(dep => {
    return cache.dependencies[dep] === pkg.dependencies[dep]
  })
}

function update () {
  let file = path.join(process.cwd(), '.zante', 'dll-package.json')
  let pkg = require(
    path.join(process.cwd(), 'package.json')
  )
  if (!fs.existsSync(path.join(process.cwd(), '.zante'))) {
    fs.mkdirSync(path.join(process.cwd(), '.zante'))
  }

  fs.writeFileSync(file, JSON.stringify({
    dependencies: pkg.dependencies
  }))
}
