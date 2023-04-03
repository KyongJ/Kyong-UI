---
group:
  title: 基础组件 # 配置页面标题,同时生成 <title> 标签
---

# Button
按钮用于开始一个即时操作。

#### 按钮类型
按钮有四种类型：主按钮、次按钮、文本按钮、链接按钮。主按钮在同一个操作区域最多出现一次。
```tsx
import React from "react";
import { Button } from "KyongUI";

export default () => (
  <div style={{display:'flex'}}>
    <div style={{ marginRight: 10 }}>
      <Button btnType="primary">Primary Button</Button>
    </div>
    <div style={{ marginRight: 10  }}>
      <Button>default Button</Button>
    </div>
    <div style={{ marginRight: 10  }}>
      <Button btnType="text">Text Button</Button>
    </div>
    <div style={{ marginRight: 10  }}>
      <Button btnType="link">Link Button</Button>
    </div>
  </div>
);
```

#### 按钮尺寸
按钮有大、中、小三种尺寸。
通过设置 `size` 为 `lg` `md` `sm` 分别把按钮设为大、中、小尺寸。若不设置 size，则尺寸为中。
```tsx
import React,{useState} from "react";
import { Button } from "KyongUI";

export default () => {
  const [size, setSize] = useState('md')
  return <div style={{display:'flex'}}>
    <div style={{ marginRight: 10 }}>
      <Button size={`${size}`} onClick={()=>setSize('sm')} >small</Button>
    </div>
    <div style={{ marginRight: 10 }}>
      <Button size={`${size}`} onClick={()=>setSize('md')} >middle</Button>
    </div>
    <div style={{ marginRight: 10}}>
      <Button size={`${size}`} onClick={()=>setSize('lg')} >large</Button>
    </div>
  </div>
};
```

#### 图标按钮
当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Button` 内使用 `Icon` 组件。
如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。
```tsx
import React from "react";
import { Button ,Icon} from "KyongUI";

export default () => {
  const Left = <Icon icon='align-left' style={{marginRight:5}} />
  const apple = <Icon icon='apple-alt' style={{marginRight:5}} />
  return (
    <div style={{display:'flex'}}>
      <div style={{ marginRight: 10}}>
        <Button icon={Left}>带图标的button</Button>
      </div>
      <div style={{ marginRight: 10}}>
        <Button icon={apple}>带图标的button</Button>
      </div>
    </div>
  )
};
```

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | 设置按钮失效状态 | boolean | false |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| icon | 设置按钮的图标组件 | ReactNode | - |  |
| size | 设置按钮大小 | `lg` \| `md` \| `sm` | `md` |  |
| type | 设置按钮类型 | `primary` \| `link` \| `text` \| `default` | `default` |  |
| onClick | 点击按钮时的回调 | (event: MouseEvent) => void | - |  |

支持原生 button 的其他所有属性。
