import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignupPage = () => {
    return <SignUp signInUrl='/' afterSignOutUrl='/'  />
}

export default SignupPage