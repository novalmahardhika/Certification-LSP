import { auth } from '@/auth'
import { Card } from '@/components/ui/card'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <div className='flex justify-center items-center h-screen px-3 '>
      <Card className='max-w-3xl w-full  grid sm:grid-cols-2  rounded-md'>
        <div className="sm:flex justify-center items-center  rounded-l-md  hidden  bg-[url('/assets/img-auth-4.jpg')] bg-cover"></div>
        <div>{children}</div>
      </Card>
    </div>
  )
}
