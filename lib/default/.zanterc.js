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
