import command from 'enquirer'
import { inputNumber } from './input-number.js'
import { sorting } from './sorting.js'
import { searching } from './searching.js'

const { prompt } = command

async function main() {
  try {
    let stop

    let arr = []

    while (stop !== 4) {
      console.log('\n')

      console.log('----- MENU PILIHAN -----\n')
      console.log('1. Input Angka \n2. Sorting \n3. Searching \n4. Selesai\n ')

      const input_menu = await prompt({
        type: 'number',
        name: 'value',
        message: 'Enter your Option [1/2/3/4] : ',
      })

      console.log('\n')

      stop = input_menu.value

      switch (input_menu.value) {
        case 1:
          await inputNumber(arr)
          break
        case 2:
          console.log(`Result Sorting : ${sorting(arr)}`)
          break
        case 3:
          const res = await searching(arr)
          console.log('\n')
          console.log(`Result Searching : ${res}`)
          break
        case 4:
          console.log('Terima Kasih')
          break
        default:
          console.log('Please check your input ! \n')
          break
      }
    }
  } catch (error) {
    console.log()
  }
}

main()
