export interface IAuthor {
  id: string
  picture: string
  name: string
  description: string
}

export interface AuthorsState {
  authors: IAuthor[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
