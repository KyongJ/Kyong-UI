# Progress

输入或选择日期的控件

#### 基础使用
基础使用
```tsx
import React from 'react';
import { Progress } from 'KyongUI';

export default () => (
    <div>
      <>
        <Progress style={{width:400}} percent={60} max={100} theme='success' />
        <Progress style={{width:400,marginTop:10}} percent={40} max={100} theme='warning' />
      </>
      <p>设置 animation 为 true 时，将会显示动画效果，仅当 type = line 时生效</p>
      <>
        <Progress style={{width:400,marginTop:10}} percent={55} max={100} animation />
        <Progress style={{width:400,marginTop:10}} percent={55} theme='secondary' animation  />
      </>
      <p>展示进度值描述：</p>
      <Progress style={{width:400,marginTop:10}} percent={40} max={100} showText />
      <Progress style={{width:400,marginTop:10}} percent={80} max={100} theme='dark' showText />
    </div>
)
```

#### 不同主题
一共支持七种主题：`primary` 、 `secondary` 、 `success` 、 `warning` 、 `danger` 、 `info` 、 `dark`
基础使用
```tsx
import React from 'react';
import { Progress } from 'KyongUI';

export default () => (
    <div>
        <Progress style={{width:400}} percent={90} max={100} theme='primary' />
        <Progress style={{width:400,marginTop:10}} percent={40} max={100} theme='secondary' />
        <Progress style={{width:400,marginTop:10}} percent={55} max={100} theme='success'  />
        <Progress style={{width:400,marginTop:10}} percent={70} theme='info'   />
        <Progress style={{width:400,marginTop:10}} percent={40} max={100} theme='warning' />
        <Progress style={{width:400,marginTop:10}} percent={80} max={100} theme='danger' showText />
        <Progress style={{width:400,marginTop:10}} percent={20} max={100} theme='dark' showText />
    </div>
)
```

#### 圆形进度条
展示圆形进度条，同时也具有不同的七种主题
```tsx
import React from 'react';
import { Progress } from 'KyongUI';

export default () => (
    <div style={{display:'flex'}}>
      <Progress style={{width:400,marginRight:20}} percent={40} max={100} type='circle' width={100} strokeHeight={8} theme='info' showText />

      <Progress style={{width:400}} percent={70} max={100} type='circle' width={100} strokeHeight={8} theme='warning' showText />

      <Progress style={{width:400}} percent={70} type='circle' width={20} strokeHeight={3} theme='success' />
    </div>
)
```

#### 动态演示
展示圆形进度条，同时也具有不同的七种主题
```tsx
import React ,{useState} from 'react';
import { Progress,Button } from 'KyongUI';

export default () => {
    const [linePercent, setLinePercent] = useState(40)
    const [circlePercent, setCirclePercent] = useState(40)
    
    return (
    <div>
        <Progress style={{width:400,marginRight:20}} percent={linePercent} max={100} strokeHeight={12} theme='info' showText />
        <div style={{display:'flex',marginTop:10}}>
            <Button style={{marginRight:5}} onClick={()=>setLinePercent(linePercent=>linePercent-1)} >完成度-1</Button>
            <Button onClick={()=>setLinePercent(linePercent=>linePercent+1)} >完成度+1 </Button>
        </div>

        <Progress style={{width:400,marginTop:10}} percent={circlePercent} max={100} type='circle' width={100} strokeHeight={8} theme='warning' showText />
        <div style={{display:'flex',marginTop:10}}>
            <Button style={{marginRight:5}} onClick={()=>setCirclePercent(linePercent=>linePercent-1)} >完成度-1</Button>
            <Button onClick={()=>setCirclePercent(linePercent=>linePercent+1)} >完成度+1 </Button>
        </div>
    </div>)
}
```

#### 设置粗细
通过 `strokeHeight` 来设置条形进度条和圆形进度条的粗细
```tsx
import React ,{useState} from 'react';
import { Progress } from 'KyongUI';

export default () => {   
    return (
    <div>
        <Progress style={{width:400}} percent={50} strokeHeight={10} theme='info' showText />
        <Progress style={{width:400,marginTop:20}} percent={50} strokeHeight={12} theme='secondary' showText />
        <Progress style={{width:400,marginTop:20}} percent={50} strokeHeight={14} theme='success' showText />
        <Progress style={{width:400,marginTop:20}} percent={50} strokeHeight={16} theme='danger' showText />
        <Progress style={{width:400,marginTop:20}} percent={50} strokeHeight={20} theme='warning' showText />
        <Progress style={{width:400,marginTop:10}} percent={60} type='circle' width={100} strokeHeight={8} theme='warning' showText />
        <Progress style={{width:400,marginTop:10}} percent={43} type='circle' width={100} strokeHeight={12} theme='success' showText />
    </div>)
}
```

<API></API>