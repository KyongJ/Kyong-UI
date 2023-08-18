export const formatTime = (format: string, time: number): string => {
  if (time <= 0) {
    if (format.includes('D')) {
      return '0 天 00 时 00 分 00 秒'
    } else {
      return '00:00:00'
    }
  }

  const day = Math.floor(time / (24 * 60 * 60 * 1000)) // 天数
  const hour = Math.floor((time / (60 * 60 * 1000)) % 24) // 小时数
  const minute = Math.floor((time / (60 * 1000)) % 60) // 分钟数
  const second = Math.floor((time / 1000) % 60) // 秒数

  // Format the time based on the provided format string
  let formattedTime = format.replace('dd', day >= 10 ? String(day) : '0' + day)
  formattedTime = formattedTime.replace('D', day.toString())
  formattedTime = formattedTime.replace('hh', hour >= 10 ? String(hour) : '0' + hour)
  formattedTime = formattedTime.replace('H', hour.toString())
  formattedTime = formattedTime.replace('mm', minute >= 10 ? String(minute) : '0' + minute)
  formattedTime = formattedTime.replace('m', minute.toString())
  formattedTime = formattedTime.replace('ss', second >= 10 ? String(second) : '0' + second)
  formattedTime = formattedTime.replace('s', second.toString())

  return formattedTime
}
