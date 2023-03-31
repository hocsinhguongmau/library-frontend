import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import { RootState, useAppDispatch } from '@/redux/store'
import { fetchBooks } from '@/redux/features/book/booksSlice'
import Loading from '@/components/Loading'
import BookListItem from '@/components/BookListItem'
import { fetchAuthors } from '@/redux/features/author/authorsSlice'
import { paginationSettings } from '@/configs/commonSettings'
import { setBooks } from '@/redux/features/book/booksWithAuthors'
import SortBook from '@/components/SortBook/SortBook'
import { SortBookOption, IBookWithAuthor } from '@/types'
import { sortArrayByField } from '@/utils/frontend-service'

export default function Catalog() {
  const dispatch = useAppDispatch()
  const books = useSelector((state: RootState) => state.books.books)
  const authors = useSelector((state: RootState) => state.authors.authors)
  const status = useSelector((state: RootState) => state.books.status)

  const booksWithAuthor = useSelector((state: RootState) => state.booksWithAuthor.booksWithAuthor)

  const location = useLocation()
  const navigate = useNavigate()
  const [sortedBooks, setSortedBooks] = useState<IBookWithAuthor[]>([])

  const pageNumber = Number(new URLSearchParams(location.search).get('page') ?? 1) - 1
  const queryParams = new URLSearchParams(location.search)
  const sortParams = queryParams.get('sorting') as SortBookOption | null

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
  }, [])

  useEffect(() => {
    dispatch(setBooks({ books, authors }))
  }, [books, authors])

  const sortBooksBy = (booksWithAuthor: IBookWithAuthor[], sorting: SortBookOption) => {
    switch (sorting) {
      case 'title_asc':
        return sortArrayByField([...booksWithAuthor], 'title', 'asc')
      case 'title_desc':
        return sortArrayByField([...booksWithAuthor], 'title', 'desc')
      case 'author_asc':
        return sortArrayByField([...booksWithAuthor], 'authorName', 'asc')
      case 'author_desc':
        return sortArrayByField([...booksWithAuthor], 'authorName', 'desc')
      case 'date_asc':
        return sortArrayByField([...booksWithAuthor], 'publishedDate', 'asc')
      case 'date_desc':
        return sortArrayByField([...booksWithAuthor], 'publishedDate', 'desc')
      default:
        return booksWithAuthor
    }
  }

  useEffect(() => {
    setSortedBooks(sortArrayByField([...booksWithAuthor], 'title', 'asc'))
  }, [booksWithAuthor, location.search])

  useEffect(() => {
    if (sortParams && booksWithAuthor.length > 0) {
      const sorted = sortBooksBy(booksWithAuthor, sortParams)
      setSortedBooks(sorted)
    }
  }, [sortParams, booksWithAuthor])

  function handlePageClick({ selected }: { selected: number }) {
    setCurrentPage(selected)

    queryParams.set('page', (selected + 1).toString())
    navigate({
      search: queryParams.toString()
    })
  }

  useEffect(() => {
    const page = Number(queryParams.get('page'))
    if (page === 0) {
      setCurrentPage(page)
    } else if (!isNaN(page)) {
      setCurrentPage(page - 1)
    }
  }, [location.search])

  const [currentPage, setCurrentPage] = useState<number>(0)
  const booksPerPage = 8
  const pageCount = Math.ceil(booksWithAuthor.length / booksPerPage)

  const startIndex = currentPage * booksPerPage
  const displayedBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage)

  return (
    <section className="container grid grid-cols-4 gap-8 mx-auto">
      {/* <SideNav /> */}
      &nbsp;
      <div className="col-span-3">
        <h1 className="text-2xl text-center uppercase text-primary">BOOKS, MAGAZINES & MOVIES</h1>
        <h2 className="block max-w-3xl mx-auto text-xl italic leading-6 text-center text-secondary">
          Discover a vast collection of books, magazines, and movies available for download and
          streaming at your fingertips.
        </h2>
        <div className="flex items-center justify-end w-full px-4 mt-8">
          <div className="flex items-center gap-4">
            <SortBook />
          </div>
        </div>
        {status === 'loading' ? <Loading classes="pt-8" /> : null}
        <div className="grid grid-cols-4 gap-8 mt-8">
          {displayedBooks.map((book) => (
            <BookListItem {...book} key={book.id} />
          ))}
        </div>
        <ReactPaginate
          className="pagination"
          pageCount={pageCount}
          {...paginationSettings}
          onPageChange={handlePageClick}
          forcePage={pageNumber}
        />
      </div>
    </section>
  )
}
