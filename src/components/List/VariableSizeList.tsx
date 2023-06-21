import React, {FC, createContext, useEffect, useMemo, useRef, useState} from 'react'
import ObserverItem from './observer-item'

interface VariableSizeListProps<T> extends Omit<React.HTMLAttributes<any>, 'children'> {
  dataSource: T[]
  containerHeight: number
  estimatedItemHeight?: number
  // renderListItem?: (item: ListItem) => React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (item: T) => React.ReactElement
}

interface IListContext {
  measure?: (index: number, height: number) => void
}

export const ListContext = createContext<IListContext>({})

function VariableSizeList<T>(props: VariableSizeListProps<T>) {
  const {dataSource = [], estimatedItemHeight, children, containerHeight} = props
  const viewport = useRef<HTMLDivElement>(null) // 可视区域
  const phantom = useRef<HTMLDivElement>(null) // 占位区域，列表总高度
  const listArea = useRef<HTMLUListElement>(null) // 渲染区域

  // 预估高度
  const defaultItemSize = estimatedItemHeight || 80
  // 记录列表项的位置信息
  const [positions, setPositions] = useState(
    dataSource.map((_: unknown, index: number) => {
      return {
        index,
        height: defaultItemSize,
        top: index * defaultItemSize,
        bottom: (index + 1) * defaultItemSize,
      }
    }),
  )
  // 列表总高度
  const [totalHeight, setTotalHeight] = useState(positions.reduce((total, item) => total + item.height, 0))
  // 渲染数量
  const viewCount = useRef(Math.ceil(containerHeight / defaultItemSize) + 5)
  // 开始index
  const [startIndex, setStartIndex] = useState(0)
  // 结束index
  const endIndex = useMemo(() => startIndex + viewCount.current, [startIndex])
  // 偏移量
  const [startOffset, setStartOffset] = useState(0)

  useEffect(() => {
    if (positions.length) {
      // 列表高度：positions最后一项的bottom
      const totalHeight = positions[positions.length - 1]?.bottom
      setTotalHeight(totalHeight)
    }
  }, [positions])

  // 测量高度
  const measure = (index: number, height: number) => {
    // 如果没有传入height，主动进行测量
    if (height === undefined) {
      height = listArea?.current?.querySelector(`[key="${index}"]`)?.clientHeight || defaultItemSize
    }

    positions.forEach(item => {
      if (item.index === index) {
        const oldHeight = item.height
        const dHeight = oldHeight - height

        // 向下更新
        if (dHeight) {
          item.height = height
          item.bottom = item.bottom - dHeight

          for (let k = index + 1; k < positions.length; k++) {
            positions[k].top = positions[k - 1].bottom
            positions[k].bottom = positions[k].bottom - dHeight
          }
        }
      }
    })
    setPositions([...positions])
  }

  // 获取startIndex 二分查找法
  const getStartIndex = (scrollTop: number) => {
    const item = positions.find(i => i && i.bottom > scrollTop)
    return item?.index || 0
  }

  // 获取startOffset
  const getStartOffset = (startIndex: number) => {
    return startIndex >= 1 ? positions[startIndex - 1].bottom : 0
  }

  /**
   * 获取滚动距离 scrollTop
   * 根据 scrollTop 和 itemSize 计算出 startIndex 和 endIndex
   * 根据 scrollTop 和 itemSize 计算出 startOffset
   * 显示startIndex 和 endIndex之间的元素
   * 设置listArea的偏移量为startOffset
   */
  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const {clientHeight, scrollHeight, scrollTop} = event.currentTarget
    const startIndex = getStartIndex(scrollTop)
    setStartIndex(startIndex)

    const startOffset = getStartOffset(startIndex)
    setStartOffset(startOffset)
  }

  //判断索引区间
  const betweenRange = (index: number) => {
    return index >= startIndex && index <= endIndex
  }

  // context内容
  const passedContext: IListContext = {
    measure,
  }

  // 渲染内容
  const renderChildren = () => {
    return dataSource.map(
      (item, index) =>
        betweenRange(index) && (
          <ObserverItem key={index} index={index}>
            {children(item)}
          </ObserverItem>
        ),
    )
  }

  return (
    <ListContext.Provider value={passedContext}>
      <div
        style={{height: containerHeight, overflowY: 'auto', position: 'relative'}}
        ref={viewport}
        onScroll={onScroll}
      >
        <div style={{height: `${totalHeight}px`, position: 'absolute', left: 0, top: 0, right: 0}} ref={phantom}></div>
        <ul className="list-area" ref={listArea} style={{transform: `translate3d(0,${startOffset}px,0)`}}>
          {renderChildren()}
        </ul>
      </div>
    </ListContext.Provider>
  )
}

export default VariableSizeList
