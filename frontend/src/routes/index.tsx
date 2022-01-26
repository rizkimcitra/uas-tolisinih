import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const IndexPage = lazy(() => import('@/pages/index'))
const Profile = lazy(() => import('@/pages/profile'))
const SigninPage = lazy(() => import('@/pages/signin'))

const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={null}>
            <IndexPage />
          </Suspense>
        }
      />

      <Route
        path='/profile'
        element={
          <Suspense fallback={null}>
            <Profile />
          </Suspense>
        }
      />

      <Route
        path='/signin'
        element={
          <Suspense fallback={null}>
            <SigninPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default MyRoutes
