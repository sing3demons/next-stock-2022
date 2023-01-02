import { signProps, signUp } from '@/models/auth.model'
import http from '@/utils/httpClient'

const signUp = async (user: signProps): Promise<signUp> => {
  const { data } = await http.post<signUp>('/authen/register', user)
  return data
}

export { signUp }
