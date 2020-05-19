function Promise(fn) {
  this.callbacks = []

  function resolve(val) {
    this.data = val
    this.callbacks.forEach(callback => {
      callback(this.data)
    })
  }

  fn(resolve.bind(this))
}

Promise.prototype.then = function (onResolved) {
  return new Promise(resolve => {
    this.callbacks.push(() => {
      const result = onResolved(this.data)
      if (result instanceof Promise) {
        return result.then(resolve)
      } else {
        return resolve(result)
      }
    })
  })
}

let p = new Promise(resolve => {
  setTimeout(() => {
    console.log('init')
    resolve(1)
  }, 1000)
})

p.then(res => {
  console.log(res)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2 * res)
    }, 1000)
  })
}).then(res => {
  console.log(res)
})
