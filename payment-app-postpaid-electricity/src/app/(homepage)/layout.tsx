import LayoutHomePage from '@/components/homepage/layout-homepage'
import { currentUser } from '@/hooks/server/current-user'
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

  return <LayoutHomePage image={user.image}>{children}</LayoutHomePage>
}
