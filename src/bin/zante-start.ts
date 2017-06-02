#!/usr/bin/env node
import chalk from 'chalk'

import loadRC from '../lib/loadRC'
import Parser from '../lib/parser'
import startWebpack from '../lib/webpack'

async function start () {
  const app = process.cwd()

  const rc = loadRC(app)
  console.log(chalk.white('✅  zante: load rc file'))

  let parser = new Parser({app, rc, env: process.env.NODE_ENV})
  try {
    let {
      webpackConfig,
      userConfig,
      scripts
    } = await parser.parse()
    console.log(chalk.white('✅  zante: generate webpack config and scripts'))
    await startWebpack({
      app,
      webpackConfig,
      userConfig,
      scripts
    })
    console.log(chalk.white('✅  zante: started!'))
  } catch (e) {
    console.log(e)
  }
}

start()
