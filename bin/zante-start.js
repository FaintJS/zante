#!/usr/bin/env node
const chalk = require('chalk')

const loadRC = require('../lib/loadRC')
const compile = require('../lib/compile')
const startWebpack = require('../lib/webpack')

const app = process.cwd()

const rc = loadRC(app)
console.log(chalk.white('✅ zante: load rc file'))

compile({
  app,
  rc,
  env: process.env.NODE_ENV
}).then(({ webpackConfig, userConfig, scripts }) => {
  console.log(chalk.white('✅ zante: generate webpack config and scripts'))

  startWebpack({
    app,
    webpackConfig,
    userConfig,
    scripts
  })
  console.log(chalk.white('✅ zante: started!'))
}).catch(console.log)
