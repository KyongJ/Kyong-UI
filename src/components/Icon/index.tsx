import React from 'react'
import classNames from 'classnames'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}
const prefixCls = 'Kyong-icon'

const Icon = (props: IconProps) => {
  const {className, icon, ...restProps} = props

  const classes = classNames('Kyong-icon', className, {})
  return <FontAwesomeIcon icon={icon} className={classes} {...restProps} />
}

export default Icon
