import React, { ReactNode } from 'react'
import { Button } from './button'
import { signIn } from 'next-auth/react'

type SocialButtonType = {
  children: ReactNode
  provider: string
}

export default function SocialButton({ children, provider }: SocialButtonType) {
  return (
    <Button
      variant='ghost'
      onClick={() =>
        signIn(provider, {
          callbackUrl: '/',
        })
      }
      className=' sm:text-black text-white bg-white/5 sm:bg-transparent border-0 sm:border backdrop-blur-sm'
    >
      {children}
    </Button>
  )
}
