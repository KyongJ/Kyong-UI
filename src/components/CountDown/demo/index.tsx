import React from 'react'
import CountDown from '..'

const app = (props: any) => {
  return (
    <CountDown
      endTime={Date.now() + 30 * 1000}
      format="D 天 H 时 m 分 s 秒"
      onEnd={() => {
        console.log('end')
      }}
    />
  )
}

export default app
