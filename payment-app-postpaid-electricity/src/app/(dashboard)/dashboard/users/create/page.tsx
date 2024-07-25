import { Separator } from '@/components/ui/separator'
import React from 'react'
import { FormCreateUser } from '../_components/form-create-user'
import { getListCostVariant } from '@/actions/cost-variant'

export default async function CreateUserPage() {
  const listVariant = await getListCostVariant()

  return (
    <div>
      <h1 className='text-2xl font-bold'>Create User</h1>
      <Separator className='my-2' />
      <FormCreateUser listCostVariant={listVariant} />
    </div>
  )
}
