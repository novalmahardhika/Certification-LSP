'use client'

import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'kwhNumber',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  // {
  //   accessorKey: 'costVariant',
  //   header: 'Cost Variant',
  // },
  // {
  //   accessorKey: 'date',
  //   header: 'Date',
  // },

  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const user = row.original

  //     return <ActionUserTabel {...user} />
  //   },
  // },
]
