---
group:
  title: 数据录入 # 配置页面标题,同时生成 <title> 标签
  order: 2
---

# Select
下拉选择器。

## 基本使用
```tsx
import React from 'react';
import { Select} from 'KyongUI';

export default () => (
        <div style={{display:'flex'}}>
            <Select style={{ width: 200,marginRight:15 }} placeholder="请选择">
                <Select.Option value="苹果 🍎"> 苹果 🍎 </Select.Option>
                <Select.Option value="橘子 🍊">橘子 🍊</Select.Option>
                <Select.Option value="葡萄 🍇"> 葡萄 🍇 </Select.Option>
                <Select.Option value="香蕉 🍌 " disabled> 香蕉 🍌 </Select.Option>
            </Select>

            <Select style={{ width: 200 }} placeholder="请选择" disabled />
        </div>
)
```
#### Select Api
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 指定默认选中的条目 | string \| string[] \|number \| number[] |-  |  |
| disabled | 不可用 | boolean | false |  |
| placeholder | 选择框默认文本 | string | - |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | - |  |

#### SelectOption Api
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |  |
| value | 默认根据此属性值进行筛选 | string \|number |-  |  |