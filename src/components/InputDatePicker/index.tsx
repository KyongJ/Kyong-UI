import dayjs from 'dayjs'
import React, {ChangeEvent, FC, useRef, useState} from 'react'
import FocusManager from '../../utils/FocusManager'
import Calendar from './calendar'
import DataManager from './DataManager'
import InputComponent from './input'

interface InputDatePickerProps {
  onChange?: (e: ChangeEvent<Element>, payload: any) => void
}

const InputDatePicker: FC<InputDatePickerProps> = props => {
  const {onChange} = props
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onFocus = () => {
    setShowPicker(true)
  }

  const onBlur = () => {
    setShowPicker(false)
  }

  const handleOnChange = (e: ChangeEvent<Element>, payload: any) => {
    onChange && onChange(e, payload)
    console.log('payload: ', payload)
    if (payload.origin === 'PICKER') {
      // TODO: 未获取到 ref
      inputRef.current && inputRef.current.focus()
      setShowPicker(false)
    }
  }

  return (
    <FocusManager onFocus={onFocus} onBlur={onBlur}>
      <DataManager onChange={handleOnChange}>
        <InputComponent ref={inputRef} />
        {showPicker && <Calendar />}
      </DataManager>
    </FocusManager>
  )
}

export default InputDatePicker
