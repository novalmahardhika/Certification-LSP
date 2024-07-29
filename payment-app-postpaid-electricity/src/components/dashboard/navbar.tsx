'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

export default function Navbar() {
  const user = useCurrentUser()

  return (
    <nav className='w-full h-14 flex justify-end items-center lg:h-[60px] '>
      <Avatar>
        <AvatarImage src={user?.image || undefined} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  )
}
