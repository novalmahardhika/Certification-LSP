'use client'
import { createUser } from '@/actions/user'

export default function Home() {
  return (
    <main className='flex min-h-screen justify-center items-center'>
      <button
        className='bg-gray-900 p-2 text-white rounded-md'
        onClick={async () => await createUser()}
      >
        Create User
      </button>
    </main>
  )
}
