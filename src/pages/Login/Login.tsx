import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SignInFormData } from '@/types'
import LoginForm from '@/components/LoginForm/LoginForm'
import { RootState, useAppDispatch } from '@/redux/store'
import { loginAsync } from '@/redux/features/auth/authSlice'

const SignInPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl')
  const dispatch = useAppDispatch()

  const { token } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const onSubmit = (data: SignInFormData) => {
    dispatch(loginAsync(data))
  }

  const onCancel = async () => {
    navigate(-1)
  }

  // Redirect to home page if user is already authenticated
  if (token) {
    console.log(token)
    navigate(`${redirectUrl || '/'}`)
  }

  return (
    <div className="mb-8">
      <h1 className="mt-10 text-4xl font-semibold text-center">Sign In</h1>
      <LoginForm onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  )
}

export default SignInPage
