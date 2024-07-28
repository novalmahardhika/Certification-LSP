import React, { ReactNode } from 'react'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'

export default function CardWrapper({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Card className='text-sm py-2 md:max-w-sm'>
      <CardContent className={cn('py-2 flex flex-col space-y-3', className)}>
        {children}
      </CardContent>
    </Card>
  )
}
