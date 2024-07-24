import React from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

type TitleDashboardProps = {
  title: string
  href: string
}

export default function TitleDashboard({ title, href }: TitleDashboardProps) {
  return (
    <div className='flex justify-between'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <Button asChild className='px-2'>
        <Link href={href}>
          <PlusIcon className='h-6 w-6' />
        </Link>
      </Button>
    </div>
  )
}
