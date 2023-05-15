import React from 'react'
import Input from '..'
import Icon from '../../Icon'

const App: React.FC = () => (
  <>
    <Input style={{width: 300}} prepend="https://" />
    <Input style={{marginTop: 10, width: 300}} append=".com" suffix="RMB" />
    <Input style={{marginTop: 10, width: 300}} suffix="RMB" />
    <Input style={{marginTop: 10, width: 300}} prefix="￥" suffix="RMB" />
    <Input style={{marginTop: 10, width: 300}} prefix="￥" suffix={<Icon icon={'angle-down'} />} />
  </>
)

export default App
