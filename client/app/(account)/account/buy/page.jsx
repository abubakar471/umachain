import BuySellModal from '@/components/account/account-buy-page/BuySellModal'
import YourBalance from '@/components/account/account-page/YourBalance'
import { Wallet } from 'lucide-react'
import React from 'react'

const BuyPage = () => {
  return (
    <div className='max-w-4xl mx-auto mt-6'>
      <h1 className='text-neutral-400 font-semibold  text-4xl flex items-center justify-center text-center gap-x-2'>
        {/* <Wallet className='w-8 h-8' /> */}
        Buy Umacoin
      </h1>

      <div className='mt-10'>
          <BuySellModal />
      </div>
    </div>
  )
}

export default BuyPage