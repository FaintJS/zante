import * as webpack from '@types/webpack'

export interface UserConfig {
  port: number,
  source: string,
  open: boolean
}

export interface RC extends webpack.Configuration, UserConfig {
  env: RC,
  plugins?: Array<any>
}
