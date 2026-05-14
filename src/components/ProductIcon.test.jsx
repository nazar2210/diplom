import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductIcon from './ProductIcon'

describe('ProductIcon', () => {
  it('renders medical icon label for medical category', () => {
    render(<ProductIcon category="medical" />)
    expect(screen.getByText('MEDICAL')).toBeInTheDocument()
  })

  it('falls back to default icon label for unknown category', () => {
    render(<ProductIcon category="unknown" />)
    expect(screen.getByText('O₂')).toBeInTheDocument()
  })
})
