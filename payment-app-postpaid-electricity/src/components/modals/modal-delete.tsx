import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type ModalDeleteProps = {
  onDelete: () => void
  loading: boolean
}

export function ModalDelete({ onDelete, loading }: ModalDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className='flex justify-start   w-full px-2 py-2.5'
      >
        <Button variant='ghost' className='h-full   w-full'>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently deleted data .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='hover:bg-muted hover:text-black'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive hover:bg-red-600'
            onClick={onDelete}
            disabled={loading}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
