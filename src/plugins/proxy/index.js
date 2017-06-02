const proxyMiddleware = require('http-proxy-middleware')
module.exports = ({ scripts }, proxies) => {
  scripts.push(({ server }) => {
    for (let url in proxies) {
      let proxy = proxies[url]
      if (typeof proxy === 'string') {
        proxy = {
          target: proxy
        }
      }
      server.use(url, proxyMiddleware(proxy))
    }
  })
  return {
    scripts
  }
}
