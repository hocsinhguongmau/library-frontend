export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface IAdmin {
  id: string
  firstName: string
  lastName: string
  email: string
}

export type SignInFormData = {
  username: string
  password: string
}

export type SignInResponse = {
  token: string
  name: string
}
