export function resMemoryUsage(callback, manual) {
  const start = performance.now()

  callback()

  const end = performance.now()

  const time = start - end

  const { heapUsed } = process.memoryUsage()

  console.log(heapUsed)
  console.log(time.toFixed(2))
}
