import React, {useEffect, useRef, useState} from 'react'
import {formatTime} from './utils/compute'
import WebWorker from '../../utils/workerBuilder'

interface CountDownTimerProps {
  endTime: number
  currentTime?: number
  format?: string
  onEnd?: () => void
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({
  endTime,
  currentTime = Date.now(),
  format = 'hh:mm:ss',
  onEnd = Function.prototype,
}) => {
  const restTime = useRef<number>(endTime - currentTime)

  const [time, setTime] = useState<string>(formatTime(format, restTime.current))

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
      setTime(formatTime(format, e.data))
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
