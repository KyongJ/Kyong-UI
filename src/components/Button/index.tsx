import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, FC} from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {ReactNode} from 'react'

export type ButtonSize = 'lg' | 'md' | 'sm'
export type ButtonType = 'primary' | 'default' | 'text' | 'link'

interface BaseButtonProps {
  /**
   * 设置按钮额外的样式
   */
  className?: string
  /**
   * 设置按钮类型
   */
  btnType?: ButtonType
  /**
   * 设置按钮大小
   */
  size?: ButtonSize
  /**
   * 添加图标到标题后
   */
  icon?: ReactNode
  /**
   * 设置 link 类型按钮的跳转链接
   */
  href?: string
  children?: React.ReactNode
}
const prefixCls = 'Kyong-btn'
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = props => {
  const {className, btnType, size, icon, href, ...restProps} = props
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}--${btnType}`]: btnType,
    [`${prefixCls}--${size}`]: size,
  })
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {props.children}
      </a>
    )
  } else {
    return (
      <button className={classes} {...restProps}>
        {icon ? icon : null}
        {props.children}
      </button>
    )
  }
}

export default Button
