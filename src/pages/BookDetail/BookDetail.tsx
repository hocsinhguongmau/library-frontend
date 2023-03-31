import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Loading from '@/components/Loading/Loading'
import { fetchAuthors } from '@/redux/features/author/authorsSlice'
import { fetchBooks } from '@/redux/features/book/booksSlice'
import { setBooks } from '@/redux/features/book/booksWithAuthors'
import { borrowBook, returnBook } from '@/redux/features/borrow/borrowSlice'
import { RootState, useAppDispatch } from '@/redux/store'
import { IBook } from '@/types'
import { IBorrowBook } from '@/types/BorrowBook'
import { formatPublishedDate } from '@/utils/frontend-service'

export default function BookDetail() {
  const dispatch = useAppDispatch()
  const { books, status } = useSelector((state: RootState) => state.books)
  const authors = useSelector((state: RootState) => state.authors.authors)
  const booksWithAuthor = useSelector((state: RootState) => state.booksWithAuthor.booksWithAuthor)

  const bookId = useParams().id as string
  const bookDetail = booksWithAuthor.filter((book) => book.id === bookId)[0]
  const [otherBooks, setOtherBooks] = useState<IBook[] | null>(null)

  const { token, name } = useSelector((state: RootState) => state.auth)
  const borrows = useSelector((state: RootState) => state.borrow.borrows)
  const borrowState = borrows.find((book) => book.bookId === bookDetail?.id)
  const today = new Date()

  const book = {
    borrowerId: uuidv4(),
    username: name,
    bookId: bookDetail?.id,
    borrowDate: formatPublishedDate(today),
    returnDate: formatPublishedDate(today.setDate(today.getDate() + 7))
  }

  const handleBorrow = (book: IBorrowBook) => {
    dispatch(borrowBook(book))
  }
  const handleReturn = (id: string) => {
    dispatch(returnBook(id))
  }

  useEffect(() => {
    if (books.length > 0 && authors.length > 0) {
      setOtherBooks(books.filter((book) => book.id !== bookId && book.author === bookDetail.author))
    }
  }, [books, authors, bookId])

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
  }, [])
  useEffect(() => {
    dispatch(setBooks({ books, authors }))
  }, [books, authors])

  if (status === 'loading') {
    return <Loading classes="mx-auto" />
  }

  if (bookDetail) {
    return (
      <div className="container max-w-4xl py-10 mx-auto">
        <div className="flex justify-between gap-8">
          <img src={bookDetail.picture} alt={bookDetail.title} width={300} />
          <div className="w-full">
            <h1 className="text-3xl uppercase text-primary">{bookDetail.title}</h1>
            <p className="mt-2">{bookDetail.description}</p>
            <p className="mt-2">Published date: {bookDetail.publishedDate}</p>
            <p className="mt-2">
              Available:{' '}
              {bookDetail.status === 'available' ? (
                <span className="text-success">Available</span>
              ) : (
                <span className="text-error">Not available</span>
              )}
            </p>
            <p className="mt-4">
              {bookDetail.status === 'available' ? (
                token ? (
                  <>
                    {!borrowState ? (
                      <button className="button button-filled" onClick={() => handleBorrow(book)}>
                        borrow
                      </button>
                    ) : (
                      <button
                        className="button button-filled button-secondary"
                        onClick={() => handleReturn(bookDetail.id)}>
                        Return
                      </button>
                    )}
                  </>
                ) : null
              ) : null}
            </p>
          </div>
        </div>
        <p className="mt-2 text-xl">
          Author: <Link to={`/author/${bookDetail.author}`}>{bookDetail.authorInfo?.name}</Link>
        </p>

        {otherBooks && otherBooks.length > 0 ? (
          <>
            <p className="mt-2 text-2xl">Other books by this author:</p>
            <ul className="grid grid-cols-4 gap-4 mt-4">
              {otherBooks.map((book) => (
                <li key={book.id}>
                  <p>
                    <Link to={`/book/${book.id}`}>
                      <img src={book.picture} alt={book.title} />
                    </Link>
                  </p>
                  <p>
                    <Link to={`/book/${book.id}`}>{book.title}</Link>
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    )
  } else {
    return <>No data</>
  }
}
