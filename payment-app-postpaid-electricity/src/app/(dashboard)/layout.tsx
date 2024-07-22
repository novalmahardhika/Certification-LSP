import React, { ReactNode } from 'react'
import DashboardLayoutComponent from './_components/layout-dashboard'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
}
