# [twist-icons](https://twist-icons-docs.vercel.app/)

[English](README.md) | 简体中文

| package                 | version |
| ------------------------| --------|
| @twist-space/react-icons| [![npm version](https://img.shields.io/npm/v/@twist-space/react-icons.svg)](https://www.npmjs.com/package/@twist-space/react-icons) |
| @twist-space/vue3-icons | [![npm version](https://img.shields.io/npm/v/@twist-space/vue3-icons.svg)](https://www.npmjs.com/package/@twist-space/vue3-icons)|
| @twist-space/vue2-icons | [![npm version](https://img.shields.io/npm/v/@twist-space/vue2-icons.svg)](https://www.npmjs.com/package/@twist-space/vue2-icons)|

Twist-Icons 是一套高质量的 SVG 图标库，它收集了流行的图标，提供了 React、Vue、Vue2 Icons 组件，你可以通过 ES6 的 import 方式轻松使用它们，[这篇文章](https://razzh.vercel.app/posts/twist-icons/)介绍这个项目的由来。

## 开始使用

### React
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

Icon 组件提供了自定义的 API，如大小，颜色，样式等。

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Icon的大小              |
| color | `string`           | -       | Icon的颜色              |
| style | `CSSProperties`    | -       | Icon的样式              |
| className | `string`       | -       | React Icon             |
| class | `string`           | -       | Vue Icon的类名          |
| title | `string`           | -       | SVG title标签           |
| spin  | `string`           | false   | SVG旋转动画              |
| rotate| `string`           | -       | Icon的旋转角度           |

如果你想使用 `spin` 动画，你可以在项目的 `main` 文件中导入并执行 `mountedTwistIconsStyles` 函数，它的作用是在 `head` 标签下插入带有 `animation css` 的 `style` 标签
```tsx
// main file
import { mountedTwistIconsStyles } from '@twist-space/xxx-icons'

mountedTwistIconsStyles()
```

### IconProvider API

使用 IconProvider 将会影响所有 Icons 组件 prop 的默认值，但是用户传入的 Icons 组件的 prop 值的优先级是大于 IconProvider 的。

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Icon的大小              |
| color | `string`           | -       | Icon的颜色              |
| style | `CSSProperties`    | -       | Icon的样式              |
| className | `string`       | -       | React Icon             |
| class | `string`           | -       | Vue Icon的类名          |
| attrs | `SVGAttributes`    | -       | SVG的属性               |

### Auto Import
如果你的项目使用的是Vue3/2，可以使用 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 插件完成组件的自动引入，无需在项目中使用 import 引入 Icon 组件


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
          version: 'vue3' // 'vue2'
        })
      ]
    })
  ]
})
```

> 注意: 如果你使用 Webpack，你只需要转换路径就可以，就像这样：unplugin-vue-components/webpack

### Credits
这个项目受到 [react-icons](https://github.com/react-icons/react-icons) and [xicons](https://github.com/07akioni/xicons)
的启发，项目的图标来源于 [iconify](https://iconify.design/)，我从中获益匪浅。
- [iconify](https://github.com/iconify/iconify)
- [ant-design-icons](https://github.com/ant-design/ant-design-icons)
- [react-icons](https://github.com/react-icons/react-icons)
- [xicons](https://github.com/07akioni/xicons)