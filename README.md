# [twist-icons](https://twist-icons-docs.vercel.app/)

English | [简体中文](README.zh.md)

| package                 | version |
| ------------------------| --------|
| @twistify/react-icons| [![npm version](https://img.shields.io/npm/v/@twistify/react-icons.svg)](https://www.npmjs.com/package/@twistify/react-icons) |
| @twistify/vue3-icons | [![npm version](https://img.shields.io/npm/v/@twistify/vue3-icons.svg)](https://www.npmjs.com/package/@twistify/vue3-icons)|
| @twistify/vue2-icons | [![npm version](https://img.shields.io/npm/v/@twistify/vue2-icons.svg)](https://www.npmjs.com/package/@twistify/vue2-icons)|
| @twistify/icons-plugin | [![npm version](https://img.shields.io/npm/v/@twistify/icons-plugin.svg)](https://www.npmjs.com/package/@twistify/icons-plugin)|

## Usage

### For React
[Live Demo](https://stackblitz.com/edit/vitejs-vite-ewd62r?file=src%2FApp.tsx)

```bash
npm i @twistify/react-icons
```


```jsx
import { IconProvider } from '@twistify/react-icons'
import { AiThunderboltFilled } from '@twistify/react-icons/ai'
import { TiModeDark } from '@twistify/react-icons/ti'

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
npm i @twistify/vue3-icons
```


```vue
<script setup lang="ts">
import { IconProvider } from '@twistify/vue3-icons'
import { AiThunderboltFilled } from '@twistify/vue3-icons/ai'
import { TiModeDark } from '@twistify/vue3-icons/ti'
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
npm i @twistify/vue2-icons
```

```vue
<template>
  <IconProvider :size="60">
    <AiThunderboltFilled color="#906efe" />
    <TiModeDark :size="30" />
  </IconProvider>
</template>

<script>
import { IconProvider } from '@twistify/vue2-icons'
import { AiThunderboltFilled } from '@twistify/vue2-icons/ai'
import { TiModeDark } from '@twistify/vue2-icons/ti'
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
| spin  | `boolean`           | false   | Spin animation of the icon |
| rotate| `string`           | -       | Rotate style of the icon |

if you want use spin animation, you can import `mountedTwistIconsStyles` function call it in main files, it can mounted `animation css` style tag to head.

```tsx
// main file
import { mountedTwistIconsStyles } from '@twistify/xxx-icons'

mountedTwistIconsStyles()
```

### IconProvider API

IconProvider will affect all the descendant Icons' default prop value, but the priority less than icon component user props.

#### React IconProvider API

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Size of the icon       |
| color | `string`           | -       | Color of the icon      |
| style | `CSSProperties`    | -       | Style of the icon      |
| class | `string`           | -       | Class of the icon      |
| attrs | `SVGAttributes`    | -       | SVGAttributes of the icon |

#### Vue IconProvider API

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `number`           | -       | Size of the icon       |
| color | `string`           | -       | Color of the icon      |

### Auto Import
If your project use Vue3/2, you can use the [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) plugin to automatically import components without using import icon component in the project.

```bash
npm i unplugin-vue-components @twistify/icons-plugin -D
```

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { TwistIconsVueResolver } from '@twistify/icons-plugin'

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

## Migrating to @twistify
To improved ease of use and efficiency, the `@twist-space` namespace migrate to `@twistify`.

### Why the Change?

The primary reason for this migration is to simplify the typing and usage experience. The `@twistify` namespace eliminates the hyphen **(-)** present in `@twist-space`, making it quicker and more convenient to input, especially during frequent development tasks. This small change helps streamline workflows, reducing the potential for typing errors and saving time.

### What’s Changing?

- Old Packages:
  - @twist-space/react-icons
  - @twist-space/vue3-icons
  - @twist-space/vue2-icons
  - @twist-space/twist-icons-plugin
- New Packages:
  - @twistify/react-icons
  - @twistify/vue3-icons
  - @twistify/vue2-icons
  - @twistify/icons-plugin

### Credits

This project inspired by `react-icons`、`xicons`、`ant-design-icons`. The project Icons source from `iconify`, I learned a lot from it.
- [iconify](https://github.com/iconify/iconify)
- [ant-design-icons](https://github.com/ant-design/ant-design-icons)
- [react-icons](https://github.com/react-icons/react-icons)
- [xicons](https://github.com/07akioni/xicons)