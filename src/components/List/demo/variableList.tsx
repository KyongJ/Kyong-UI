import React from 'react'
import VariableSizeList from '../VariableSizeList'
import {faker} from '@faker-js/faker'

type Item = {
  id: number
  value: string
  src?: string
}

const data: Item[] = []

for (let id = 0; id < 100; id++) {
  const item = {
    id,
    value: faker.lorem.paragraphs(), // 长文本
    src: '',
  }

  if (id % 10 === 1) {
    item.src = faker.image.image()
  }
  data.push(item)
}

export default function App() {
  return (
    <div style={{width: 1000}}>
      <VariableSizeList dataSource={data} containerHeight={500}>
        {(item: Item) => (
          <>
            {item.value}
            {item.src && <img width={400} src={item.src} alt="" />}
          </>
        )}
      </VariableSizeList>
    </div>
  )
}
