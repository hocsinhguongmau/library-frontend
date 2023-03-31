import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { sortArrayByField } from '@/utils/frontend-service/'
import { filterArrayBySearchTerm } from '@/utils/frontend-service/'
import { fetchAllBooks } from '@/utils/backend-service'
import { BooksState, SearchOption, SortOption, UpdateType, IBook } from '@/types'

const initialState: BooksState = {
  books: [],
  status: 'idle',
  error: null
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const data = await fetchAllBooks()
  return data
})

export const addNewBook = createAsyncThunk<IBook, IBook>('books/addNewBook', async (newBook) => {
  return newBook
})

export const removeBook = createAsyncThunk<string, string>('books/removeBook', async (id) => {
  return id
})

export const updateBook = createAsyncThunk<IBook, UpdateType<IBook>>(
  'books/updateBook',
  async ({ newData, id }) => {
    return { ...newData, id }
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  //No longer needed, I changed the sorting and filtering methods to use url params
  reducers: {
    sortBooks(state, action: PayloadAction<SortOption<IBook>>) {
      const { field, order } = action.payload
      sortArrayByField(state.books, field, order)
    },
    searchBooks(state, action: PayloadAction<SearchOption<IBook>>) {
      const { searchTerm, keysToSearch } = action.payload
      state.books = filterArrayBySearchTerm(state.books, searchTerm, keysToSearch)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.books.push(action.payload)
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        const modifiedBooks = state.books.filter((book) => book.id !== action.payload)
        state.books = modifiedBooks
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const { id } = action.payload
        const index = state.books.findIndex((book: IBook) => book.id === id)
        if (index !== -1) {
          state.books[index] = action.payload
        }
      })
  }
})

export const { sortBooks, searchBooks } = booksSlice.actions

export default booksSlice.reducer
