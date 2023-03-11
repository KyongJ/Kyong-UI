import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import _ from 'lodash'
import {MonthOfYear} from '../monthPicker'

dayjs.extend(objectSupport)
/**
 * 返回当月日期数组
 * @param dayjsDate
 * @returns
 */
export function buildWeeks(dayjsDate: dayjs.Dayjs) {
  //返回当前月份的第一天
  const currentMonthFirstDay = dayjsDate.startOf('month')
  // 返回当月的第一周第一天
  const currentMonthStartDay = currentMonthFirstDay.startOf('week')

  const weeks = new Array(6 * 7).fill(0).map((_, i) => currentMonthStartDay.add(i, 'day'))
  return _.chunk(weeks, 7)
}

/**
 * 返回一周日期名
 * @param weekStartsOn
 * @returns
 */
export function buildDayNames(weekStartsOn: number): string[] {
  return new Array(7)
    .fill(0)
    .map((_, i) => (i + weekStartsOn) % 7)
    .map(dayOfWeek => {
      const day = dayjs().day(dayOfWeek)
      return day.format('dd')
    })
}

/**
 * 返回1-12月份
 * @returns
 */
export function buildMonths(): MonthOfYear[][] {
  const months = new Array(3 * 4).fill(0).map((_, i) => {
    const monthName = dayjs({month: i}).format('MMMM')
    return {index: i, name: monthName}
  })
  return _.chunk(months, 3)
}

/**
 * 制造年份选择器
 * @param middle
 * @param windowSize
 * @returns
 */
export function buildYears(middle: number, windowSize = 3): number[] {
  const start = middle - windowSize
  const end = middle + windowSize
  const years = []
  for (let i = start; i <= end; i++) {
    years.push(i)
  }
  return years
}
