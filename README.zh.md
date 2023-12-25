# TwistIcons
English | [简体中文](README.zh.md)

## 使用

### React

```bash
npm i @twist-space/react-icons
```

```jsx
import { IconProvider } from '@twist-space/react-icons'
import { AiAmazonOutlined } from '@twist-space/react-icons/ai'

export default function App() {
  return (
    <IconProvider value={{ size: 30 }}>
      <AiAmazonOutlined rotate={90} />
      <AiAmazonOutlined spin />
      <AiAmazonOutlined size={30} color='blue' />
    </IconProvider>
  )
}

### Vue3

```bash
npm i @twist-space/vue3-icons
```

```vue
<script setup lang="ts">
import { IconProvider } from '@twist-space/vue3-icons'
import { AiAmazonOutlined } from '@twist-space/vue3-icons/ai'
</script>

<template>
  <IconProvider color="blue" :size="100">
    <AiTagTwotone />
  </IconProvider>
  <AiTagTwotone />
  <AiTagTwotone :size="100" @click="onClick" title="razzh" />
  <AiAccountBookFilled :size="30" spin class="twist-aa" :style="{color: 'green'}" />
  <AiLeftCircleFilled :size="100" id="twistzz" />
</template>
```

### Vue2

```bash
npm i @twist-space/vue2-icons
```

```vue
<template>
  <IconProvider :size="20" color="#333">
    <AiAmazonOutlined spin />
    <AiAmazonOutlined :rotate="90" />
    <AiAmazonOutlined :size="30" color='#ccc' />
  </IconProvider>
</template>

<script>
import { IconProvider } from '@twist-space/vue2-icons'
import { AiAmazonOutlined } from '@twist-space/vue2-icons/ai'
export default {
  components: {
    AiAmazonOutlined
  }
}
</script>
```

### Icon API

Icon 组件提供了自定义的 API，如大小，颜色，样式等。

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Size of the icon.      |
| color | `string`           | -       | Color of the icon.     |
| style | `CSSProperties`    | -       | Style of the icon.     |
| class | `string`           | -       | Class of the icon.     |
| title | `string`           | -       | SVG title of the icon.     |
| spin  | `string`           | false   | Spin animation of the icon.  |
| rotate| `string`           | -       | Rotate style of the icon.  |

### IconProvider API

使用 IconProvider 将会影响所有 Icons 组件 prop 的默认值，但是用户传入的 Icons 组件的 prop 值的优先级是大于 IconProvider 的。

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Size of the icon.      |
| color | `string`           | -       | Color of the icon.     |
| style | `CSSProperties`    | -       | Style of the icon.     |
| class | `string`           | -       | Class of the icon.     |
| attrs | `SVGAttributes`    | -       | SVGAttributes of the icon.|
| styleValue | `string`      | -       | StyleValue can custom style tag iconKey value.|

### Thanks

这个项目受到 [react-icons](https://github.com/react-icons/react-icons) and [xicons](https://github.com/07akioni/xicons)
的启发，我从中获益匪浅，感谢🙏热爱开源的维护者们。