# TwistIcons
English | [简体中文](README.zh.md)

## Usage

### For React

```bash
npm i @twist-space/react-icons
```


```tsx
import { IconContext } from '@twist-space/react-icons'
import { AiAmazonOutlined } from '@twist-space/react-icons/ai'

export default function App() {
  return (
    <IconContext.Provider value={{ size: 30 }}>
      <AiAmazonOutlined rotate={90} />
      <AiAmazonOutlined spin />
      <AiAmazonOutlined size={30} color='blue' />
    </IconContext.Provider>
  )
}
```

### For Vue3

```bash
npm i @twist-space/vue3-icons
```


```ts
<script setup lang="ts">
import { useProvideIconContext } from '@twist-space/vue3-icons'
import { AiAmazonOutlined } from '@twist-space/vue3-icons/ai'

useProvideIconContext({
  color: '#333',
  size: 20
})
</script>
<template>
  <div>
    <AiAmazonOutlined spin />
    <AiAmazonOutlined :rotate="90" />
    <AiAmazonOutlined :size="30" color='#ccc' />
  </div>
</template>
```

### For Vue2

```bash
npm i @twist-space/vue2-icons
```


```html
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
| size  | `number`           | -       | Size of the icon.      |
| color | `string`           | -       | Color of the icon.     |
| style | `CSSProperties`    | -       | Style of the icon.     |
| class | `string`           | -       | Class of the icon.     |
| title | `string`           | -       | SVG title of the icon.     |
| spin  | `string`           | false   | Spin animation of the icon.  |
| rotate| `string`           | -       | Rotate style of the icon.  |

### IconProvider API

IconProvider will affect all the descendant Icons' default prop value, but the priority less than icon component user props.

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Size of the icon.      |
| color | `string`           | -       | Color of the icon.     |
| style | `CSSProperties`    | -       | Style of the icon.     |
| class | `string`           | -       | Class of the icon.     |
| attrs | `SVGAttributes`    | -       | SVGAttributes of the icon.|
| styleValue | `string`      | -       | StyleValue can custom style tag iconKey value.|

### Thanks

This project inspired by [react-icons](https://github.com/react-icons/react-icons) and [xicons](https://github.com/07akioni/xicons). I learned a lot from it, thanks the project maintainers!