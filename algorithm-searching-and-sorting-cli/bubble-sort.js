export function bubbleSort(arr) {
  const start = performance.now()

  for (let i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j] > arr[j + 1]) {
        // If the condition is true
        // then swap them
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }

  const end = performance.now()
  const time = start - end

  const { heapUsed } = process.memoryUsage()

  console.log(`Time Execution ${time.toFixed(2)} MS`)
  console.log(`Memory Usage ${(heapUsed / (1024 * 1024)).toFixed(2)} MB`)

  return arr
}
