import { bubbleSort } from './bubble-sort.js'

export function sorting(arr) {
  console.log('----- Result Sorting -----\n')

  const validateType = Array.isArray(arr)

  if (!validateType) {
    console.log('This type not array')
    return
  }

  return bubbleSort(arr)
}
