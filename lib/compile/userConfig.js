module.exports = ({app, rc, env}) => {
  const initialConfig = {
    server: true,
    port: 9000
  }
  let config = Object.assign(initialConfig, rc, env && rc[env] ? rc[env] : {})
  Object.keys(config).forEach(key => {
    if (!(key in initialConfig)) {
      delete config[key]
    }
  })
  return config
}
