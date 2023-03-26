import React, {FC, forwardRef, useContext} from 'react'
import Icon from '../Icon'
import Input from '../Input'
import {DateContext, DateContextType} from './DataManager'

interface InputComponentProps {
  onClick?: (event: Event) => void
  ref?: any
}

// eslint-disable-next-line react/display-name
const InputComponent: FC<InputComponentProps> = forwardRef((_props, ref) => {
  const {value, onInputChange} = useContext<DateContextType>(DateContext)

  return (
    <Input
      placeholder="请选择日期"
      size="sm"
      value={value.textInput}
      style={{width: 200}}
      onChange={onInputChange}
      suffix={<Icon icon={'calendar'} />}
      ref={ref}
    />
  )
})

export default InputComponent
