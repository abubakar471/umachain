import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            {children}
        </div>
    )
}

export default AuthLayout