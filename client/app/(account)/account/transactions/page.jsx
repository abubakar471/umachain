import YourBalance from '@/components/account/account-page/YourBalance'
import TransactionHistroyTable from '@/components/account/account-transactions-page/TransactionHistroyTable'
import { Receipt } from 'lucide-react'
import React from 'react'

const TransactionsPage = () => {
  return (
    <div>
        <h1 className='text-neutral-400 text-3xl font-semibold flex items-center gap-x-2 mt-6'>
            <Receipt className='w-10 h-10 text-[#FDE300]' />
            Transaction History
        </h1>

        <div className='mt-10'>
            <YourBalance />
        </div>

        <div className='mt-10'>
            <TransactionHistroyTable />
        </div>
    </div>
  )
}

export default TransactionsPage