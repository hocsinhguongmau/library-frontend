import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { NavItem } from '@/types/Common'
import { RootState, useAppDispatch } from '@/redux/store'
import { fetchCategories } from '@/redux/features/categories/categoriesSlice'
import NavLinkItem from './NavLinkItem'

export default function Navigation() {
  const dispatch = useAppDispatch()
  const categories = useSelector((state: RootState) => state.categories.categories)
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const categoryNavChild = categories.map((category) => ({
    title: category.title,
    url: `/category/${category.id}`
  }))
  const navigation: NavItem[] = [
    {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Categories',
      url: '/categories',
      child: categoryNavChild
    },
    {
      title: 'catalog',
      url: '/catalog'
    },
    {
      title: 'author',
      url: '/author'
    },
    {
      title: 'publisher',
      url: '/publisher'
    },
    {
      title: 'LOCATIONS',
      url: '/locations'
    },
    {
      title: 'ABOUT',
      url: '/about'
    }
  ]

  return (
    <nav className="container px-4 mx-auto ">
      <ul className="flex justify-between border-b-2 border-primary">
        {navigation.map((nav) => (
          <NavLinkItem {...nav} key={nav.title} />
        ))}
      </ul>
    </nav>
  )
}
