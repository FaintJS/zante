import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import _ from 'lodash'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'

import utils from '../utils'
import { RC, UserConfig } from '../../typings'
import PostProcessor from './PostProcessor'

export default class Parser {
  app: string
  rc: RC
  env: string
  plugins: Array<any>

  webpackConfig: webpack.Configuration
  userConfig: UserConfig
  scripts: Array<Function>
  constructor ({ app, rc, env }) {
    this.app = app
    this.rc = rc
    this.env = env
    this.plugins = this.getAllPlugins()

    this.webpackConfig = this.getInitialWebpackConfig()
    this.userConfig = this.loadUserConfig()
    this.scripts = []
  }

  async parse () {
    let {
      webpackConfig,
      userConfig,
      scripts,

      plugins
    } = this

    const next = async () => {
      if (this.plugins.length) {
        let {func, args} = this.resolvePlugin(this.plugins.shift())
        args = [{ webpackConfig, userConfig, scripts }].concat(args)

        let ret = await func.apply(global, args)
        webpackConfig = ret.webpackConfig || webpackConfig
        scripts = ret.scripts || scripts
        next()
      }
    }
    await next()
    this.webpackConfig = webpackConfig
    this.userConfig = userConfig
    this.scripts = scripts

    let ret = new PostProcessor(this).process()
    return {
      webpackConfig: this.webpackConfig,
      userConfig: this.userConfig,
      scripts: this.scripts
    }
  }

  getInitialWebpackConfig (): webpack.Configuration {
    let webpackBaseConfig = require('./webpack.default')(this.app)
    let baseConfig = utils.onlyKeys(
      Object.assign({}, this.rc),
      require('../webpack/keys.json')
    )

    let envConfig = utils.onlyKeys(
      Object.assign({}, this.rc.env[this.env]),
      require('../webpack/keys.json')
    )
    return webpackMerge(webpackBaseConfig, baseConfig, envConfig)
  }

  loadUserConfig (): UserConfig {
    let defaultConfig = require('./userConfig.default')(this.app)
    let config = utils.onlyKeys(
      Object.assign({}, this.rc, this.rc.env[this.env]),
      Object.keys(defaultConfig)
    )
    return Object.assign({}, defaultConfig, config)
  }

  resolvePlugin (plugin): {func: Function, args: Array<any>} {
    let func
    let args
    if (Array.isArray(plugin)) {
      func = plugin[0]
      args = plugin.slice(1)
    } else {
      func = plugin
      args = []
    }

    if (typeof func !== 'function') {
      let pluginPath = path.join(__dirname, '../plugins', func)
      utils.error(
        !fs.existsSync(pluginPath),
        `plugin ${func} is not a built-in plugin`
      )
      func = require(pluginPath)
    }

    return {
      func: func,
      args: args
    }
  }

  getAllPlugins () {
    let plugins = this.rc.plugins
    let envConfig = this.rc.env[this.env]
    if (envConfig) {
      plugins = plugins.concat(envConfig.plugins || [])
    }
    return _.uniq(plugins.reverse()).reverse()
  }
}
