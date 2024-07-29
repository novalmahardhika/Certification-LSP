import { getAllAdmin } from '@/actions/user'
import { DataTable } from '@/components/dashboard/data-table'
import TitleDashboard from '@/components/dashboard/title-dashboard'
import React from 'react'
import { columns } from './column'

export default async function TabelAdmin() {
  const admins = await getAllAdmin()

  return (
    <div className='col-span-2'>
      <TitleDashboard
        title='List Admin'
        desc='List all of user admin in dashboard.'
      />

      <DataTable
        columns={columns}
        data={admins}
        search='name'
        placeholderSearch='Name'
      />
    </div>
  )
}
