import React, {FC, ReactNode} from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

interface FocusManagerProps {
  onBlur: (arg0: any) => void
  onFocus: (arg0: any) => void
  children: ReactNode
  tabIndex?: number
}

const FocusManager: FC<FocusManagerProps> = props => {
  let timeoutId: number
  const onBlur = (e: any) => {
    console.log('onBlur In FocusManager')
    timeoutId = setTimeout(() => {
      props.onBlur(e)
    })
  }
  const onFocus = (e: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    console.log('onFocus In FocusManager')
    props.onFocus(e)
  }
  return (
    <div
      onFocus={onFocus}
      onBlur={onBlur}
      {...omit(props, ['onFocus', 'onBlur'])}
    >
      {props.children}
    </div>
  )
}

export default FocusManager
