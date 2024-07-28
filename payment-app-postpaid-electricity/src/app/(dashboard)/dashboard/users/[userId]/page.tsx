import React from 'react'
import { FormUpdateUser } from '../_components/form-update-user'
import { getUserById } from '@/actions/user'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { getListCostVariant } from '@/actions/cost-variant'
import TitleDashboard from '@/components/dashboard/title-dashboard'
import CreateBill from '../_components/create-bill'

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

  const currentUsage = user.usage.filter((usage) => usage.isActive === true)[0]

  if (!user.costVariant || !user.costVariant.costPerKwh) {
    user.costVariant = costVariant[0]
  }

  return (
    <div>
      <TitleDashboard
        title='Detail Users'
        desc='Show all of detail data from user.'
      />
      <Separator className='my-3' />
      <div className='grid md:grid-cols-2 gap-10  md:gap-5 xl:gap-0'>
        <FormUpdateUser user={user} listCostVariant={costVariant} />
        <div className='w-full  order-first md:order-last '>
          <CreateBill
            currentUsage={currentUsage}
            costVariant={user.costVariant}
          />
        </div>
      </div>
    </div>
  )
}
