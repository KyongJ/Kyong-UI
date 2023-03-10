import dayjs from 'dayjs'
import React, {ChangeEvent, FC, useMemo} from 'react'
import classNames from 'classnames'
import {buildDayNames, buildWeeks} from './utils/generator'
import Button from '../Button'
import scopedClass from '../../utils/scopedClass'
import {CalendarType, DataHandleProps} from './calendar'

const sc = scopedClass('Kyong-picker-date')

export interface DatePickerProps extends DataHandleProps {
  calendar: CalendarType
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const DatePicker: FC<DatePickerProps> = props => {
  const {
    calendar: {year, monthIndex},
    selectedDate,
    onSelectDate,
  } = props

  const weeks = useMemo(() => buildWeeks(dayjs(new Date(year, monthIndex))), [year, monthIndex])
  const dayNames = useMemo(() => buildDayNames(0), [])

  return (
    <table className={classNames(sc('wrapper'))}>
      <thead className={classNames(sc('header'))}>
        <tr>
          {dayNames.map((dayName, i) => (
            <th key={i}>{dayName}</th>
          ))}
        </tr>
      </thead>
      <tbody className={classNames(sc('weeks'))}>
        {weeks.map((week, i) => (
          <tr key={i} className={classNames(sc('weeks-item'))}>
            {week.map((day, j) => {
              // 目前是当前日期
              const isToday = day.isSame(dayjs(), 'day')
              //  // 当前月日期
              const isCurrentMonth = day.month() === monthIndex
              //  // 选中日期
              const isSelected = day.isSame(selectedDate, 'day')
              return (
                <td key={j} className={classNames(sc('day'))}>
                  <Button
                    className={classNames(sc('day-item'), {
                      [`${sc('is-today')}`]: isToday,
                      [`${sc('is-currentMonth')}`]: !isCurrentMonth,
                      [`${sc('is-selected')}`]: isSelected,
                    })}
                    btnType="text"
                    onClick={e => {
                      onSelectDate && onSelectDate(e as unknown as ChangeEvent<HTMLInputElement>, day)
                    }}
                  >
                    {day.format('D')}
                  </Button>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DatePicker
