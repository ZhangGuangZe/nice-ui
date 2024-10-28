# Button 组件

## 基础用法

使用 `type` 属性来定义按钮的样式。

:::demo
```vue
<template>
  <ni-button>默认按钮</ni-button>&nbsp;
  <ni-button type="primary">主要按钮</ni-button>&nbsp;
  <ni-button type="secondary">次要按钮</ni-button>&nbsp;
  <ni-button type="text">文本按钮</ni-button>
</template>
```
:::

## 禁用状态

使用 `disabled` 属性来定义按钮是否禁用。

:::demo
```vue
<template>
  <ni-button disabled>默认按钮</ni-button>&nbsp;
  <ni-button type="primary" disabled>主要按钮</ni-button>&nbsp;
  <ni-button type="secondary" disabled>次要按钮</ni-button>&nbsp;
  <ni-button type="text" disabled>文本按钮</ni-button>
</template>
```
:::

## 尺寸

使用 `size` 属性来定义按钮的尺寸。

:::demo
```vue
<template>
  <ni-button type="primary" size="small">小按钮</ni-button>&nbsp;
  <ni-button type="primary" size="medium">中按钮</ni-button>&nbsp;
  <ni-button type="primary" size="large">大按钮</ni-button>
</template>
```
:::

## 块级按钮

使用 `block` 属性来定义按钮是否为块级元素。

:::demo
```vue
<template>
  <ni-button type="primary" block>块级按钮</ni-button>
</template>
```
:::
