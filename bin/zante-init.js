#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shelljs = require('shelljs')

const init = (app, rc) => {
  const defaultPath = path.join(__dirname, '../lib/default/')
  const exts = ['', '.js', '.json']
  let exist = exts.some(ext => {
    return fs.existsSync(path.join(app, `${rc}${ext}`))
  })
  
  if (!exist) {
    let defaultRC = exts.map(ext => path.join(defaultPath, `${rc}${ext}`)).filter(fs.existsSync)[0]
    let file = fs.readFileSync(defaultRC, 'utf-8')
    fs.writeFileSync(path.join(app, path.basename(defaultRC)), file)
  }
}

const appendDependencies = (app) => {
  const deps = require('../lib/default/default-dependencies.json')

  if (!fs.existsSync(path.join(app, 'package.json'))) {
    console.log(chalk.red('❌ zante init error: there must be a package.json file. Use npm init or yarn init to create it'))
    process.exit(0)
  }

  let pkg = require(path.join(app, 'package.json'))
  pkg.devDependencies = pkg.devDependencies || {}
  Object.keys(deps).forEach(dep => {
    if (!(dep in pkg.devDependencies)) {
      pkg.devDependencies[dep] = deps[dep]
    }
  })
  pkg.scripts = Object.assign({
    dev: "cross-env NODE_ENV=development zante start",
    build: "cross-env NODE_ENV=production zante start"
  }, pkg.scripts || {})

  fs.writeFileSync(path.join(app, 'package.json'), JSON.stringify(pkg, null, 4))
}

const copyEntry = (app) => {
  let target = path.join(app, 'src/app.js')
  if (!fs.existsSync(target)) {
    shelljs.mkdir('-p', path.dirname(target))
    shelljs.cp(
      path.join(__dirname, '../lib/default/app.js'),
      path.dirname(target)
    )
  }
}
let app = process.cwd()

appendDependencies(app)
init(app, '.babelrc')
init(app, '.eslintrc')
init(app, '.zanterc')
init(app, 'postcss.config')
copyEntry(app)

