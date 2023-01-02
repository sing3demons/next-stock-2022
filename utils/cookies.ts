import { CookieSerializeOptions, serialize } from 'cookie'
import { NextApiResponse } from 'next'

export const setCookie = (res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge = options.maxAge / 1000
  }
  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

export const removeCookie = (res: NextApiResponse, name: string, options: CookieSerializeOptions = {}) => {
  setCookie(res, name, '', {
    ...options,
    maxAge: -1,
    expires: new Date(0),
  })
}
