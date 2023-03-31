import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BookSortingOption, SortBookOption } from '@/types'

const sortingOptions: BookSortingOption[] = [
  { label: 'Title asc', value: 'title_asc' },
  { label: 'Title desc', value: 'title_desc' },
  { label: 'Author asc', value: 'author_asc' },
  { label: 'Author desc', value: 'author_desc' },
  { label: 'Published date asc', value: 'date_asc' },
  { label: 'Published date desc', value: 'date_desc' }
]
export default function SortBook() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState<SortBookOption>('title_asc')
  const queryParams = new URLSearchParams(location.search)

  useEffect(() => {
    const params = (queryParams.get('sorting') as SortBookOption) ?? 'title_asc'

    setSelectedOption(params)
  }, [location.search])

  const handleSortingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('sorting', e.target.value)
    const newSearchParams = searchParams.toString()
    navigate({ search: newSearchParams })
  }

  return (
    <>
      <label htmlFor="sorting">Sort by</label>
      <select id="sorting" value={selectedOption} onChange={handleSortingChange}>
        {sortingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
