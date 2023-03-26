import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Input from '..'

describe('Input', () => {
  it('renders without crashing', () => {
    const {getByTestId} = render(<Input data-testid="input-wrapper" />)
    expect(getByTestId('input-wrapper')).toBeInTheDocument()
  })

  it('handles onChange event', () => {
    const onChangeMock = jest.fn()
    const {getByTestId} = render(<Input data-testid="input" onChange={onChangeMock} />)
    const input = getByTestId('input')
    fireEvent.change(input, {target: {value: 'test'}})
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('renders prefix and suffix correctly', () => {
    const {container} = render(<Input prefix="prefix" suffix="suffix" />)
    const prefix = container.querySelector('.Kyong-input-prefix')
    const suffix = container.querySelector('.Kyong-input-suffix')
    expect(prefix).toHaveTextContent('prefix')
    expect(suffix).toHaveTextContent('suffix')
  })

  it('renders prepend and append correctly', () => {
    const {container} = render(<Input prepend="prepend" append="append" />)
    const prepend = container.querySelector('.Kyong-input-group-prepend')
    const append = container.querySelector('.Kyong-input-group-append')
    expect(prepend).toHaveTextContent('prepend')
    expect(append).toHaveTextContent('append')
  })

  it('renders with correct size', () => {
    const {container} = render(<Input size="lg" />)
    const input = container.querySelector('.Kyong-input-wrapper')
    expect(input).toHaveClass('input-size-lg')
  })

  it('disables correctly', () => {
    const {getByTestId} = render(<Input data-testid="input" disabled />)
    const input = getByTestId('input')
    expect(input).toBeDisabled()
  })
})
