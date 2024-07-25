import React from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

type TitleDashboardProps = {
  title: string
  href?: string
  desc: string
  isMain?: boolean
}

export default function TitleDashboard({
  title,
  href,
  desc,
  isMain,
}: TitleDashboardProps) {
  return (
    <div className='flex justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='desc-title'>{desc}</p>
      </div>
      {isMain && (
        <Button asChild className='px-2'>
          <Link href={href || ''}>
            <PlusIcon className='h-6 w-6' />
          </Link>
        </Button>
      )}
    </div>
  )
}
