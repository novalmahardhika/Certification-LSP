import command from 'enquirer'
import { binarySearch } from './binary-search.js'

const { prompt } = command

export async function searching(arr) {
  console.log('----- Result Searching -----\n')

  const input_search = await prompt({
    type: 'number',
    name: 'value',
    message: 'Enter the number you are looking for :',
  })

  const validateType = Array.isArray(arr)

  if (!validateType) {
    console.log('This type not array')
    return
  }

  const start = performance.now()

  const result = binarySearch(arr, input_search.value)

  const end = performance.now()
  const time = start - end

  const { heapUsed } = process.memoryUsage()

  console.log(`Time Execution ${time.toFixed(2)} MS`)
  console.log(`Memory Usage ${(heapUsed / (1024 * 1024)).toFixed(2)} MB`)

  if (result === -1) {
    return 'Number is not found'
  } else {
    return `Number ${input_search.value} is founded`
  }
}
