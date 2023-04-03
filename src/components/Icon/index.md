---
group:
  title: 基础组件 # 配置页面标题,同时生成 <title> 标签
  order: 1
---

# Icon


```tsx
import React from 'react';
import { Icon } from 'KyongUI';
import iconsCache from '../Icon/shared/res.ts'
import copy from "copy-to-clipboard";
import './index.less';

const Index = () => (
  <div className="icon">
    There are {Object.keys(iconsCache).splice(0, 256).length} icons
    <br />
    <ul         
      style={{
        display: "flex",
        flexFlow: "row wrap",
        listStyle: "none",
      }}>
      {Object.keys(iconsCache).splice(0, 256).map((key,index) => {
        const iconName = iconsCache[key].iconName;
        const _length = iconName.split("-").length;
        return (
          <li 
            key={index}   
            className='svgCls'              
            style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                flex: "0 1 20%",
                minWidth: 120,
                padding: "0px 7.5px 20px",
                cursor: "pointer",
            }}
            onClick={(e) => {
                copy(iconName);
                // Message.success({ content: '复制成功啦' })
              }}
          >
              
            <Icon icon={iconName} />
            <div                 
              style={{
                color: "#666",
                fontSize: 12,
                width: 70,
                overflow: "hidden",
              }}>{iconName.split("-")[_length - 1]}</div>
          </li>)
      })}
    </ul>
  </div>
);

export default Index;
```

<API></API>
