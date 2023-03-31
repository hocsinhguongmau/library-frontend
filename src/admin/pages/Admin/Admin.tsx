import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AddBook from '@/admin/components/AddBook/AddBook'
import BookItem from '@/admin/components/BookItem/BookItem'
import Loading from '@/components/Loading/Loading'
import { fetchBooks } from '@/redux/features/book/booksSlice'
import { RootState, useAppDispatch } from '@/redux/store'

export default function Admin() {
  const dispatch = useAppDispatch()
  const books = useSelector((state: RootState) => state.books.books)
  const status = useSelector((state: RootState) => state.books.status)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  {
    status === 'loading' ? <Loading classes="mx-auto" /> : null
  }

  return (
    <>
      <div className="container p-4 mx-auto">
        <h1 className="text-4xl text-center">Dashboard</h1>
        <AddBook />
        <div className="grid grid-cols-6 gap-4 mt-8">
          {books.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </div>
        <div></div>
      </div>
    </>
  )
}
