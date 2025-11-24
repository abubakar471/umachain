import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Accountpage = () => {
  return (
    <div className='text-black'>
      <h1>Account page</h1>
      <UserButton />
    </div>
  )
}

export default Accountpage