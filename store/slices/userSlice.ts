import { User } from '@/models/user.model'
import { ActionReducerMapBuilder, PayloadAction, ValidateSliceCaseReducers, createSlice } from '@reduxjs/toolkit'
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
// const reducers = {
//   setUsername: (state: UserState, action: PayloadAction<any>) => {
//     state.username = action.payload.data
//   },
// }
const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {}

// export const userSelector = (store: RootState) => store.user
export const userSelector = ({ user }: RootState) => user

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

export const { setUsername } = userSlice.actions
export default userSlice.reducer
