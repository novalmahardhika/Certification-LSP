'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

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
      return <MoreHorizontal className='h-4 w-4' />
    },
  },
]
