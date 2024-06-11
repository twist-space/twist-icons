# [twist-icons](https://twist-icons-docs.vercel.app/)

English | [简体中文](README.zh.md)

| package                 | version |
| ------------------------| --------|
| @twist-space/react-icons| [![npm version](https://img.shields.io/npm/v/@twist-space/react-icons.svg)](https://www.npmjs.com/package/@twist-space/react-icons) |
| @twist-space/vue3-icons | [![npm version](https://img.shields.io/npm/v/@twist-space/vue3-icons.svg)](https://www.npmjs.com/package/@twist-space/vue3-icons)|
| @twist-space/vue2-icons | [![npm version](https://img.shields.io/npm/v/@twist-space/vue2-icons.svg)](https://www.npmjs.com/package/@twist-space/vue2-icons)|

Twist-Icons is a set of high-quality SVG icon libraries. It collection popular Icons provide React、Vue and Vue2 Icons component, you can easy use them with ES6 import.

## Usage

### For React
[Live Demo](https://stackblitz.com/edit/vitejs-vite-ewd62r?file=src%2FApp.tsx)

```bash
npm i @twist-space/react-icons
```


```jsx
import { IconProvider } from '@twist-space/react-icons'
import { AiThunderboltFilled } from '@twist-space/react-icons/ai'
import { TiModeDark } from '@twist-space/react-icons/ti'

export default function App() {
  return (
    <IconProvider value={{ size: 60 }}>
      <AiThunderboltFilled color="#906efe" />
      <TiModeDark size={30} />
    </IconProvider>
  )
}
```

### For Vue3
[Live Demo](https://stackblitz.com/edit/vitejs-vite-zdrkec?file=src%2FApp.vue)

```bash
npm i @twist-space/vue3-icons
```


```vue
<script setup lang="ts">
import { IconProvider } from '@twist-space/vue3-icons'
import { AiThunderboltFilled } from '@twist-space/vue3-icons/ai'
import { TiModeDark } from '@twist-space/vue3-icons/ti'
</script>

<template>
  <IconProvider :size="60">
    <AiThunderboltFilled color="#906efe" />
    <TiModeDark :size="30" />
  </IconProvider>
</template>
```

### For Vue2
[Live Demo](https://stackblitz.com/edit/vite-vue2-wjkj4-rkkun1?file=src%2FApp.vue)

```bash
npm i @twist-space/vue2-icons
```

```vue
<template>
  <IconProvider :size="60">
    <AiThunderboltFilled color="#906efe" />
    <TiModeDark :size="30" />
  </IconProvider>
</template>

<script>
import { IconProvider } from '@twist-space/vue2-icons'
import { AiThunderboltFilled } from '@twist-space/vue2-icons/ai'
import { TiModeDark } from '@twist-space/vue2-icons/ti'
export default {
  components: {
    IconProvider,
    AiThunderboltFilled,
    TiModeDark,
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

### Auto Import
If your project use Vue3/2, you can use the [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) plugin to automatically import components without using import icon component in the project.

```bash
npm i unplugin-vue-components @twist-space/twist-icons-plugins -D
```

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { TwistIconsVueResolver } from '@twist-space/twist-icons-plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        TwistIconsVueResolver({
          version: 'vue3' // or vue2
        })
      ]
    })
  ]
})
```

> Note: The above content using unplugin plugins is also applicable to Webpack, you only need to switch the path of the plugin introduction.

### Thanks

This project inspired by [react-icons](https://github.com/react-icons/react-icons) and [xicons](https://github.com/07akioni/xicons). The project Icons source from [iconify](https://iconify.design/), I learned a lot from it, thanks these project maintainers!