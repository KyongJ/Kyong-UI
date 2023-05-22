import React, {Dispatch, SetStateAction, FC, MouseEventHandler} from 'react'
import Button from '../Button'
import DatePicker from './datePicker'
import ViewLayout from './viewLayout'
import HeaderTitle from './headerTitle'
import {CalendarType} from '.'
import Icon from '../Icon'
import dayjs from 'dayjs'

interface DateViewProps {
  calendar: CalendarType
  onSelectMonthYear?: Dispatch<SetStateAction<{year: number; monthIndex: number}>>
  onTitleClick?: MouseEventHandler<HTMLElement>
  cellRender?: (year: string, month: string, day: string) => React.ReactNode
  //   onClickToday?: (event: ChangeEvent<HTMLInputElement>) => void
}

function module(m: number, n: number) {
  return ((m % n) + n) % n
}

const DateView: FC<DateViewProps> = (props: DateViewProps) => {
  const {
    calendar: {year, monthIndex},
    onSelectMonthYear,
    onTitleClick,
    cellRender,
    // onClickToday,
  } = props

  const incrementMonthIndex = (increment: number) => {
    const incrementedMonthIndex = module(monthIndex + increment, 12)
    const incrementedYear = year + Math.floor((monthIndex + increment) / 12)
    onSelectMonthYear &&
      onSelectMonthYear({
        year: incrementedYear,
        monthIndex: incrementedMonthIndex,
      })
  }
  const goToPreviousMonth = incrementMonthIndex.bind(null, -1)

  const goToNextMonth = incrementMonthIndex.bind(null, 1)

  return (
    <ViewLayout
      header={{
        leftElement: <Button btnType="text" icon={<Icon icon="angle-left" />} size="sm" onClick={goToPreviousMonth} />,
        middleElement: <HeaderTitle year={year} monthIndex={monthIndex} onTitleClick={onTitleClick} />,
        rightElement: <Button btnType="text" icon={<Icon icon="angle-right" />} size="sm" onClick={goToNextMonth} />,
      }}
      bodyElement={<DatePicker calendar={props.calendar} cellRender={cellRender} />}
      footerElement={<Button btnType="text">Today</Button>}
    ></ViewLayout>
  )
}

export default DateView
