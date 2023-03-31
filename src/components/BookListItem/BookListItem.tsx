import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { IBookWithAuthor } from '@/types'
import { RootState, useAppDispatch } from '@/redux/store'
import { borrowBook, returnBook } from '@/redux/features/borrow/borrowSlice'
import { IBorrowBook } from '@/types/BorrowBook'
import { formatPublishedDate } from '@/utils/frontend-service'

export default function BookListItem({
  id,
  picture,
  title,
  status,
  authorInfo,
  publishedDate
}: IBookWithAuthor) {
  const dispatch = useAppDispatch()
  const handleBorrow = (book: IBorrowBook) => {
    dispatch(borrowBook(book))
  }
  const handleReturn = (id: string) => {
    dispatch(returnBook(id))
  }

  const { token, name } = useSelector((state: RootState) => state.auth)
  const borrows = useSelector((state: RootState) => state.borrow.borrows)
  const borrowState = borrows.find((book) => book.bookId === id)
  const today = new Date()

  const book = {
    borrowerId: uuidv4(),
    username: name,
    bookId: id,
    borrowDate: formatPublishedDate(today),
    returnDate: formatPublishedDate(today.setDate(today.getDate() + 7))
  }

  return (
    <div key={id} className="relative">
      <div className="absolute top-0 z-10 left-4">
        {status === 'available' ? (
          token ? (
            <>
              {!borrowState ? (
                <button className="button button-filled" onClick={() => handleBorrow(book)}>
                  borrow
                </button>
              ) : (
                <button
                  className="button button-filled button-secondary"
                  onClick={() => handleReturn(id)}>
                  Return
                </button>
              )}
            </>
          ) : null
        ) : (
          <span className="block px-4 py-3 text-white bg-error">Not available</span>
        )}
      </div>
      <Link to={`/book/${id}`} className="block px-4">
        <img src={picture} alt={title} width={200} height={300} className="w-full" />
      </Link>
      <h4 className="mt-4 text-xl font-bold text-center capitalize">
        <Link to={`/book/${id}`}>{title}</Link>
      </h4>
      {authorInfo ? (
        <h4 className="italic text-center">
          <Link className="capitalize text-secondary" to={`/author/${authorInfo.id}`}>
            {authorInfo.name}
          </Link>
        </h4>
      ) : null}
      <p className="text-center">Published date: {publishedDate}</p>
    </div>
  )
}
