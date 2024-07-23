import React from 'react'
import { columns } from './_components/columnt'
import { getAllUsers } from '@/actions/user'
import { formatDate } from '@/lib/format-date'
import { DataTable } from '@/components/dashboard/data-table'

export default async function DashboardUserPage() {
  const users = await getAllUsers()

  const modifiedData = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    date: formatDate(user.createdAt),
  }))

  return (
    <div>
      <DataTable
        columns={columns}
        data={modifiedData}
        search='email'
        placeholderSearch='Email'
      />
    </div>
  )
}
