export interface signProps {
  username: string
  password: string
}

export interface requestBody {
  username: string
  password: string
}

export interface signUp {
  result: string
}

export interface signIn {
  result: string
  token: string
}
