import React, {useState, useCallback, useMemo} from 'react'
import {flushSync} from 'react-dom'

interface VirtualizedListProps<T> {
  items: T[]
  containerHeight: number
  estimatedItemHeight: number
  renderListItem: (item: T) => React.ReactNode
  onScroll?: () => void
}

function VirtualizedList<T>({
  items,
  estimatedItemHeight,
  containerHeight,
  renderListItem,
  onScroll,
}: VirtualizedListProps<T>) {
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(Math.ceil(containerHeight / estimatedItemHeight))
  const [scrollTop, setScrollTop] = useState(0)
  const [currentOffset, setCurrentOffset] = useState(0)

  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        node.scrollTop = scrollTop
      }
    },
    [scrollTop],
  )

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const {clientHeight, scrollHeight, scrollTop} = event.currentTarget
      const visibleItemCount = Math.ceil(event.currentTarget.clientHeight / estimatedItemHeight)

      const newStartIndex = Math.max(0, Math.floor((scrollTop - estimatedItemHeight) / estimatedItemHeight))
      const newEndIndex = Math.min(items.length - 1, newStartIndex + 2 * visibleItemCount)

      flushSync(() => {
        setStartIndex(newStartIndex)
        setEndIndex(newEndIndex)
        setScrollTop(scrollTop)
        setCurrentOffset(scrollTop - (scrollTop % estimatedItemHeight))
      })
      const bottom = scrollHeight - clientHeight - scrollTop
      if (bottom < 10 && onScroll) {
        onScroll()
      }
    },
    [estimatedItemHeight, items.length],
  )
  const renderedItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map(renderListItem)
  }, [items, startIndex, endIndex, renderListItem])

  const totalHeight = useMemo(() => {
    return items.length * estimatedItemHeight
  }, [items.length, estimatedItemHeight])

  return (
    <div
      ref={containerRef}
      style={{height: containerHeight, overflowY: 'auto', position: 'relative'}}
      onScroll={handleScroll}
    >
      <div style={{height: totalHeight, position: 'absolute', left: 0, top: 0, right: 0}}></div>
      <div
        style={{
          // transform: `translate3d(0px, ${currentOffset}px, 0px)`,
          position: 'relative',
          left: 0,
          top: currentOffset,
          right: 0,
        }}
      >
        {renderedItems}
      </div>
    </div>
  )
}

export default VirtualizedList
