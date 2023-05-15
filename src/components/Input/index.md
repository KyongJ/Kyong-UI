---
group:
  title: 数据录入 # 配置页面标题,同时生成 <title> 标签
title: Input
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*I5a2Tpqs3y0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Tr90QKrE_LcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---
# Input
通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用
- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 代码演示
<!-- prettier-ignore -->
#### 基本使用
<code src="./demo/basic.tsx" />

#### 不同的大小
通过`type`属性为 `Input` 输入框定义了两种尺寸（大小）
<code src="./demo/size.tsx" />

#### 前缀后缀
 `prefix` `suffix`在输入框上添加前缀或后缀图标;`prepend` `append`前缀后缀组合用于配置一些固定组合
<code src="./demo/prefixAndSuffix.tsx" />

#### 不可用
<code src="./demo/disable.tsx" />


| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| append | 带标签的 input，设置后置标签 | ReactNode | - |  |
| prepend | 带标签的 input，设置前置标签 | ReactNode | - |  |
| defaultValue | 输入框默认内容 | string | - |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |  |
| prefix | 带有前缀图标的 input | ReactNode | - |  |
| suffix | 带有后缀图标的 input | ReactNode | - |  |
| size | 控件大小。注：标准表单内的输入框大小限制为 `sm` \| `lg` |`sm` \| `lg` |  |
| value | 输入框内容 | string | - |  |
| onChange | 输入框内容变化时的回调 | function(e) | - |  |