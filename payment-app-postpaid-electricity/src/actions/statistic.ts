import { getListAllPaymentSuccess } from './payment'

const initiateData = new Array(12).fill(0).map((_, index) => ({
  month: index,
  payment: 0,
}))

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export async function statisticPayment() {
  let payments = await getListAllPaymentSuccess()

  const modifiedData = payments.map((payment, index) => ({
    month: new Date(payment.updatedAt).getMonth(),
    payment: index + 1,
  }))

  for (let i = 0; i < initiateData.length; i++) {
    for (const key of modifiedData) {
      if (key.month === initiateData[i].month) {
        if (key.payment > initiateData[i].payment) {
          initiateData[i] = key
        }
      }
    }
  }

  const statistic = initiateData.map((data) => ({
    month: month[data.month],
    payment: data.payment,
  }))

  return statistic
}
