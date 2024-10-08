import React from 'react'
import Popover from '..'
import Button from '../../Button'

export default function MenuDemos1() {
  return (
    <>
      <Popover
        type="click"
        style={{padding: '0 0 15px 15px'}}
        width={100}
        position="left"
        content={
          <>
            <p style={{color: '#1d2129', fontSize: '16px'}}>Title</p>
            <div style={{color: '#4e5969', fontSize: '14px'}}>This is content</div>
            <div style={{color: '#4e5969', fontSize: '14px'}}>This is content</div>
          </>
        }
      >
        <Button btnType="primary">Hover me</Button>
      </Popover>
    </>
  )
}
