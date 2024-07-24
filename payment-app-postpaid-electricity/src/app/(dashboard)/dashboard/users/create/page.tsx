import { Separator } from '@/components/ui/separator'
import React from 'react'
import { FormCreateUser } from '../_components/form-create-user'

export default function CreateUserPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Create User</h1>
      <Separator className='my-2' />
      <FormCreateUser />
    </div>
  )
}
