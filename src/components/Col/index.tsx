import React, {useState, useEffect, PropsWithChildren} from 'react'
import scopedClass from '../../utils/scopedClass'
import classNames from 'classnames'
import {RowProps} from '../Row'

interface ColProps {
  span?: number | string // 栅格占据的列数
  offset?: number | string // 栅格左侧的间隔格数
  xs?: number | object // <768px 响应式栅格数或者栅格属性对象
  sm?: number | object // ≥768px 响应式栅格数或者栅格属性对象
  md?: number | object // ≥992 响应式栅格数或者栅格属性对象
  lg?: number | object // ≥1200 响应式栅格数或者栅格属性对象
  xl?: number | object // ≥1920px 响应式栅格数或者栅格属性对象
  parent?: {props: RowProps}
  className?: string
}
const prefixCls = 'Kyong-col'
const sc = scopedClass(prefixCls)
const Col: React.FC<PropsWithChildren<ColProps>> = props => {
  // const RowComponent = useContext(Context)
  // // 删除两个多余的传递属性 放置多个传递替换本身的 props 属性
  // if (RowComponent) {
  //   delete RowComponent.children
  //   delete RowComponent.item
  // }

  // 全部设置默认初始值
  const {span = 0, offset = 0, xs = 0, sm = 0, md = 0, lg = 0, xl = 0, className, parent = {props: {}}} = props
  //   const [gutter, setGutter] = useState('')
  const [num, setNum] = useState(0)
  //   const [color, setColor] = useState('red')
  const [tbxs, setTbxs] = useState('')
  const [tbsm, setTbsm] = useState('')
  const [tbmd, setTbmd] = useState('')
  const [tblg, setTblg] = useState('')
  const [tbxl, setTbxl] = useState('')

  // 初始化
  useEffect(() => {
    setNum(4.1666)
    Pxs()
    Psm()
    Pmd()
    Plg()
    Pxl()
  }, [])
  // eslint-disable-line
  const Pxs = () => {
    // 如果是数值类型
    if (
      //   xs > 0 &&
      / Number/.test(Object.prototype.toString.call(xs)) ||
      / String/.test(Object.prototype.toString.call(xs))
    ) {
      setTbxs('Kyong-col-xs-' + xs)
    } else if (xs && / Object/.test(Object.prototype.toString.call(xs))) {
      setTbxs('Kyong-col-xs-' + (xs as {span: ''}).span + ' Kyong-col-xs-offset-' + (xs as {offset: ''}).offset)
    } else {
      setTbxs('')
    }
  }
  function Psm() {
    // 如果是数值类型
    if (
      //   sm > 0 &&
      / Number/.test(Object.prototype.toString.call(sm)) ||
      / String/.test(Object.prototype.toString.call(sm))
    ) {
      setTbsm('Kyong-col-sm-' + sm)
    } else if (sm && / Object/.test(Object.prototype.toString.call(sm))) {
      setTbsm('Kyong-col-sm-' + (sm as {span: ''}).span + ' Kyong-col-sm-offset-' + (sm as {offset: ''}).offset)
    } else {
      setTbsm('')
    }
  }
  function Pmd() {
    // 如果是数值类型
    if (
      //   md > 0 &&
      / Number/.test(Object.prototype.toString.call(md)) ||
      / String/.test(Object.prototype.toString.call(md))
    ) {
      setTbmd('Kyong-col-md-' + md)
    } else if (md && / Object/.test(Object.prototype.toString.call(md))) {
      setTbmd('Kyong-col-md-' + (md as {span: ''}).span + ' Kyong-col-md-offset-' + (md as {offset: ''}).offset)
    } else {
      setTbmd('')
    }
  }
  function Plg() {
    // 如果是数值类型
    if (
      //   lg > 0 &&
      / Number/.test(Object.prototype.toString.call(lg)) ||
      / String/.test(Object.prototype.toString.call(lg))
    ) {
      setTblg('Kyong-col-lg-' + lg)
    } else if (lg && / Object/.test(Object.prototype.toString.call(lg))) {
      setTblg('Kyong-col-lg-' + (lg as {span: ''}).span + ' Kyong-col-lg-offset-' + (lg as {offset: ''}).offset)
    } else {
      setTblg('')
    }
  }
  function Pxl() {
    // 如果是数值类型
    if (
      //   xl > 0 &&
      / Number/.test(Object.prototype.toString.call(xl)) ||
      / String/.test(Object.prototype.toString.call(xl))
    ) {
      setTbxl('Kyong-col-xl-' + xl)
    } else if (xl && / Object/.test(Object.prototype.toString.call(xl))) {
      setTbxl('Kyong-col-xl-' + (xl as {span: ''}).span + ' Kyong-col-xl-offset-' + (xl as {offset: ''}).offset)
    } else {
      setTbxl('')
    }
  }
  // const childrenItem = React.Children.map(props.children, (item) => {
  //   return React.cloneElement(item, {
  //     // ...RowComponent,
  //     item,
  //     instanceType:'Col',
  //     parent: {
  //       props
  //     }
  //   })
  // })

  return (
    <div
      className={classNames('Kyong-col', className, {
        [`${tbxs}`]: props.xs,
        [`${tbsm}`]: props.sm,
        [`${tbmd}`]: props.md,
        [`${tblg}`]: props.lg,
        [`${tbxl}`]: props.xl,
      })}
      style={{
        width: `${num * Number(span)}%`,
        padding: `0 ${(parent.props?.gutter || 0) / 2}px`,
        marginLeft: `${num * Number(offset) + '%'}`,
        // marginRight: `${num * Number(push) + '%'}`,
      }}
    >
      {/* {childrenItem ? childrenItem : props.children} */}
      {props.children}
    </div>
  )
}
export default Col
