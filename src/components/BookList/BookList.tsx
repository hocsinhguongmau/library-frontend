import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, useAppDispatch } from '@/redux/store'

import { fetchBooks } from '@/redux/features/book/booksSlice'
import Loading from '@/components/Loading'
import BookListItem from '@/components/BookListItem'
import { fetchAuthors } from '@/redux/features/author/authorsSlice'
import { setBooks } from '@/redux/features/book/booksWithAuthors'

export default function HomeList() {
  const dispatch = useAppDispatch()
  const books = useSelector((state: RootState) => state.books.books)
  const authors = useSelector((state: RootState) => state.authors.authors)
  const booksWithAuthor = useSelector((state: RootState) => state.booksWithAuthor.booksWithAuthor)
  const status = useSelector((state: RootState) => state.books.status)

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
  }, [])

  useEffect(() => {
    dispatch(setBooks({ books, authors }))
  }, [books, authors])

  return (
    <section>
      <div className="section-wrapper">
        <h2 className="text-2xl text-center uppercase text-primary">BOOKS, MAGAZINES & MOVIES</h2>
        <h3 className="text-xl italic text-center text-secondary">
          Available to download and stream
        </h3>
        {status === 'loading' ? <Loading classes="pt-8" /> : null}
        <div className="grid grid-cols-4 gap-8 mt-8">
          {booksWithAuthor.slice(0, 4).map((book) => (
            <BookListItem {...book} key={book.id} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link to="/catalog" className="button button-outlined">
            See more
          </Link>
        </div>
      </div>
    </section>
  )
}
