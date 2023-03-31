import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { fetchAuthors } from '@/redux/features/author/authorsSlice'
import { fetchCategories } from '@/redux/features/categories/categoriesSlice'
import { RootState, useAppDispatch } from '@/redux/store'
import { FilterBookOption } from '@/types'

export default function SideNav() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const authors = useSelector((state: RootState) => state.authors.authors)
  const categories = useSelector((state: RootState) => state.categories.categories)
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchAuthors())
  }, [])

  const handleFilterClick = (type: FilterBookOption, params: string) => {
    const queryParams = new URLSearchParams(location.search)
    queryParams.set(type, params)
    const newUrl = `${location.pathname}?${queryParams.toString()}`
    navigate(newUrl)
  }

  return (
    <div>
      <h2>Filter</h2>
      <h3>
        <button>Categories</button>
      </h3>
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <button onClick={() => handleFilterClick('category', category.title)}>
                {category.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <h3>Authors</h3>
      <nav>
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              <button onClick={() => handleFilterClick('author', author.name)}>
                {author.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <h3>Available</h3>
      <input type="checkbox" />
      Available
    </div>
  )
}
