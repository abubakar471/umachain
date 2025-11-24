import { auth } from '@clerk/nextjs/server'
import React from 'react'

const AuthLayout = async({ children }) => {
    const {userId} = await auth();

    // if(userId) redirect("/account")
    return (
        <div className='w-full min-h-[80vh] flex items-center justify-center'>
            {children}
        </div>
    )
}

export default AuthLayout