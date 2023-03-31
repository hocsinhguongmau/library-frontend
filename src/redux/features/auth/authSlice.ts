import { SignInFormData } from '@/types'
import { signIn } from '@/utils/backend-service'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  name: string
  status: string
}

const initialState: AuthState = {
  token: null,
  name: '',
  status: ''
}

export const loginAsync = createAsyncThunk('auth/login', async (data: SignInFormData) => {
  const response = await signIn(data)
  return response
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.name = 'loading'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'success'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload?.token || null
        state.name = action.payload?.name || ''
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
