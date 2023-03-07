import React, {FC, MouseEventHandler} from 'react'
import scopedClass from '../../utils/scopedClass'
import Button from '../Button'
import { CalendarType } from './calendar'
import YearPicker from './yearPicker'

const sc = scopedClass('Kyong-picker-header-title')

interface HeaderTitleProps extends CalendarType {
  onTitleClick?: MouseEventHandler<HTMLElement>
  onSelectYear?: (value: number) => void
}

const HeaderTitle: FC<HeaderTitleProps> = props => {
  const {year, monthIndex, onTitleClick, onSelectYear} = props
  const firstDayOfMonth = new Date(year, monthIndex)

  if (onSelectYear) {
    return (
      <div className={sc('wrapper')}>
        <span>{monthIndex + 1} 月</span>
        <YearPicker
          selectedYear={year}
          defaultValue={`${year}`}
          onSelectYear={onSelectYear}
        />
        <span>年</span>
      </div>
    )
  } else {
  return (
    <Button btnType="text" size="sm" onClick={onTitleClick}>
      {`${year} 年`} {monthIndex + 1} 月
    </Button>
  )
  }
}

export default HeaderTitle
