import React from 'react'
import CardStatistic from './_components/card-statistic'
import TitleDashboard from '@/components/dashboard/title-dashboard'
import Statistic from './_components/statistic'
import { statisticPayment } from '@/actions/statistic'
import TabelAdmin from './_components/tabel-admin'

export default async function DashboardPage() {
  const stats = await statisticPayment()

  return (
    <div className='flex flex-col space-y-10'>
      <Statistic chartData={stats} />
      <CardStatistic />
      <TabelAdmin />
    </div>
  )
}
