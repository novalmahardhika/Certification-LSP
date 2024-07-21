import React, { ReactNode } from 'react'
import { Button } from './button'
import { signIn } from 'next-auth/react'

const items = [
  {
    name: 'Google',
    provider: 'google',
  },
  {
    name: 'Github',
    provider: 'github',
  },
]

export default function SocialButton() {
  return (
    <>
      {items.map((item) => (
        <Button
          type='button'
          variant='outline'
          key={item.name}
          onClick={() => signIn(item.provider, { callbackUrl: '/' })}
        >
          {item.name}
        </Button>
      ))}
    </>
  )
}
