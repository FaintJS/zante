import webpack from 'webpack'
import {join} from 'path'
import Parser from './index'

export default class {
  parser: Parser
  constructor (parser: Parser) {
    this.parser = parser
  }

  process () {
    let {
      webpackConfig,
      userConfig,
      scripts
    } = this.parser

  }

  _safePath (file: string) {
    if (file.startsWith('.')) {
      return join(this.parser.app, file)
    } else {
      return file
    }
  }

  safePath () {
    let parser = this.parser
    let app = parser.app

    // user config source
    parser.userConfig.source = this._safePath(parser.userConfig.source)

    // entry
    let entry = parser.webpackConfig.entry
    if (Array.isArray(entry)) {
      parser.webpackConfig.entry = entry.map(this._safePath)
    } else if (typeof entry !== 'string') {
      for (let name in entry as any) {
        if (Array.isArray(entry[name])) {
          parser.webpackConfig.entry[name] = Array.from(entry[name]).map(this._safePath)
        } else {
          parser.webpackConfig.entry[name] = this._safePath(entry[name] as string)
        }
      }
    } else {
      parser.webpackConfig.entry = this._safePath(entry)
    }

    // output
    parser.webpackConfig.output.path = this._safePath(parser.webpackConfig.output.path)
  }

  ruleInclude () {
    let rules = (this.parser.webpackConfig.module as webpack.NewModule).rules || (this.parser.webpackConfig.module as webpack.OldModule).loaders
    rules.forEach(rule => {
      if (!rule.include || (Array.isArray(rule.include) && rule.include.length === 0)) {
        rule.include = this.parser.userConfig.source
      }
    })
  }
}
