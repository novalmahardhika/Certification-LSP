import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React, { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex justify-center items-center h-screen px-3 '>
      <Card className='max-w-3xl w-full  grid sm:grid-cols-2 h-[400px] rounded-md'>
        <div className='relative overflow-hidden rounded-l-md  hidden sm:block'>
          <Image
            src='/assets/img-auth.jpg'
            fill
            sizes='100%'
            priority
            alt='img-auth'
            className='object-cover'
          />
        </div>
        <div>{children}</div>
      </Card>
    </div>
  )
}
