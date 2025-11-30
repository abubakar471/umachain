"use client"

import YourBalance from '@/components/account/account-page/YourBalance';
import { UserButton, useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Accountpage = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className='text-black'>
      <h1 className='text-white text-3xl font-semibold'>Good Day, <span className='text-[#FDE300]'>{isLoaded && user.fullName}!</span> </h1>

      <div className='mt-10 w-full '>
        <YourBalance />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:flex-row items-center gap-x-10 gap-y-20 mt-24 w-full'>
        <div className='bg-[#1C1C1C] px-6 py-6 rounded-lg h-full'>
          <div className='flex items-center justify-center'>
            <Image src={"/assets/images/buy-rm.png"} alt='buy-umacoin' width={800} height={800} className='w-[300px] h-[200px] -mt-20' />
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='text-3xl text-neutral-400 font-semibold pt-4'>Buy</h3>


          </div>
          <p className='text-lg text-neutral-500 pt-4'>
            Use your credit card, bank account, or payment app to buy Bitcoin and other select cryptocurrencies.
          </p>

          <Link href={"/account/buy"} className='flex items-center justify-center bg-[#FDE300] hover:bg-[#FDE300]/80 transition-all duration-200 ease-in-out p-2 py-3 rounded-full gap-x-2 mt-4'>
            Buy Now
            <ArrowRight />
          </Link>
        </div>

        <div className='bg-[#1C1C1C] px-6 py-6 rounded-lg h-full'>
          <div className='flex items-center justify-center'>
            <Image src={"/assets/images/deposit-rm.png"} alt='buy-umacoin' width={800} height={800} className='w-[300px] h-[200px] -mt-20' />
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='text-3xl text-neutral-400 font-semibold pt-4'>Sell</h3>

          </div>
          <p className='text-lg text-neutral-500 pt-4'>
            Get your money back to your credit card right away. Go and sell your crypto for the appropriate price you find from here.
          </p>

          <Link href={"/account/buy"} className='flex items-center justify-center bg-muted/80 hover:bg-muted/60 transition-all duration-200 ease-in-out p-2 py-3 rounded-full gap-x-2 mt-4'>
            Sell Now
            <ArrowRight />
          </Link>
        </div>

        <div className='bg-[#1C1C1C] px-6 py-6 rounded-lg h-full'>
          <div className='flex items-center justify-center'>
            <video
              className='w-[300px] h-[200px] -mt-20 rounded-lg'
              src='https://accounts.bitcoin.com/videos/earn-and-grow.webm'
              controls={false}
              muted
              loop
              preload='metadata'
              playsInline
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='text-3xl text-neutral-400 font-semibold pt-4'>Transfer</h3>
          </div>
          <p className='text-lg text-neutral-500 pt-4'>
            Transfer Umacoin from your wallet to other users wallets seemlessly without any hidden fees.
          </p>

          <Link href={"/account/transfer"} className='flex items-center justify-center bg-muted/80 hover:bg-muted/60 transition-all duration-200 ease-in-out p-2 py-3 rounded-full gap-x-2 mt-4'>
            Transfer funds
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Accountpage