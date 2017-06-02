const path = require('path')
const express = require('express')

module.exports = ({ scripts }) => {
  scripts.push(({ webpackConfig, server }) => {
    let staticPath = path.join(process.cwd(), 'static')
    server.use('/static', express.static(staticPath))
  })
  return {
    scripts
  }
}
