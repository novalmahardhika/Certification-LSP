import React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { ModalDelete } from '../modals/modal-delete'

type DropdownActionTableProps = {
  id: string
  route: string
  // onDelete: () => void
}

export default function DropdownActionTable({
  id,
  route,
}: // onDelete,
DropdownActionTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button
            onClick={() => navigator.clipboard.writeText(id)}
            variant='ghost'
            className='flex justify-start p-0 h-4 w-4'
          >
            Copy Id
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => navigator.clipboard.writeText(id)}
            variant='ghost'
            className='flex justify-start p-0 h-4 w-4'
            asChild
          >
            <Link href={`/dashboard/${route}/${id}`}>Edit</Link>
          </Button>
        </DropdownMenuItem>

        {/* <ModalDelete onDelete={onDelete} /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
