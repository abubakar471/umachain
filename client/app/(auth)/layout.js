import Navbar from '@/components/layout/Navbar';
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const AuthLayout = async ({ children }) => {
    const { userId } = await auth();

    // if(userId) redirect("/account")
    return (
        <div className='px-10!'>
            <Navbar />
            <div className='w-full min-h-[80vh] flex flex-col items-center justify-center'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout