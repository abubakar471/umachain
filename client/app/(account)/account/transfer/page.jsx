import React from 'react'
import YourBalance from '@/components/account/account-page/YourBalance'
import { ArrowLeftRight } from 'lucide-react'
import TransferFundBox from '@/components/account/transfer-page/TransferFundBox'

const TransferPage = () => {
  return (
    <div className='max-w-5xl mx-auto'>
      <h3 className='text-3xl text-neutral-400 font-semibold flex items-center gap-x-2 mt-6 mb-10'>
        <ArrowLeftRight />
        Transfer Funds
      </h3>


      <YourBalance />

      <div className='mt-10'>
        <TransferFundBox />
      </div>
    </div>
  )
}

export default TransferPage