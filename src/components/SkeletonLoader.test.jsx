import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkeletonGrid } from './SkeletonLoader'

describe('SkeletonGrid', () => {
  it('renders 6 cards by default', () => {
    const { container } = render(<SkeletonGrid />)
    expect(container.querySelectorAll('.rounded-xl.shadow-lg').length).toBe(6)
  })

  it('renders custom number of cards', () => {
    const { container } = render(<SkeletonGrid count={3} />)
    expect(container.querySelectorAll('.rounded-xl.shadow-lg').length).toBe(3)
  })
})
