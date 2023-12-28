# TwistIcons
English | [简体中文](README.zh.md)

## Usage

### For React

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
```

### For Vue3

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

### For Vue2

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

An universal icon component is provided for customizing color & size of the inner SVG icon.

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Size of the icon       |
| color | `string`           | -       | Color of the icon      |
| style | `CSSProperties`    | -       | Style of the icon      |
| class | `string`           | -       | Class of the icon      |
| title | `string`           | -       | SVG title of the icon  |
| spin  | `string`           | false   | Spin animation of the icon |
| rotate| `string`           | -       | Rotate style of the icon |

### IconProvider API

IconProvider will affect all the descendant Icons' default prop value, but the priority less than icon component user props.

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Size of the icon       |
| color | `string`           | -       | Color of the icon      |
| style | `CSSProperties`    | -       | Style of the icon      |
| class | `string`           | -       | Class of the icon      |
| attrs | `SVGAttributes`    | -       | SVGAttributes of the icon |
| styleValue | `string`      | -       | StyleValue can custom style tag iconKey value |

### Thanks

This project inspired by [react-icons](https://github.com/react-icons/react-icons) and [xicons](https://github.com/07akioni/xicons). I learned a lot from it, thanks these project maintainers!