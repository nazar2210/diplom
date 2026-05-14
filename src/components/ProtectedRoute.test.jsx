import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const useAuthMock = vi.fn()

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => useAuthMock()
}))

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthMock.mockReset()
  })

  it('shows loading state when auth is loading', () => {
    useAuthMock.mockReturnValue({ user: null, loading: true })

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <div>Private Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Загрузка...')).toBeInTheDocument()
  })

  it('redirects to login when user is not authenticated', () => {
    useAuthMock.mockReturnValue({ user: null, loading: false })

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <div>Private Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument()
  })

  it('renders children when user is authenticated', () => {
    useAuthMock.mockReturnValue({ user: { id: '1' }, loading: false })

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <div>Private Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Private Content')).toBeInTheDocument()
  })
})
