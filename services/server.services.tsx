import { signProps, signUp } from '@/models/auth.model'
import axios from 'axios'
// localhost:8085/api/v2/authen/register
const API_URL = 'http://localhost:8085/api/v2'
const signUp = async (user: signProps): Promise<signUp> => {
  const { data } = await axios.post<signUp>(`${API_URL}/authen/register`, user)
  return data
}

export { signUp }
