import DashboardLayoutComponent from '@/components/dashboard/layout-dashboard'
import { currentUser } from '@/hooks/server/current-user'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await currentUser()

  if (user?.role !== Role.ADMIN) {
    redirect('/')
  }

  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
}
