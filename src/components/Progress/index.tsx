import React, {FC} from 'react'
import classNames from 'classnames'
import scopedClass from '../../utils/scopedClass'
import {ThemeProps} from '../Icon'

interface ProgressProps {
  /**
   * 控制进度条的进度
   */
  percent: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 控制进度条的高度
   */
  strokeHeight?: number
  /**
   * 是否展示进度条提示
   */
  showText?: boolean
  /**
   * 自定义样式
   */
  style?: React.CSSProperties
  /**
   * 主题
   */
  theme?: ThemeProps
  /**
   * 圆形进度条
   */
  type?: 'circle' | 'line'

  className?: string
  /**
   * 单位
   */
  unit?: string
  /**
   * 设置圆形进度条的区域范围
   */
  width?: number
  /**
   * 动画效果，条形进度条生效
   */
  animation?: boolean
}

const prefixCls = 'Kyong-progress'

const sc = scopedClass(prefixCls)

const Progress: FC<ProgressProps> = props => {
  const {
    percent,
    strokeHeight = 10,
    showText,
    style,
    max = 100,
    className,
    unit = '%',
    width = 80,
    type = 'line',
    theme = 'primary',
    animation,
  } = props
  let offset = 0
  let radius = (width - strokeHeight) / 2
  let perimeter = 2 * +radius * Math.PI
  let circleFontsize = width/7;

  offset = (max - percent) / max

  const op = offset * perimeter
  const text = percent <= max ? (percent <= 0 ? 0 : percent) : max

  const cx = width / 2
  const cy = width / 2

  if (type === 'circle') {
    return (
      <div
        className={classNames(`${prefixCls}-circle-wrapper`)}
        style={{...style, width: width, height: width}}
      >
        <svg
          className={classNames(className, `${prefixCls}-svg`)}
          viewBox={`0 0 ${width} ${width}`}
          width={width}
          height={width}
        >
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeHeight}
            className="arc-background"
          />

          <circle
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeHeight}
            className={`${sc('circle-color')}-${theme}`}
            strokeDashoffset={op >= 0 ? op : 0}
            strokeDasharray={perimeter}
          />
        </svg>
        {showText && (
          <div
            className={classNames(`${prefixCls}-circle-text`)}
            // style={{fontSize:`${circleFontsize}px`}}
          >{`${text}${unit}`}</div>
        )}
      </div>
    )
  } else {
    return (
      <div className="Kyong-progress" style={style}>
        <div className={sc('bar-outer')} style={{height: `${strokeHeight}px`}}>
          <div
            className={classNames(`${sc('bar-inner')}`, sc(`color-${theme}`), {
              [`${prefixCls}-bar-inner-animate`]: animation,
            })}
            style={{width: `${text}${unit}`}}
          >
            {showText && (
              <span className={sc('bar-inner-text')}>{`${text}${unit}`}</span>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Progress
