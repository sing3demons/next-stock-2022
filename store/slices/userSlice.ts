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

const signUp = createAsyncThunk('user/signup', async (credential: any) => {
  console.log(credential)

  const p1 = new Promise(resolve => {
    setTimeout(() => {
      resolve(credential)
    }, 1000)
  })
  return await p1
})

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {}

// export const userSelector = (store: RootState) => store.user
const userSelector = ({ user }: RootState) => user

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUsername: (state: UserState, action: PayloadAction<SingleProp>) => {
      state.username = action.payload.username
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
      state.username = action.payload.username
    })
  },
})

const { setUsername } = userSlice.actions

export { signUp, userSelector, setUsername }
export default userSlice.reducer
