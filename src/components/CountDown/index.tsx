import React, {useEffect, useRef, useState} from 'react'
import WebWorker from './worker'

interface CountDownTimerProps {
  startTime: number
  endTime: number
  currentTime: number
  onEnd?: () => void
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({
  startTime,
  endTime,
  currentTime = Date.now(),
  onEnd = Function.prototype,
}) => {
  const restTime = useRef<number>(endTime - currentTime)

  // 格式化时间
  const relativeTime = (time: number): string => {
    if (time <= 0) {
      return '00:00'
    }
    const minute = Math.floor(time / 60000) // 分钟数
    const second = Math.floor((time / 1000) % 60) // 秒数
    return `${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`
  }
  const [time, setTime] = useState<string>(relativeTime(restTime.current))

  // work.js
  const work = function (this: Worker) {
    let timer: number | null = null
    let time = 0
    this.onmessage = (e: MessageEvent) => {
      const {restTime, state} = e.data
      time = restTime
      if (state === 'stop') {
        if (timer) {
          clearInterval(timer)
          timer = null
        }
        return
      } else if (state === 'start') {
        const interval = 1000
        if (!timer) {
          timer = setInterval(() => {
            time = time - interval
            this.postMessage(time)
          }, interval)
        }
      }
    }
  }

  const worker = new WebWorker(work)

  const workerHandler = () => {
    worker.onmessage((e: MessageEvent) => {
      if (e.data <= 0) {
        worker.postMessage({state: 'stop'})
        onEnd()
      }
      restTime.current = e.data
      setTime(relativeTime(e.data))
    })

    worker.postMessage({
      state: 'start',
      restTime: Number.parseInt(restTime.current.toString(), 10),
    })
  }

  useEffect(() => {
    workerHandler()

    return () => {
      worker.postMessage({state: 'stop'})
    }
  }, [endTime])

  return (
    <div>
      倒计时：<div>{time}</div>
    </div>
  )
}

export default CountDownTimer
