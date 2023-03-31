import { IAuthor } from '@/types'
type BookStatus = 'available' | 'borrowed'

export interface IBook {
  id: string
  isbn: string
  title: string
  picture: string
  description: string
  publisher: string
  author: string
  category: string
  status: BookStatus
  publishedDate: string
}

export interface IBookWithAuthor extends IBook {
  authorName: string | undefined
  authorInfo: IAuthor | undefined
}

export interface BooksState {
  books: IBook[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export type SortBookOption =
  | 'title_asc'
  | 'title_desc'
  | 'author_asc'
  | 'author_desc'
  | 'date_asc'
  | 'date_desc'

export type FilterBookOption = 'author' | 'category' | 'available'

export interface BookSortingOption {
  label: string
  value: string
}
