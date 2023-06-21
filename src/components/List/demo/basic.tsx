import React from 'react'
import './styles.less'
import VirtualizedList, {ListItem} from '../VirtualizedList'
import {faker} from '@faker-js/faker'
type Item = {
  id: number
  value: string
}

export default function App() {
  const data: Item[] = []

  for (let id = 0; id < 100; id++) {
    const item = {
      id,
      value: '', // 长文本
    }
    data.push(item)
  }

  return (
    <div style={{width: 500}}>
      <VirtualizedList
        containerHeight={400}
        estimatedItemHeight={50}
        items={data}
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
