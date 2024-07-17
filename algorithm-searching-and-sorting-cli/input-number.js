import command from 'enquirer'

const { prompt } = command

export async function inputNumber(arr) {
  console.log('----- INPUT NUMBER -----\n')

  const input_length = await prompt({
    type: 'number',
    name: 'value',
    message: 'Input Total length value :',
  })

  for (let i = 0; i < +input_length.value; i++) {
    const input = await prompt({
      type: 'number',
      name: 'value',
      message: `Number ${i + 1} : `,
    })

    arr.push(input.value)
  }

  return arr
}
