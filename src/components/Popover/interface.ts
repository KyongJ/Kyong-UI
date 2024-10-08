import {CSSProperties, ReactNode} from 'react'

export interface PopoverProps {
  /**
   * @description 自定义样式
   */
  style?: CSSProperties
  /**
   * @description 自定义类名
   */
  className?: string
  /**
   * @description 触发形式 hover/click
   * @default hover
   */
  type?: string
  /**
   * @description 对齐方式 left/right/top/bottom
   * @default bottom
   */
  position?: 'top' | 'left' | 'right' | 'bottom'
  /**
   * @description 卡片内容
   * @default <></>
   */
  content: ReactNode
  /**
   * @description 卡片宽度
   * @default 200px
   */
  width?: number | string
  /**
   * @description 无边框
   * @default false
   */
  noBorder?: boolean
  /**
   * @description 默认显示气泡卡片
   * @default false
   */
  defaultShow?: boolean
  /**
   * @description 气泡卡片关闭依赖项
   * @default []
   */
  closeDeps?: Array<any>
  /**
   * @description 卡片显示隐藏回调
   */
  onVisibleChange?: () => void
  ref?: any
}
