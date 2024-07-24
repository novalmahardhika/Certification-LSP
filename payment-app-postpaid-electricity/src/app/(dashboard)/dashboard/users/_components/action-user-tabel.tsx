'use client'

import React, { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { UserTable } from './column'
import Link from 'next/link'
import { ModalDelete } from '@/components/modals/modal-delete'
import { deleteUser } from '@/actions/user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ActionUserTabel(user: UserTable) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const onDelete = async () => {
    startTransition(async () => {
      const data = deleteUser(user.id)

      toast.promise(async () => data, {
        success: (await data.then()).success,
        error: (await data.then()).error || 'Something went wrong',
        loading: 'wait a minute',
        finally: () => {
          router.refresh()
        },
      })
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(user.id)
    toast.success('Copied user id')
  }

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

        <DropdownMenuItem className='p-0 px-2'>
          <Button
            variant='ghost'
            onClick={onCopy}
            className='w-full flex justify-start p-0'
          >
            Copy ID
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem className='p-0 px-2'>
          <Button
            variant='ghost'
            asChild
            className='w-full flex justify-start p-0'
          >
            <Link href={`/dashboard/users/${user.id}`}>Edit</Link>
          </Button>
        </DropdownMenuItem>

        <ModalDelete onDelete={onDelete} loading={isPending} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
