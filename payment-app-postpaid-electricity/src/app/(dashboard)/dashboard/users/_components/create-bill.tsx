import CardWrapper from '@/components/dashboard/card-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/format-date'
import { Usage } from '@prisma/client'
import React from 'react'

export default function CreateBill(currentUsage: Usage) {
  return (
    <div className=' w-full'>
      <h2 className='font-semibold mb-3 text-xl'>Detail Usage</h2>

      <CardWrapper className='flex flex-col space-y-3'>
        <span className='flex justify-between font-medium'>
          <p>Initial kWh</p>
          <p>{currentUsage.initialKwh}</p>
        </span>

        <span className='flex justify-between font-medium'>
          <p>Start Date</p>
          <p>{formatDate(currentUsage.startDate)}</p>
        </span>

        <span className='flex justify-between font-medium'>
          <p>End Date</p>
          <p>{formatDate(currentUsage.endDate)}</p>
        </span>

        <span className='flex flex-col justify-between font-medium '>
          <p>Final kWh :</p>
          <Input className='mt-3' type='text' datatype='numeric' />
        </span>

        <Button className='w-full'>Create Bill</Button>
      </CardWrapper>
    </div>
  )
}
