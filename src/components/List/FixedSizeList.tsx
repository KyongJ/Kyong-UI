import React, {FC, PropsWithChildren} from 'react'
import {useState} from 'react'
import {flushSync} from 'react-dom'

export interface FixedSizeListProps {
  height: number
  width: number
  itemHeight: number
  itemCount: number
  children: React.ComponentType<any>
}

const FixedSizeList: FC<FixedSizeListProps> = ({height, width, itemHeight, itemCount, children}) => {
  const Component = children

  const contentHeight = itemHeight * itemCount //内容总高度
  const [scrollTop, setScrollTop] = useState(0) //滚动位置 //继续需要渲染的item索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight)
  let endIdx = Math.floor((scrollTop + height) / itemHeight) //上下额外多渲染几个item，解决滚动时来不及加载元素出现短暂的空白区域的问题

  const paddingCount = 2
  startIdx = Math.max(startIdx - paddingCount, 0) //处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1)

  const top = itemHeight * startIdx //第一个渲染的item到顶部距离 //需要渲染的items
  const items = []
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(<Component key={i} index={i} style={{height: itemHeight}} />)
  }

  return (
    <div
      style={{height: height, width: width, overflow: 'auto'}}
      onScroll={e => {
        flushSync(() => {
          setScrollTop((e.target as HTMLElement).scrollTop)
        })
      }}
    >
      <div style={{height: contentHeight}}>
        <div style={{height: top}}></div>
        {items}
      </div>
    </div>
  )
}

export default FixedSizeList
