import { Routes as AppRoutes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Catalog from '@/pages/Catalog'
import BookDetail from '@/pages/BookDetail/'
import Admin from '@/admin/pages/Admin'
import Layout from '@/components/Layout'
import Login from '@/pages/Login/'
import Profile from '@/pages/Profile'
import ProtectedRoute from './ProtectedRoute'

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/admin" element={<Admin />} />
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/catalog"
        element={
          <Layout>
            <Catalog />
          </Layout>
        }
      />

      <Route
        path="/book/:id"
        element={
          <Layout>
            <BookDetail />
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </AppRoutes>
  )
}

export default Routes
