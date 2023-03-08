import React, {MouseEvent, useContext, useState} from 'react'
import classNames from 'classnames'
import {scopedClass} from '../../utils/scopedClass'
import {SelectContext} from './select'

export interface SelectOptionProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  active?: boolean
}

const sc = scopedClass('Kyong-select')

const SelectOption: React.FC<SelectOptionProps> = props => {
  const {value, children, disabled, ...restProps} = props
  const {onSelect, onShowOption, inputValue} = useContext(SelectContext)
  const [hover, setHover] = useState(false)

  const handleOptionItem = (e: MouseEvent<HTMLLIElement>) => {
    const _value = (e.target as any).innerHTML as string
    if (!disabled) {
      onSelect && onSelect({key: value, val: _value})
      onShowOption && onShowOption(false)
    }
  }
  const classnames = classNames(sc('option-list-item'), {
    'is-disabled': disabled,
    'is-active': value === inputValue,
    "is-hover": hover,
  })
  return (
    <li
      className={classnames}
      onMouseOver={() => {
        if (!props.disabled) {
          setHover(true)
        }
      }}
      onMouseLeave={() => setHover(false)}
      onClick={handleOptionItem}
      {...restProps}
    >
      {children}
    </li>
  )
}
export default SelectOption
