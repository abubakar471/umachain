import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignupPage = () => {
    return <SignUp signInUrl='/' afterSignUpUrl='/account' afterSignOutUrl='/'  />
}

export default SignupPage