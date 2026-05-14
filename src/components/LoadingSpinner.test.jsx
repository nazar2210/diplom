import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders spinner container and svg', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('uses default medium size and primary color classes', () => {
    const { container } = render(<LoadingSpinner />)
    const spinner = container.querySelector('svg')?.parentElement

    expect(spinner).toHaveClass('w-8')
    expect(spinner).toHaveClass('h-8')
    expect(spinner).toHaveClass('text-primary-600')
  })

  it('applies custom size and color classes', () => {
    const { container } = render(<LoadingSpinner size="lg" color="white" />)
    const spinner = container.querySelector('svg')?.parentElement

    expect(spinner).toHaveClass('w-12')
    expect(spinner).toHaveClass('h-12')
    expect(spinner).toHaveClass('text-white')
  })
})
