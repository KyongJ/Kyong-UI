import React from 'react'
import './styles.less'
import VirtualizedList, {ListItem} from '../VirtualizedList'

export default function App() {
  const list = new Array(10000).fill(0).map((item, i) => ({id: i, content: null}))

  return (
    <div style={{width: 300}}>
      列表项高度固定 - 虚拟列表实现
      <VirtualizedList
        containerHeight={400}
        estimatedItemHeight={50}
        items={list}
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
