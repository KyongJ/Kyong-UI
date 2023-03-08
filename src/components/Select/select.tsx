import React, {ChangeEvent, useState, createContext, useRef} from 'react'
import classNames from 'classnames'
import {scopedClass} from '../../utils/scopedClass'
import useClickOutside from '../../hooks/useClickOutSide'
import Input from '../Input'
import {SelectOptionProps} from './selectOption'
import Transition from '../Transition'
import Icon from '../Icon'

const sc = scopedClass('Kyong-select')

export interface SelectProps {
  disabled?: boolean
  onChange?: (value: string | number) => void
  children?: React.ReactNode
  style?: React.CSSProperties
  defaultValue?: string
  placeholder?: string
}

type selectItemType = {key: string; val: string}

interface ISelectContext {
  index?: string
  onSelect?: (selectItem: selectItemType) => void
  onShowOption?: (value: boolean) => void
  inputValue?: string
}

export const SelectContext = createContext<ISelectContext>({index: '0'})

export const Select: React.FC<SelectProps> = props => {
  const {
    disabled = false,
    children,
    onChange,
    style,
    defaultValue,
    placeholder,
  } = props
  const [showOption, setShowOption] = useState(false)
  const [inputValue, setInputValue] = useState(defaultValue)

  const onSelect = (item: selectItemType) => {
    setInputValue(item.val)
    onChange && onChange(item.key)
  }

  const handleShowOption = (value: boolean) => {
    setShowOption(value)
  }

  const passedContext: ISelectContext = {
    onSelect: onSelect,
    onShowOption: handleShowOption,
    inputValue: inputValue,
  }
  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => setShowOption(false))

  const renderChildren = () => {
    const classnames = classNames(sc('option-list'))
    return (
      <Transition in={showOption} animation="zoom-in-top" timeout={300}>
        <ul className={classnames}>
          {React.Children.map(children, (child, index) => {
            const childElement =
              child as React.FunctionComponentElement<SelectOptionProps>
            return React.cloneElement(childElement)
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div style={style} className='Kyong-select' ref={selectRef}>
      <SelectContext.Provider value={passedContext}>
        <Input
          style={{caretColor: 'transparent'}}
          disabled={disabled}
          placeholder={placeholder}
          onClick={() => setShowOption(!showOption)}
          value={inputValue}
          suffix={<Icon icon={'angle-down'} style={{color: '#969ba4'}} />}
        />
        {renderChildren()}
      </SelectContext.Provider>
    </div>
  )
}

export default Select
