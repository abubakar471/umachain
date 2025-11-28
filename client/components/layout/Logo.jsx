import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"}>
        <div className='w-9 h-9 flex items-center justify-center p-2 rounded-md bg-linear-to-br text-white from-[#FDE300] via-[#555] to-[#FDE300] '>
          U
        </div>
    </Link>
  )
}

export default Logo