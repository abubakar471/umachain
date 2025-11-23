import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SigninPage = () => {
  return <SignIn signUpUrl='/sign-up' afterSignInUrl='/account' afterSignOutUrl='/' />
}

export default SigninPage