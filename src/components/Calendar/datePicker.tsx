import dayjs from 'dayjs'
import React, {ChangeEvent, FC, useMemo} from 'react'
import classNames from 'classnames'
import {buildDayNames, buildWeeks} from './utils/generator'
import Button from '../Button'
import scopedClass from '../../utils/scopedClass'
import {CalendarType} from '.'

const sc = scopedClass('Kyong-calendar')

export interface DatePickerProps {
  calendar: CalendarType
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  cellRender?: (year: string, month: string, day: string) => React.ReactNode
  className?: string
}

const DatePicker: FC<DatePickerProps> = props => {
  const {
    calendar: {year, monthIndex},
    cellRender,
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
              return (
                <td key={j} className={classNames(sc('day'))}>
                  {cellRender ? (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      {cellRender(day.format('YYYY'), day.format('MM'), day.format('D'))}
                    </div>
                  ) : (
                    <Button
                      className={classNames(sc('day-item'), {
                        [`${sc('is-today')}`]: isToday,
                        [`${sc('is-currentMonth')}`]: !isCurrentMonth,
                      })}
                      btnType="text"
                    >
                      {day.format('D')}
                    </Button>
                  )}
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
