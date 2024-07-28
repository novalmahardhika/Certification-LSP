'use client'

import { ColumnDef } from '@tanstack/react-table'

import ActionUserTabel from './action-user-tabel'

export type UserTable = {
  id: string
  name: string
  kwhNumber: string
  email: string
  costVariant: string | undefined
  date: string
}

export const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: 'kwhNumber',
    header: 'kWh Number',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'costVariant',
    header: 'Cost Variant',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return <ActionUserTabel {...user} />
    },
  },
]
