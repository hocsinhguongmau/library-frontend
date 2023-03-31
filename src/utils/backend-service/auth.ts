import { SignInFormData } from '@/types'

export const signIn = async (data: SignInFormData) => {
  const { username, password } = data

  if (username === 'user' && password === 'user') {
    return {
      token: 'user-token',
      name: username
    }
  }
}
