import BuyDialog from '@/components/account/account-buy-page/BuyDialog'
import YourBalance from '@/components/account/account-page/YourBalance'
import { Wallet } from 'lucide-react'
import React from 'react'

const BuyPage = () => {
  return (
    <div className='max-w-4xl mx-auto mt-6'>
      <div className='mt-10'>
          <BuyDialog />
      </div>
    </div>
  )
}

export default BuyPage