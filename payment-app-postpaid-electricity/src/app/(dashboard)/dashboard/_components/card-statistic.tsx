import { getListAllPaymentSuccess } from '@/actions/payment'
import { getAllUsers } from '@/actions/user'
import { formatRupiah } from '@/lib/format-rupiah'
import React from 'react'

export default async function CardStatistic() {
  const totalPaymentSuccess = await getListAllPaymentSuccess()

  const totalLength = totalPaymentSuccess.length

  const totalEarn = totalPaymentSuccess.reduce(
    (a, { totalPrice }) => a + totalPrice,
    0
  )

  const totalKwh = totalPaymentSuccess.reduce(
    (a, { totalKwh }) => a + totalKwh,
    0
  )

  const allUsers = (await getAllUsers()).length

  return (
    // <div className=' grid xl:grid-cols-2 gap-4'>
    <div className=' grid xl:grid-cols-4 gap-4'>
      <div className='w-full  flex  flex-wrap justify-center  flex-col space-y-2 p-4  shadow-md border rounded-md b '>
        <h2 className='font-semibold text-xl text-indigo-900'>Total Payment</h2>
        <h1 className='font-bold text-2xl text-green-500 '>
          {totalLength} Payment
        </h1>
        <p className='text-sm text-gray-500'>Total Payment success.</p>
      </div>

      <div className='w-full  flex flex-wrap  justify-center  flex-col space-y-2 p-4   shadow-md border rounded-md b '>
        <h2 className='font-semibold text-xl text-indigo-900'>All Earnings</h2>
        <h1 className='font-bold text-2xl text-green-500 '>
          {formatRupiah(totalEarn)}
        </h1>
        <p className='text-sm text-gray-500'>Total earn from every month.</p>
      </div>

      <div className='w-full  flex flex-wrap  justify-center  flex-col space-y-2 p-4   shadow-md border rounded-md b '>
        <h2 className='font-semibold text-xl text-indigo-900'>Total kWh</h2>
        <h1 className='font-bold text-2xl text-green-500 '>{totalKwh} kWh</h1>
        <p className='text-sm text-gray-500'>Total expenditure kWh.</p>
      </div>

      <div className='w-full  flex flex-wrap  justify-center  flex-col space-y-2 p-4   shadow-md border rounded-md b '>
        <h2 className='font-semibold text-xl text-indigo-900'>Total Users</h2>
        <h1 className='font-bold text-2xl text-green-500 '>{allUsers} Users</h1>
        <p className='text-sm text-gray-500'>Total list of registered users.</p>
      </div>
    </div>
  )
}
