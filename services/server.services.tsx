import { signIn, signProps, signUp } from '@/models/auth.model'
import http from '@/utils/httpClient'

const signUp = async (user: signProps): Promise<signUp> => {
  const { data } = await http.post<signUp>('/authen/register', user)
  return data
}

const signIn = async (user: signProps): Promise<signIn> => {
  const { data } = await http.post<signIn>('/auth/signin', user, {
    baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  })
  return data
}

export { signUp, signIn }
