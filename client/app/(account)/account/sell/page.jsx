import SellDialog from '@/components/account/account-buy-page/SellDialog'
import React from 'react'

const page = () => {
    return (
        <div className='max-w-4xl mx-auto mt-6'>
            <h1 className='text-neutral-400 font-semibold  text-4xl flex items-center justify-center text-center gap-x-2'>
                {/* <Wallet className='w-8 h-8' /> */}
                Sell Umacoin
            </h1>

            <div className='mt-10'>
                <SellDialog />
            </div>
        </div>
    )
}

export default page