import React, {
  ReactElement,
  FC,
  ChangeEvent,
  InputHTMLAttributes,
  useState,
  forwardRef,
  ReactNode,
  useRef,
  LegacyRef,
  useEffect,
  useCallback,
} from 'react'
import classNames from 'classnames'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {scopedClass} from '../../utils/scopedClass'

const sc = scopedClass('Kyong-input')

type InputSize = 'lg' | 'sm'
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'prefix'> {
  disabled?: boolean
  size?: InputSize
  icon?: IconProp
  prefix?: ReactNode
  suffix?: ReactNode
  prepend?: ReactNode
  append?: ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  ref?: any
}

export const Input: FC<InputProps> = forwardRef((props, ref) => {
  const {
    disabled,
    size,
    icon,
    prefix,
    suffix,
    prepend,
    append,
    style,
    onChange = () => {},
    ...restProps
  } = props
  const [prefixPadding, setPrefixPadding] = useState(11)
  const [suffixPadding, setSuffixPadding] = useState(11)
  const prefixRef = useRef<HTMLDivElement>(null)
  const suffixRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  const classnames = classNames(sc('wrapper'), {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append || prefix || suffix,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
    [`${sc('inner')}-is-hover`]: hover,
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  // 如果存在value 就删除defaultValue
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  const setPrefixAndSuffixOfWidth = useCallback(() => {
    if (suffix) {
      const width = suffixRef.current?.offsetWidth
      width && setSuffixPadding(width + 9)
    } else {
      setSuffixPadding(11)
    }
    if (prefix) {
      const width = prefixRef.current?.offsetWidth
      width && setPrefixPadding(width + 9)
    } else {
      setPrefixPadding(11)
    }
  }, [suffix, prefix])

  useEffect(() => {
    setPrefixAndSuffixOfWidth()
  }, [setPrefixAndSuffixOfWidth])

  return (
    <div className={classnames} ref={parentRef} style={style}>
      {prepend && <div className={sc('group-prepend')}>{prepend}</div>}
      <div className={sc('container')}>
        <input
          id={`input-inner`}
          className={sc('inner')}
          onMouseOver={() => setHover(!disabled)}
          onMouseLeave={() => setHover(false)}
          disabled={disabled}
          onChange={onChange}
          style={{
            paddingRight: `${suffixPadding}px`,
            paddingLeft: `${prefixPadding}px`,
          }}
          ref={ref}
          {...restProps}
        />
        {prefix && (
          <div className={sc('prefix')} ref={prefixRef}>
            {prefix}
          </div>
        )}
        {suffix && (
          <div className={sc('suffix')} ref={suffixRef}>
            {suffix}
          </div>
        )}
      </div>
      {append && <div className={sc('group-append')}>{append}</div>}
    </div>
  )
})

Input.defaultProps = {
  disabled: false,
  size: 'sm',
  icon: undefined,
  prepend: '',
  append: '',
}

export default Input
