import webpack from '@types/webpack'

export interface UserConfig {
  server: boolean,
  port: number,
  source: string
}

export interface RC extends webpack.Configuration, UserConfig {
  env: RC
}
