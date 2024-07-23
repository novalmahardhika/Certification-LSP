'use client'

import { ColumnDef } from '@tanstack/react-table'

import ActionUserTabel from './action-user-tabel'

export type UserTable = {
  id: string
  name: string
  email: string
  date: string
}

export const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
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
