import { join } from 'path'
export default (app) => {
  return {
    entry: {
      app: join(app, 'src/app.js')
    },
    output: {
      path: join(app, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': join(app, 'src')
      }
    },
    resolveLoader: {
      modules: [
        join(__dirname, '../../node_modules'),
        join(app, 'node_modules')
      ]
    },
    module: {
      rules: []
    },
    plugins: [],
    cache: true
  }
}
