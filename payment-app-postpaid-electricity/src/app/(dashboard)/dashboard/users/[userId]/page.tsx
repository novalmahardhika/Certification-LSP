import React from 'react'
import { FormUpdateUser } from '../_components/form-update-user'
import { getUserById } from '@/actions/user'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { getListCostVariant } from '@/actions/cost-variant'

export default async function DetailUserPage({
  params,
}: {
  params: { userId: string }
}) {
  const user = await getUserById(params.userId)

  const costVariant = await getListCostVariant()

  if (!user) {
    redirect('/dashboard/users')
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Detail User</h1>
      <Separator className='my-2' />
      <FormUpdateUser user={user} listCostVariant={costVariant} />
    </div>
  )
}
