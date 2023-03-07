import React, {forwardRef, useContext} from 'react'
import Icon from '../Icon'
import Input from '../Input'
import {DateContext, IPickerContext} from './DataManager'

interface Types {
  onClick?: (event: Event) => void
}

const InputComponent = forwardRef((props: Types, ref) => {
  const {value, onInputChange} = useContext<IPickerContext>(DateContext)

  return (
    <Input
      placeholder="请选择日期"
      size="sm"
      value={value.textInput}
      style={{width: 200}}
      onChange={onInputChange}
      suffix={<Icon icon={'calendar'}/>}
      ref={ref}
    />
  )
})

export default InputComponent
