import React from 'react'
import scopedClass from '../../utils/scopedClass'
import classNames from 'classnames'
import Button from '../Button'
import {buildMonths} from './utils/generator'

const sc = scopedClass('Kyong-picker-month')

export type MonthOfYear = {
  index: number
  name: string
}

interface MonthPickerProps {
  selectedMonthIndex: number
  onSelect: (value: number) => void
}

function MonthPicker(props: MonthPickerProps) {
  const months: MonthOfYear[][] = buildMonths()
  const {selectedMonthIndex, onSelect} = props
  return (
    <table className={sc('wrapper')}>
      <tbody>
        {months.map((row: MonthOfYear[], i: number) => (
          <tr key={i}>
            {row.map((month: MonthOfYear, j: number) => {
              const isSelected = month.index === selectedMonthIndex
              return (
                <td
                    className={classNames(sc("cell"), {
                      [`${sc("cell-is-selected")}`]: isSelected,
                    })}
                  key={j}
                >
                  <Button
                    className={classNames(sc('btn-text'), {
                      [`${sc('is-selected')}`]: isSelected,
                    })}
                    btnType="text"
                    onClick={() => onSelect && onSelect(month.index)}
                  >
                    {month.name}
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

export default MonthPicker
