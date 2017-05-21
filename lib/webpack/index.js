const express = require('express')
const chalk = require('chalk')
const utils = require('../utils')
const webpack = require('webpack')

module.exports = ({ app, webpackConfig, scripts, userConfig }) => {
  let compiler = webpack(webpackConfig)
  let server = express()
  const next = () => new Promise((resolve, reject) => {
    if (!scripts.length) {
      return resolve()
    }
    let script = scripts.shift()
    let promise = script.call(global, { webpackConfig, server, compiler })
    if (utils.isPromise(promise)) {
      promise.then(
        next().then(resolve, reject),
        (e) => {
          console.log(chalk.red(`❌ zante error: script catch error`))
          throw e
        }
      )
    } else {
      next().then(resolve, reject)
    }
  })

  next().then(_ => {
    let port = userConfig.port
    server.listen(port, function () {
      console.log(`✅ zante Listen at ${port}`)
    })
  })
}
