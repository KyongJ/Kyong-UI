import dayjs from 'dayjs'
import React, {FC, useRef, useState} from 'react'
import DateView from './dateView'
import MonthYearView from './monthYearView'

export interface CalendarType {
  year: number
  monthIndex: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CalendarProps {
  cellRender?: (year: string, month: string, day: string) => React.ReactNode
}

const Calendar: FC<CalendarProps> = props => {
  const {cellRender} = props
  const today = dayjs()
  const initialCalendar = {
    year: today.year(),
    monthIndex: today.month(),
  }
  const [calendar, setCalendar] = useState(initialCalendar)
  const [isDateView, setDateView] = useState(true)
  const calendarRef = useRef<HTMLDivElement>(null)

  const onSelectMonth = (selectedMonthIndex: number) => {
    setCalendar({...calendar, monthIndex: selectedMonthIndex})
  }
  const onSelectYear = (selectedYear: number) => {
    setCalendar({...calendar, year: selectedYear})
  }
  const onSetMonthYearView = setDateView.bind(null, false)

  const onSetDateView = setDateView.bind(null, true)

  return (
    <div className="Kyong-calendar" ref={calendarRef}>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onSelectMonthYear={setCalendar}
          onTitleClick={onSetMonthYearView}
          cellRender={cellRender}
          //   onClickToday={onClickToday}
        />
      ) : (
        <MonthYearView
          calendar={calendar}
          onSelectMonth={onSelectMonth}
          onSelectYear={onSelectYear}
          onBackClick={onSetDateView}
        />
      )}
    </div>
  )
}

export default Calendar
