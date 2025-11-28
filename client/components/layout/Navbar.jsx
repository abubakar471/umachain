"use client"

import { useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Logo from './Logo'

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();


  return (
    (pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up") && (
      <div className='max-w-7xl mx-auto flex items-center justify-between py-10'>
      <Logo />

      {
        isLoaded && (
          !isSignedIn ? (
            <div className='flex items-center gap-x-4'>
              <Link href={"/sign-in"} className='bg-linear-to-br from-[#444] via-[#444] to-[#444] text-white px-4 py-2 rounded-md shadow'>Sign in</Link>
              <Link href={"/sign-up"} className='rounded-md border border-[#FDE300] py-2 px-4 bg-[#FDE300] text-black'>Sign up</Link>
            </div>
          ) :
            <Link href={"/account"} className='rounded-md border border-[#FDE300] py-2 px-6 bg-[#FDE300] text-black text-xl flex items-center gap-x-2'>
              Launch App
              <ArrowRight />
            </Link>
        )
      }
    </div>
    )
  )
}

export default Navbar