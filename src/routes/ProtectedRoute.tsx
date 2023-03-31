import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const location = useLocation()
  const { pathname } = location

  if (!token) {
    return <Navigate to={`/login?redirectUrl=${pathname}`} replace />
  }

  return <div>{children}</div>
}

export default ProtectedRoute
