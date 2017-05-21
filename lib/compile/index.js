const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const loadUserConfig = require('./userConfig')
const utils = require('../utils')
const base = require('./base')

module.exports = ({ app, rc, env }) => {
  let webpackConfig = base({ app, rc, env })
  let scripts = []
  let userConfig = loadUserConfig({ app, rc, env })
  let plugins = getAllPlugins({ app, rc, env })
  const next = () => {
    return new Promise((resolve, reject) => {
      if (plugins.length <= 0) {
        return resolve()
      }

      let plugin = plugins.shift()
      let pluginFunc
      if (typeof plugin === 'function') {
        pluginFunc = plugin
      } else {
        let name = Array.isArray(plugin) ? plugin[0] : plugin
        let modulePath = path.join(__dirname, '../plugins', name)
        if (!fs.existsSync(modulePath)) {
          console.log(chalk.red(`❌ zante error: plugin ${name} is not a built-in plugin`))
          process.exit(0)
        }

        pluginFunc = require(modulePath)
      }

      let args = [{ webpackConfig, scripts, userConfig}].concat(Array.isArray(plugin) ? plugin.slice(1) : [])
      let promise = pluginFunc.apply(global, args)

      if (utils.isPromise(promise)) {
        promise.then(
          ret => {
            webpackConfig = ret.webpackConfig || webpackConfig
            scripts = ret.scripts || scripts
            next().then(resolve, reject)
          }, reject)
      } else {
        let ret = promise

        webpackConfig = ret.webpackConfig || webpackConfig
        scripts = ret.scripts || scripts
        next().then(resolve, reject)
      }
    })
  }

  return new Promise((resolve, reject) => {
    next().then(
      _ => resolve({
        webpackConfig: processConfig(webpackConfig, app),
        userConfig,
        scripts
      }),
      reject)
  })
}

const getAllPlugins = ({ app, rc, env }) => {
  let plugins = rc.plugins
  if (env && rc.env[env]) {
    plugins = plugins.concat(rc.env[env].plugins)
  }
  return utils.uniqueArray(plugins, true)
}

/**
 * @param {config} webpackConfig 
 */
const processConfig = (config, app) => {
  entryPath(config, app)
  outputPath(config, app)
  rulesInclude(config, app)
  return config
} 

const outputPath = (config, app) => {
  config.output.path = absolute(config.output.path, app)
}
const entryPath = (config, app) => {
  if (typeof config.entry === 'object') {
    Object.keys(config.entry).forEach(e => {
      config.entry[e] = absolute(config.entry[e], app)
    })
  } else if (Array.isArray(config.entry)) {
    config.entry = config.entry.map(file => absolute(file, app))
  }
  return config 
}

const absolute = (file, app) => {
  if (Array.isArray(file)) {
    return file.map(f => absolute(f, app))
  } else if (typeof file === 'string') {
    if (file.startsWith('.')) {
      return path.join(app, file)
    }
  }
  return file
}

const rulesInclude = (webpackConfig, app) => {
  webpackConfig.module.rules.forEach(rule => {
    rule.include = rule.include || []
    rule.include.push(path.join(app, 'src'))
  })
}
