import React from 'react'
import { columns } from './_components/column'
import { getAllUsers } from '@/actions/user'
import { formatDate } from '@/lib/format-date'
import { DataTable } from '@/components/dashboard/data-table'
import { mockUsers } from '@/lib/mock-data'
import TitleDashboard from '@/components/dashboard/title-dashboard'

export default async function DashboardUserPage() {
  const users = await getAllUsers()

  const modifiedData = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    costVariant: user.costVariant?.power,
    date: formatDate(user.createdAt),
  }))

  return (
    <div>
      <TitleDashboard
        title='Get List Users'
        href='/dashboard/users/create'
        desc='List all of user to manage them all.'
        isMain
      />
      <DataTable
        columns={columns}
        data={modifiedData}
        search='email'
        placeholderSearch='Email...'
      />
    </div>
  )
}
