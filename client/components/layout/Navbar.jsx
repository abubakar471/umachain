"use client"

import { useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className='max-w-7xl mx-auto flex items-center justify-between py-10'>
      <Link href={"/"}>
        <div className='w-10 h-10 flex items-center justify-center p-2 rounded-md bg-gradient-to-br text-white from-[#FDE300] via-[#555] to-[#FDE300] '>
          U
        </div>
      </Link>

      {
        isLoaded && (
          !isSignedIn ? (
            <div className='flex items-center gap-x-4'>
              <Link href={"/sign-in"} className='bg-gradient-to-br from-[#444] via-[#444] to-[#444] text-white px-4 py-2 rounded-md shadow'>Sign in</Link>
              <Link href={"/sign-up"} className='rounded-md border border-[#FDE300] py-2 px-4 bg-[#FDE300] text-[#000]'>Sign up</Link>
            </div>
          ) :
            <Link href={"/account"} className='rounded-md border border-[#FDE300] py-2 px-6 bg-[#FDE300] text-[#000] text-xl flex items-center gap-x-2'>
              Launch App
              <ArrowRight />
            </Link>
        )
      }
    </div >
  )
}

export default Navbar