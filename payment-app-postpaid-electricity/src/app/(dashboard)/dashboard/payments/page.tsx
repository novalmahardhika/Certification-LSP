import { getListAllPayment } from '@/actions/payment'
import { DataTable } from '@/components/dashboard/data-table'
import TitleDashboard from '@/components/dashboard/title-dashboard'
import React from 'react'
import { columns } from './column'
import { formatRupiah } from '@/lib/format-rupiah'
import { formatDate } from '@/lib/format-date'

export default async function PaymentPage() {
  const payments = await getListAllPayment()

  const modifiedData = payments.map((payment) => ({
    id: payment.id,
    userId: payment.userId,
    billId: payment.billId,
    usageId: payment.bill.usageId,
    accountName: payment.accountName,
    email: payment.user.email,
    bankName: payment.bankName,
    accountNumber: payment.accountNumber,
    totalPrice: formatRupiah(payment.bill.totalPrice),
    date: formatDate(payment.createdAt),
    status: payment.bill.status,
    totalKwh: payment.bill.totalKwh,
    totalPriceNum: payment.bill.totalPrice,
  }))

  return (
    <div>
      <TitleDashboard
        title='Manage Payment'
        desc='List all of payment and manage them all.'
      />
      <DataTable
        columns={columns}
        data={modifiedData}
        search='accountName'
        placeholderSearch='Account Name'
      />
    </div>
  )
}
