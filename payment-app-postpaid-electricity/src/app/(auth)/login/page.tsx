import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'

export default function LoginPage() {
  return (
    <Card className='h-full w-full flex flex-col justify-center'>
      <CardHeader className='flex flex-col space-y-2'>
        <CardTitle className='text-3xl'>Login.</CardTitle>

        <CardDescription>
          Welcome, Lets join us to have a new experience in the new world.
        </CardDescription>
      </CardHeader>

      <CardContent className='flex space-x-2 '>
        <Button variant={'outline'}>Google</Button>
        <Button variant={'outline'}>Github</Button>
      </CardContent>
    </Card>
  )
}
