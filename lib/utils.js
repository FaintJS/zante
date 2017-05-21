module.exports.uniqueArray = (array, back = false) => {
  let unique = []
  if (back) {
    array.reverse().forEach(item => {
      if (unique.indexOf(item) === -1) {
        unique.push(item)
      }
    })
    return unique.reverse()
  } else {
    array.forEach(item => {
      if (unique.indexOf(item) === -1) {
        unique.push(item)
      }
    })
    return unique
  }
}

module.exports.configKeys = ['entry', 'output', 'module', 'resolve', 'performance', 'devtool', 'context', 'target', 'externals', 'stats', 'devServer', 'resolveLoader', 'profile', 'bail', 'cache', 'watch', 'watchOptions', 'node', 'recordsPath', 'recordsInputPath', 'recordsOutputPath']

module.exports.isPromise = (promise) => {
  if (!promise) {
    return false
  }
  return 'then' in promise && typeof promise.then === 'function' && 'catch' in promise && typeof promise.catch === 'function'
}
