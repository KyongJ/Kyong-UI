import React, {ChangeEvent, FC, MouseEventHandler} from 'react'
import Button from '../Button'
import Icon from '../Icon'
import {CalendarType} from '.'
import HeaderTitle from './headerTitle'
import MonthPicker from './monthPicker'
import ViewLayout from './viewLayout'

interface MonthYearViewProps {
  calendar: CalendarType
  onSelectMonth: (value: number) => void
  onSelectYear: (value: number) => void
  onBackClick: MouseEventHandler<HTMLElement>
  onClickToday?: (e: ChangeEvent<HTMLInputElement>) => void
}

const MonthYearView: FC<MonthYearViewProps> = props => {
  const {calendar, onSelectMonth, onBackClick, onSelectYear, onClickToday} = props
  const {monthIndex} = calendar
  return (
    <ViewLayout
      header={{
        leftElement: <Button btnType="text" icon={<Icon icon="angle-left" />} size="sm" onClick={onBackClick} />,
        middleElement: <HeaderTitle {...calendar} onSelectYear={onSelectYear} />,
        rightElement: <div />,
      }}
      bodyElement={<MonthPicker selectedMonthIndex={monthIndex} onSelect={onSelectMonth} />}
      footerElement={
        <Button btnType="text" onClick={onClickToday as unknown as any}>
          今天
        </Button>
      }
    />
  )
}

export default MonthYearView
