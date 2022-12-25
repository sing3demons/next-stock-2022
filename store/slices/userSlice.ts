import { User } from '@/models/user.model'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  username: string
  accessToken: string
  error?: string
  isAuthenticated: boolean
  isAuthenticating: boolean
  user?: User
}

const initialState: UserState = {
  username: '',
  accessToken: '',
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
}

const userSlice = createSlice({ name: 'user', initialState: {}, reducers: {} })

export default userSlice.reducer
