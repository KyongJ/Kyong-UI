import dayjs from 'dayjs'
import React, {ChangeEvent, createContext, useState} from 'react'
import {dateToStr, strToDate} from './utils/date-extraction'

export type DateManagerState = {
  date: dayjs.Dayjs
  textInput: string
  origin?: 'PICKER' | 'INPUT'
  errors?: any[]
}

interface DateManagerProps {
  onChange?: (e: ChangeEvent<Element>, value: DateManagerState) => void
  children: React.ReactNode
}

export interface DateContextType {
  value: DateManagerState
  onSelectDate: (e: ChangeEvent<HTMLInputElement>, date: dayjs.Dayjs) => void
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const DateContext = createContext<DateContextType>({
  value: {date: dayjs(), textInput: ''},
  onSelectDate: () => {},
  onInputChange: () => {},
})

const DateManager = (props: DateManagerProps) => {
  const {onChange, children} = props
  const [state, setState] = useState<DateManagerState>({
    date: dayjs(),
    textInput: '',
  })

  const onSelectDate = (e: ChangeEvent<HTMLInputElement>, date: dayjs.Dayjs) => {
    const nextState: DateManagerState = {
      date,
      textInput: dateToStr(date),
    }
    console.log(e)
    console.log(nextState)
    setState(nextState)

    onChange && onChange(e, {...nextState, origin: 'PICKER'})
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textInput = e.target.value
    let errors = []
    let date = dayjs()
    if (textInput) {
      try {
        date = strToDate(textInput)
      } catch (parseErrors) {
        errors = parseErrors as any
      }
    }
    const nextState: DateManagerState = {
      date,
      textInput,
    }
    setState(nextState)
    // 调用外部的onChange函数
    onChange && onChange(e, {...nextState, errors, origin: 'INPUT'})
  }

  const passedContext: DateContextType = {
    value: state,
    onSelectDate,
    onInputChange,
  }

  return <DateContext.Provider value={passedContext}>{children}</DateContext.Provider>
}

export default DateManager
