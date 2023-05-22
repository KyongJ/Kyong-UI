/* eslint-disable */
import React, {useEffect, useState, PropsWithChildren} from 'react'
import scopedClass from '../../utils/scopedClass'
import classNames from 'classnames'
export interface RowProps {
  justify?: string // 水平排列方式
  align?: string // 垂直排列方式
  gutter?: number // 栅格间隔
}

const prefixCls = 'Kyong-row'
const sc = scopedClass(prefixCls)

const Row: React.FC<PropsWithChildren<RowProps>> = props => {
  const {justify, align, gutter = 0} = props
  const [tbalign, setTbalign] = useState({})
  const [tbjustify, setTbjustify] = useState({})

  useEffect(() => {
    pjustify()
    palign()
  }, [])
  // 判断
  const pjustify = () => {
    if (justify == 'start') {
      setTbjustify({
        justifyContent: 'flex-start',
      })
    } else if (justify == 'center') {
      setTbjustify({
        justifyContent: 'center',
      })
    } else if (justify == 'end') {
      setTbjustify({
        justifyContent: 'flex-end',
      })
    } else if (justify == 'space-around') {
      setTbjustify({
        justifyContent: 'space-around',
      })
    } else if (justify == 'space-between') {
      setTbjustify({
        justifyContent: 'space-between',
      })
    } else {
      setTbjustify({})
    }
  }
  // 判断布局
  const palign = () => {
    if (align == 'top') {
      setTbalign({
        alignItems: 'flex-start',
      })
    } else if (align == 'middle') {
      setTbalign({
        alignItems: 'crenter',
      })
    } else if (align == 'bottom') {
      setTbalign({
        alignItems: 'flex-end',
      })
    } else {
      setTbalign({})
    }
  }
  return (
    <div className={classNames(sc('wrapper'))} style={{...tbalign, ...tbjustify}}>
      {/* <Context.Provider value={{ ...{ ...props } }}> */}
      {React.Children.map(props.children, (item: any) => {
        return React.cloneElement(item, {
          item,
          parent: {
            props,
          },
        })
      })}
      {/* </Context.Provider> */}
    </div>
  )
}
export default Row
