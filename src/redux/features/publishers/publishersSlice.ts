import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchAllPublishers } from '@/utils/backend-service/publishers'
import { IPublisher } from '@/types'

interface PublishersState {
  publishers: IPublisher[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PublishersState = {
  publishers: [],
  status: 'idle',
  error: null
}

export const fetchPublishers = createAsyncThunk('publishers/fetchPublishers', async () => {
  const data = await fetchAllPublishers()
  return data
})

const publishersSlice = createSlice({
  name: 'publishers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublishers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.publishers = action.payload
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export default publishersSlice.reducer
