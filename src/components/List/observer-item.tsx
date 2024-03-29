import React, {useContext, useEffect, useRef, PropsWithChildren} from 'react'
import {ListContext} from './VariableSizeList'
import scopedClass from '../../utils/scopedClass'

interface ListItemType {
  index?: number
}
const sc = scopedClass('Kyong-list')

export default function ListItem(props: PropsWithChildren<ListItemType>) {
  const {index = 0} = props
  const {measure} = useContext(ListContext)

  const element = useRef<HTMLLIElement>(null)

  useEffect(() => {
    measureItem(index)

    return observe()
  }, [])

  // 监听高度变化
  const observe = () => {
    const resizeObserver = new ResizeObserver(() => {
      // 获取当前列表项的高度
      const el = element.current
      if (el && el.offsetHeight) {
        // 触发更新
        measure && measure(index, el.offsetHeight)
      }
    })
    resizeObserver.observe(element.current as Element)

    return () => resizeObserver.disconnect()
  }

  // 初次渲染完成
  const measureItem = (index: number) => {
    const el = element.current
    if (el && el.offsetHeight) {
      measure && measure(index, el.offsetHeight)
    }
  }

  return (
    <li className={sc('item')} key={index} ref={element}>
      {props.children}
    </li>
  )
}
