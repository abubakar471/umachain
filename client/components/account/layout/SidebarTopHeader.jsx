"use client"

import Logo from '@/components/layout/Logo'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import UserInfoButton from './UserInfoButton'

const SidebarTopHeader = () => {
  return (
    <div className='flex items-center justify-between lg:justify-end'>
      <div className='flex lg:hidden -mt-6 items-center  gap-x-2'>
        <SidebarTrigger />
        <Logo />
      </div>
      <div className='flex items-center gap-x-4 justify-end pb-6'>
        <Link href={"/account/buy"} className={"bg-[#FDE300]! text-black px-6 py-2 rounded-full"}>Buy Crypto</Link>
        {/* <UserButton fallback={() => {
          window.localStorage.removeItem("state");
          window.localStorage.removeItem("walletAddress");
          window.localStorage.removeItem("balance");
        }} /> */}
        <div className="">
            <UserInfoButton />
        </div>
      </div>
    </div>
  )
}

export default SidebarTopHeader