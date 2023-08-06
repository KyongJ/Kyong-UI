import React from 'react'
import CountDown from '..'

const app = (props: any) => {
  return (
    <CountDown
      endTime={Date.now() + 30 * 1000}
      onEnd={() => {
        console.log('end')
      }}
    />
  )
}

export default app
