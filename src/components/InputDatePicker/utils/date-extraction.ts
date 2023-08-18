import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'

dayjs.extend(objectSupport)

// date转str
export function dateToStr(date: dayjs.Dayjs) {
  return date.format('YYYY-MM-DD')
}

function getDateRegexp(dateFormat: string) {
  //MM-dd-YYYY [MM,dd,YYYY]
  const dateFormatAsRegexp = dateFormat.replace(/[A-Za-z]{4}/g, '([0-9]{4})').replace(/[A-Za-z]{2}/g, '([0-9]{1,2})')
  return {
    regexp: new RegExp(`^\\s*${dateFormatAsRegexp}\\s*$`),
    partsOrder: dateFormat.split(/[^A-Za-z]/),
  }
}

function DatePickerException(code: string) {
  return code
}

//str 转Date
export function strToDate(strToParse: string, dateFormat = 'YYYY-MM-DD') {
  const {regexp, partsOrder} = getDateRegexp(dateFormat)
  const dateMatches = strToParse.match(regexp) // 2023-02-15, 2023 02 15;
  const dateErrors = []

  if (!dateMatches) {
    dateErrors.push(DatePickerException('INVALID_DATE_FORMAT'))
    throw dateErrors
  }

  const yearIndex = partsOrder.indexOf('YYYY')
  const monthIndex = partsOrder.indexOf('MM')
  const dayIndex = partsOrder.indexOf('DD')

  const yearString = dateMatches[yearIndex + 1]
  const monthString = dateMatches[monthIndex + 1]
  const dayString = dateMatches[dayIndex + 1]

  const month = parseInt(monthString, 10)

  if (month === 0 || month > 12) {
    dateErrors.push(DatePickerException('INVALID_MONTH_NUMBER'))
  }
  const day = parseInt(dayString, 10)
  if (day === 0) {
    dateErrors.push(DatePickerException('INVALID_DAY_NUMBER'))
  }
  const year = parseInt(yearString, 10)
  const monthDate = dayjs({year, month: month - 1})
  const monthDay = monthDate.daysInMonth()
  if (day > monthDay) {
    dateErrors.push(DatePickerException('INVALID_DAY_OF_MONTH'))
  }

  if (dateErrors.length > 0) {
    throw dateErrors
  }
  return monthDate.date(day)
}
