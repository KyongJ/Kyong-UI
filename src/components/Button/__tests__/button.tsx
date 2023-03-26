import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button from '..'

describe('Button', () => {
  test('renders default button with text', () => {
    const {getByText} = render(<Button>Click me</Button>)
    const buttonElement = getByText(/click me/i)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.tagName).toBe('BUTTON')
    expect(buttonElement).toHaveClass('Kyong-btn')
    expect(buttonElement).toHaveClass('Kyong-btn--default')
  })

  test('renders link button with href and icon', () => {
    const {getByText} = render(
      <Button btnType="link" href="https://example.com">
        {/* <Icon icon="user" /> */}
        Profile
      </Button>
    )
    const buttonElement = getByText(/profile/i)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.tagName).toBe('A')
    expect(buttonElement).toHaveClass('Kyong-btn')
    expect(buttonElement).toHaveClass('Kyong-btn--link')
    expect(buttonElement).toHaveAttribute('href', 'https://example.com')
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    const {getByText} = render(<Button onClick={handleClick}>Click me</Button>)
    const buttonElement = getByText(/click me/i)
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
