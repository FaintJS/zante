#!/usr/bin/env node
import fs from 'fs'
import path, { join } from 'path'
import chalk from 'chalk'
import shelljs from 'shelljs'
import utils from '../lib/utils'

// copy rc file: zanterc eslintrc babelrc
const init = (app, rc) => {
  const defaultPath = join(__dirname, '../lib/default')
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

// insert default dependencies
const appendDependencies = (app: string) => {
  const deps = require('../lib/default/default-dependencies.json')

  utils.error(
    !fs.existsSync(join(app, 'package.json')),
    'there must be a package.json file. Use npm init or yarn init to create it'
  )

  let pkg = require(join(app, 'package.json'))
  pkg.devDependencies = Object.assign({}, pkg.devDependencies, deps)

  pkg.scripts = Object.assign({
    dev: 'cross-env NODE_ENV=development zante start',
    build: 'cross-env NODE_ENV=production zante start'
  }, pkg.scripts)

  fs.writeFileSync(join(app, 'package.json'), JSON.stringify(pkg, null, 4))
}

// copy app entry file
const copyEntry = (app: string) => {
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
