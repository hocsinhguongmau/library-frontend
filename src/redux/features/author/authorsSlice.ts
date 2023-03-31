import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { sortArrayByField } from '@/utils/frontend-service/'
import { filterArrayBySearchTerm } from '@/utils/frontend-service/'
import { fetchAllAuthors } from '@/utils/backend-service'
import { AuthorsState, SearchOption, SortOption, UpdateType, IAuthor } from '@/types'

const initialState: AuthorsState = {
  authors: [],
  status: 'idle',
  error: null
}

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
  const data = await fetchAllAuthors()
  return data
})

export const addNewAuthor = createAsyncThunk<IAuthor, IAuthor>(
  'authors/addNewAuthor',
  async (newAuthor) => {
    return newAuthor
  }
)

export const removeAuthor = createAsyncThunk<string, string>('authors/removeAuthor', async (id) => {
  return id
})

export const updateAuthor = createAsyncThunk<IAuthor, UpdateType<IAuthor>>(
  'authors/updateAuthor',
  async ({ newData, id }) => {
    return { ...newData, id }
  }
)

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    sortAuthors(state, action: PayloadAction<SortOption<IAuthor>>) {
      const { field, order } = action.payload
      sortArrayByField(state.authors, field, order)
    },
    searchAuthors(state, action: PayloadAction<SearchOption<IAuthor>>) {
      const { searchTerm, keysToSearch } = action.payload
      state.authors = filterArrayBySearchTerm(state.authors, searchTerm, keysToSearch)
    },
    resetAuthors(state) {
      state.authors = initialState.authors
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.authors = action.payload
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addNewAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload)
      })
      .addCase(removeAuthor.fulfilled, (state, action) => {
        const modifiedAuthors = state.authors.filter((author) => author.id !== action.payload)
        state.authors = modifiedAuthors
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        const { id } = action.payload
        const index = state.authors.findIndex((author: IAuthor) => author.id === id)
        if (index !== -1) {
          state.authors[index] = action.payload
        }
      })
  }
})

export const { sortAuthors, searchAuthors, resetAuthors } = authorsSlice.actions

export default authorsSlice.reducer
