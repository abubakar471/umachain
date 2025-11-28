"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Accountpage = () => {
  const {user, isLoaded} = useUser();
  return (
    <div className='text-black'>
      <h1 className='text-white text-3xl font-semibold'>Good Day, <span className='text-[#FDE300]'>{isLoaded && user.fullName}!</span> </h1>

      <div className='flex flex-col lg:flex-row items-center gap-x-10 gap-y-20 mt-24'>
        <div className='bg-[#1C1C1C] px-6 py-6 w-full lg:w-1/2 xl:w-1/3 rounded-lg'>
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

        <div className='bg-[#1C1C1C] px-6 py-6 w-full lg:w-1/2 xl:w-1/3 rounded-lg'>
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
      </div>
    </div>
  )
}

export default Accountpage