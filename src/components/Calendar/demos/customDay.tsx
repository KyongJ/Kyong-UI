import React from 'react'
import Calendar from '..'
import Progress from '../../Progress'

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cellRender = (_: string, __: string, day: string) => {
    return (
      <div style={{position: 'relative'}}>
        <Progress percent={40} type="circle" width={33} strokeHeight={3} />
        <span
          style={{
            height: '33px',
            width: 33,
            textAlign: 'center',
            lineHeight: '33px',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        >
          {day}
        </span>
      </div>
    )
  }
  return <Calendar cellRender={cellRender} />
}

export default App
