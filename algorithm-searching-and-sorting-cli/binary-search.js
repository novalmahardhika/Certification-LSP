export function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)

    if (arr[mid] === target) {
      return mid // Return the index where the target is found
    } else if (arr[mid] < target) {
      left = mid + 1 // Continue searching in the right half
    } else {
      right = mid - 1 // Continue searching in the left half
    }
  }

  return -1 // Return -1 if the target is not found
}
