const path = require('path')
const webpack = require('webpack')
const express = require('express')
const checkDLL = require('./check-dll')
module.exports = ({ webpackConfig, scripts }) => {
  return new Promise((resolve, reject) => {
    const manifest = 'dll-manifest.json'
    checkDLL()
      .then(_ => {
        webpackConfig.plugins.push(new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require(path.join(process.cwd(), '.zante', manifest))
        }))

        scripts.push(({ server }) => {
          server.use('/dll.js', express.static(path.join(process.cwd(), '.zante', 'dll.js')))
        })

        resolve({
          webpackConfig,
          scripts
        })
      }).catch(reject)
  })
}
