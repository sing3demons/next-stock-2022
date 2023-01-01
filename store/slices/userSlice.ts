import { User } from '@/models/user.model'
import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import * as services from '@/services/server.services'

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

interface SignAction {
  username: string
  password: string
}

const signUp = createAsyncThunk('user/signup', async ({ username, password }: SignAction): Promise<any> => {
  return await services.signUp({ username, password })
})

// export const userSelector = (store: RootState) => store.user
const userSelector = ({ user }: RootState) => user

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(signUp.fulfilled, (state, action) => {
    console.log(action.payload)

    state.username = action.payload.result
  })
}
// const reducers = {
//   setUsername: (state: UserState, action: PayloadAction<SingleProp>) => {
//     state.username = action.payload.username
//   },
// }
const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUsername: (state: UserState, action: PayloadAction<SingleProp>) => {
      state.username = action.payload.username
    },
  },
  extraReducers,
})

const { setUsername } = userSlice.actions

export { signUp, userSelector, setUsername }
export default userSlice.reducer
