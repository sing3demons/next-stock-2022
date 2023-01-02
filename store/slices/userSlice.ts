import { User } from '@/models/user.model'
import {
  ActionReducerMapBuilder,
  PayloadAction,
  ValidateSliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import * as services from '@/services/server.services'
import http from '@/utils/httpClient'
import { AxiosRequestConfig } from 'axios'

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
  username: '',
  accessToken: '',
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
}

interface SignAction {
  username: string
  password: string
}

const signUp = createAsyncThunk(
  'user/signup',
  async ({ username, password }: SignAction): Promise<any> => await services.signUp({ username, password })
)

const signIn = createAsyncThunk('user/signin', async ({ username, password }: SignAction): Promise<any> => {
  const response = await services.signIn({ username, password })
  if (response.result !== 'ok') {
    throw new Error('failed to sign in')
  }

  // set access token
  http.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config && config.headers) {
      config.headers.Authorization = `Bearer ${response.token}`
    }

    return config
  })
  return response
})

// export const userSelector = (store: RootState) => store.user
const userSelector = ({ user }: RootState) => user

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  const signUpAction = (state: UserState, action: PayloadAction<SingleProp>) => {
    state.accessToken = ''
    state.isAuthenticated = false
    state.user = undefined
  }

  const signInAction = (state: UserState, action: PayloadAction<SingleProp>) => {
    state.accessToken = ''
    state.isAuthenticated = false
    state.user = undefined
    state.username = action.payload.username
  }

  builder.addCase(signUp.fulfilled, signUpAction)
  builder.addCase(signIn.fulfilled, signInAction)
}

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

export { signUp, userSelector, setUsername, signIn }
export default userSlice.reducer
