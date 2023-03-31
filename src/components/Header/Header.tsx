import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Search from '@/components/Search'
import ToggleDarkMode from '@/components/ToggleDarkMode'
import Navigation from './Navigation'
import { RootState, useAppDispatch } from '@/redux/store'
import { logout } from '@/redux/features/auth/authSlice'

export default function Header() {
  const { token, name } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <header>
      <div className="text-white bg-primary">
        <div className="container flex items-center justify-between px-4 py-2 mx-auto">
          <Search aria-label="Search books, authors, or subjects" classes="w-96" />
          <div className="flex items-center gap-4" role="navigation">
            {token ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-white">
                  {name}
                </Link>{' '}
                <button className="" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="text-white">
                <Link to="/login" className="text-white">
                  Log in
                </Link>
              </div>
            )}

            <ToggleDarkMode />
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  )
}
