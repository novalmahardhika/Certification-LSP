import { getBillByUserId } from '@/actions/bill'
import { getUserByEmail } from '@/actions/user'
import LayoutHomePage from '@/components/homepage/layout-homepage'
import { currentUser } from '@/hooks/server/current-user'
import { Role } from '@prisma/client'
import { Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/login')
  }

  return <LayoutHomePage>{children}</LayoutHomePage>
}
