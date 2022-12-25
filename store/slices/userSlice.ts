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

const name = 'user'
const initialState: UserState = {
  username: 'sing',
  accessToken: '',
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
}
const reducers = {}

const userSlice = createSlice({ name, initialState, reducers })
export default userSlice.reducer
