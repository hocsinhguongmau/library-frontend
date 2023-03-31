import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBorrowBook } from '@/types/BorrowBook'
interface BorrowState {
  borrows: IBorrowBook[]
}

const initialState: BorrowState = { borrows: [] }

const borrowSlice = createSlice({
  name: 'borrow',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<IBorrowBook>) => {
      state.borrows.push(action.payload)
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const borrowIndex = state.borrows.findIndex((borrow) => borrow.bookId === action.payload)
      if (borrowIndex !== -1) {
        state.borrows.splice(borrowIndex, 1)
      }
    }
  }
})

export const { borrowBook, returnBook } = borrowSlice.actions

export default borrowSlice.reducer
