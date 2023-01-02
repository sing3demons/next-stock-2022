import { requestBody } from '@/models/auth.model'
import http from '@/utils/httpClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../../utils/cookies'

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, password }: requestBody = req.body
    const { data } = await http.post('/authen/login', { username, password })

    setCookie(res, 'accessToken', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    res.status(200).json(data)
  } catch (error) {}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const action = req.query['nextauth']![0]
  if (req.method === 'POST' && action === 'signin') {
    signin(req, res)
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
