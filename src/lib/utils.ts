import chalk from 'chalk'
export const uniqueArray = (array: Array<any>, back = false) => {
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

export const onlyKeys = (obj: any, keys: Array<string>) => {
  let o = {}
  for (let name in obj) {
    if (keys.indexOf(name) > -1) {
      o[name] = obj[name]
    }
  }
  return o
}

export const isPromise = (promise: any) => {
  return promise && 'then' in promise && typeof promise.then === 'function' && 'catch' in promise && typeof promise.catch === 'function'
}

export const error = (condition: boolean, msg: string) => {
  if (condition) {
    console.log(chalk.red('❌  Zante Error: ' + msg))
    process.exit(0)
  }
}
