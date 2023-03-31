import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBook, IBookWithAuthor } from '@/types/Book'
import { IAuthor } from '@/types'

interface BooksWithAuthorState {
  booksWithAuthor: IBookWithAuthor[]
}

const initialState: BooksWithAuthorState = {
  booksWithAuthor: []
}

const booksWithAuthorSlice = createSlice({
  name: 'booksWithAuthor',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<{ books: IBook[]; authors: IAuthor[] }>) => {
      state.booksWithAuthor = action.payload.books.map((book) => {
        const author = action.payload.authors.find((author) => author.id === book.author)
        return {
          ...book,
          authorName: author?.name,
          authorInfo: author
        }
      })
    }
  }
})

export const { setBooks } = booksWithAuthorSlice.actions
export default booksWithAuthorSlice.reducer
