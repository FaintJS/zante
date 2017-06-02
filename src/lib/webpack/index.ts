import * as express from 'express'
import * as chalk from 'chalk'
import * as utils from '../utils'
import * as webpack from 'webpack'
import { UserConfig } from '../../typings'

interface StartArgs {
  app: string,
  webpackConfig: webpack.Configuration,
  scripts: Array<Function>,
  userConfig: UserConfig
}

const start = async ({ app, webpackConfig, scripts, userConfig }: StartArgs) => {
  let compiler = webpack(webpackConfig)
  let server = express()
  async function next () {
    if (scripts.length) {
      let script = scripts.shift()
      try {
        await script.call(global, { webpackConfig, server, compiler })
      } catch (e) {
        console.log(chalk.red(`❌ zante error: script catch error`))
        throw e
      }
      next()
    }
  }
  await next()
  let port = process.env.PORT || userConfig.port
  let host = process.env.HOST || 'localhost'
  await new Promise((resolve, reject) => {
    server.listen(port, host, (error) => {
      if (error) {
        return reject()
      }
      console.log(`✅  zante Listen at ${port}`)
      resolve()
    })
  })
}

export default start
