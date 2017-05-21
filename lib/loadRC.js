const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = (app) => {
  let rc, rcType
  let rcPath = {
    js: path.join(app, '.zanterc.js'),
    json: path.join(app, '.zanterc.json'),
    plain: path.join(app, '.zanterc')
  }

  if (fs.existsSync(rcPath.js)) {
    rc = require(rcPath.js)
    rcType = 'js'
  } else if (fs.existsSync(rcPath.json)) {
    rc = require(rcPath.json)
    rcType = 'json'
  } else if (fs.existsSync(rc.plain)) {
    const file = fs.readFileSync(rc.plain, 'utf-8')
    try {
      rc = JSON.parse(file)
      rcType = 'plain'
    } catch (e) {
      console.log(chalk.red(`❌  zante: file ${rc.plain} + is not valid JSON\nerror detail: ${e}`))
      process.exit(0)
    }
  }

  if (validateRC(rc)) {
    return rc
  } else {
    console.log(chalk.red(`❌  zante: file ${rc[rcType]} is not valid JSON or Object\n`))
    process.exit(0)
  }
}

const validateRC = (rc) => {
  return typeof rc === 'object'
}
