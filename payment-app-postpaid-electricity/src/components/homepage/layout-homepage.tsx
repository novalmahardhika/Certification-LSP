'use client'

import React, { ReactNode } from 'react'
import { Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

export default function LayoutHomePage({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className='bg-indigo-700 h-16'>
        <div className='h-full max-w-7xl mx-auto px-3 flex justify-between items-center'>
          <Link href='/' className='flex items-center h-full'>
            <Lightbulb className='h-8 w-8 text-white' />
            <span className='text-white font-semibold text-xl'>Electricy</span>
          </Link>

          <Button
            variant={'ghost'}
            onClick={() => signOut()}
            className='text-white border  hover:text-indigo-700 '
          >
            Logout
          </Button>
        </div>
      </nav>

      <div className='max-w-7xl p-3 mx-auto'>{children}</div>
    </>
  )
}
