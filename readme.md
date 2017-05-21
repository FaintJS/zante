## zante

[![version](https://img.shields.io/npm/v/zante.svg)]()

Extremely simple way to use webpack.
Use `.zanterc.js` to config webpack, easy like `eslint` or `babel`. like this:
```js
module.exports = {
  entry: {
    app: './src/app.js'
  },
  plugins: [
    'es',
    'eslint',
    'css',
    'assets'
  ],
  env: {
    production: {
      output: {
        publicPath: 'http://xxx.cdn.com'
      },
      plugins: [
        'production',        
        'optimize',
        'commonchunk',
        'html'
      ]
    },
    development: {
      plugins: [
        'development',
        'dll',
        [
          'html',
          [{
            filename: 'index.html',
            dll: true
          }]
        ],
        'static',
        [
          'proxy',
          {
            api: 'http://mock-server.com'
          }
        ]
      ]
    }
  }
}

```
Needn't to write webpack config file yourself.The `.zanterc.js` file is enough!

## docs
It contains some plugins, so I write a gitbook here: [documention](https://zante.gitbooks.io/documention/)

## License
MIT



