import { getBillByUserId } from '@/actions/bill'
import { DataTable } from '@/components/dashboard/data-table'
import TitleDashboard from '@/components/dashboard/title-dashboard'
import { currentUser } from '@/hooks/server/current-user'
import { BillTabelType, columns } from './_components/table-bill/column'
import { formatDate } from '@/lib/format-date'
import { formatRupiah } from '@/lib/format-rupiah'

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return
  }

  const bills = await getBillByUserId(user.id)

  const modifiedData: BillTabelType[] = bills.map((bill) => ({
    id: bill.id,
    userId: bill.userId,
    kwhNumber: bill.user.kwhNumber,
    initialKwh: `${bill.usage.initialKwh} kWh`,
    totalKwh: bill.totalKwh,
    totalKwhStr: `${bill.totalKwh} kWh`,
    totalPrice: formatRupiah(bill.totalPrice),
    status: bill.status,
    date: formatDate(bill.createdAt),
  }))

  return (
    <main>
      <TitleDashboard
        title='Bill Users'
        desc='List of bill users for every month.'
      />

      <DataTable
        columns={columns}
        data={modifiedData}
        search='date'
        placeholderSearch='Date'
      />
    </main>
  )
}
