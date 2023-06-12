import React, {useState} from 'react'
import './styles.less'
import VirtualizedList, {ListItem} from '../VirtualizedList'

export default function App() {
  const [count, setCount] = useState(1)
  const [data, setData] = useState(new Array(100).fill(0).map((item, i) => ({id: i, content: null} as ListItem)))

  const onScroll = () => {
    const List = new Array(100).fill(0).map((item, i) => ({id: i + count * 100, content: null} as ListItem))
    setData([...data, ...List])
    setCount(count => count + 1)
  }

  return (
    <div style={{width: 300}}>
      列表项高度固定 - 虚拟列表实现
      <VirtualizedList
        containerHeight={400}
        estimatedItemHeight={50}
        items={data}
        onScroll={onScroll}
        renderListItem={item => {
          return (
            <div
              className="item"
              style={{
                backgroundColor: item.id % 2 === 0 ? 'burlywood' : 'cadetblue',
                height: 50,
              }}
            >
              {item.id}
            </div>
          )
        }}
      ></VirtualizedList>
    </div>
  )
}