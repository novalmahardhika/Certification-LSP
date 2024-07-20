'use client'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession()

  return (
    <main className='flex min-h-screen justify-center items-center flex-col'>
      {session.data ? JSON.stringify(session?.data) : 'Home'}

      <Button onClick={() => signOut()}>Logout</Button>
    </main>
  )
}
