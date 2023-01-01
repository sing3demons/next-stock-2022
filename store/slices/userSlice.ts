import { User } from '@/models/user.model'
import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'

interface UserState {
  username: string
  accessToken: string
  error?: string
  isAuthenticated: boolean
  isAuthenticating: boolean
  user?: User
}

interface SingleProp {
  username: string
}

const name: 'user' = 'user'

const initialState: UserState = {
  username: 'aaa',
  accessToken: '',
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
}

interface SignInAction {}

const signUp = createAsyncThunk(
  'user/signup',
  async (credential: any) => new Promise(resolve => setTimeout(() => resolve(credential), 1000))
)

// export const userSelector = (store: RootState) => store.user
const userSelector = ({ user }: RootState) => user

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
    state.username = action.payload.username
  })
}
const reducers = {
  setUsername: (state: UserState, action: PayloadAction<SingleProp>) => {
    state.username = action.payload.username
  },
}
const userSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
})

const { setUsername } = userSlice.actions

export { signUp, userSelector, setUsername }
export default userSlice.reducer
