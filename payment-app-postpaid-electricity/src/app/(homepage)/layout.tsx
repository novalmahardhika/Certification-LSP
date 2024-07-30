import LayoutHomePage from '@/components/homepage/layout-homepage'
import { currentUser } from '@/hooks/server/current-user'
import { Role } from '@prisma/client'
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

  if (user.role === Role.ADMIN) {
    redirect('/dashboard')
  }

  return <LayoutHomePage image={user.image}>{children}</LayoutHomePage>
}
