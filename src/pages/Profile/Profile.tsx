import { returnBook } from '@/redux/features/borrow/borrowSlice'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '@/redux/store'

export default function Profile() {
  const dispatch = useAppDispatch()
  const borrows = useSelector((state: RootState) => state.borrow.borrows)

  const { name } = useSelector((state: RootState) => state.auth)
  const userBorrows = borrows.filter((borrow) => borrow.username === name)
  const handleReturn = (id: string) => {
    dispatch(returnBook(id))
  }

  return (
    <div className="container p-8 mx-auto ">
      <h1 className="text-center">This page contains books that user has borrowed</h1>
      {userBorrows.length > 0 ? (
        userBorrows.map((borrow) => (
          <div className="mt-4" key={borrow.bookId}>
            <p className="text-xl">Books</p>
            <p>
              Books:{borrow.bookId} - Borrow date:{borrow.borrowDate} - Return date:
              {borrow.returnDate}{' '}
              <button
                onClick={() => handleReturn(borrow.bookId)}
                className="ml-2 button button-outlined">
                Return
              </button>
            </p>
          </div>
        ))
      ) : (
        <p>You have no borrow books</p>
      )}
    </div>
  )
}
