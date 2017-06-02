const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ webpackConfig }, options) => {
  options = normalizeOptions(options)
  options.forEach(option => {
    let file = option.template
    delete option.template
    option.templateContent = templateContent(file, option.dll)
    webpackConfig.plugins.push(new HtmlWebpackPlugin(option))
  })
  return {
    webpackConfig
  }
}

const normalizeOptions = (options) => {
  if (!options || !options.length) {
    options = ['index.html']
  }
  if (!Array.isArray(options)) {
    console.log(chalk.red(`❌  zante-plugin-html error: options must be an Array`))
    process.exit(0)
  }
  return options.map(option => {
    if (typeof option === 'string') {
      option = {
        filename: option
      }
    }
    return Object.assign({
      filename: 'index.html',
      template: path.join(__dirname, 'template.html'),
      dll: false,
      inject: true
    }, option)
  })
}

const templateContent = (file, dll) => {
  let html = fs.readFileSync(file, 'utf-8')
  if (dll) {
    console.log(chalk.yellow('zante-plugin-html: you are using dll. Please ensure you use dll plugin in rc config'))
    let doc = cheerio(html)
    doc.find('body').append('<script src="/dll.js"></script>')
    return doc.toString()
  } else {
    return html
  }
}
