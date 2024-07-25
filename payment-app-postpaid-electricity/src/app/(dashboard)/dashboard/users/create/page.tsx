import { Separator } from '@/components/ui/separator'
import React from 'react'
import { FormCreateUser } from '../_components/form-create-user'
import { getListCostVariant } from '@/actions/cost-variant'
import TitleDashboard from '@/components/dashboard/title-dashboard'

export default async function CreateUserPage() {
  const listVariant = await getListCostVariant()

  return (
    <div>
      <TitleDashboard
        title='Create User'
        desc='Create user page to create new user or admin.'
      />
      <Separator className='my-3' />
      <FormCreateUser listCostVariant={listVariant} />
    </div>
  )
}
