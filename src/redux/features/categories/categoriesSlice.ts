import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchAllCategories } from '@/utils/backend-service/categories'
import { ICategory } from '@/types'

interface CategoriesState {
  categories: ICategory[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  status: 'idle',
  error: null
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const data = await fetchAllCategories()
  return data
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export default categoriesSlice.reducer
