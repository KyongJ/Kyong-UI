import dayjs from 'dayjs'
import React, {ChangeEvent, FC, useContext, useLayoutEffect, useRef, useState} from 'react'
import {DateContext} from './DataManager'
import DateView from './dateView'
import MonthYearView from './monthYearView'

export interface CalendarType {
  year: number
  monthIndex: number
}

export interface DataHandleProps {
  selectedDate?: dayjs.Dayjs
  onSelectDate?: (e: ChangeEvent<HTMLInputElement>, date: dayjs.Dayjs) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CalendarProps {}

const Calendar: FC<CalendarProps> = () => {
  const {value, onSelectDate} = useContext(DateContext)
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

  useLayoutEffect(() => {
    setCalendar({year: value.date.year(), monthIndex: value.date.month()})
  }, [value.date])

  // 处理 MonthYearView 展示后聚焦操作
  // useEffect(() => {
  //   calendarRef.current && calendarRef.current.focus();
  // }, [isDateView]);

  //   const onClickToday = (e: ChangeEvent<HTMLInputElement>) => {
  //     onSelectDate(e, startOfDay(new Date()));
  //   };

  return (
    <div className="Kyong-picker-date" ref={calendarRef} tabIndex={0}>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onSelectMonthYear={setCalendar}
          onTitleClick={onSetMonthYearView}
          selectedDate={value.date}
          onSelectDate={onSelectDate}
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
