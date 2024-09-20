# twist-icons-plugins
if you use [twist-icons](https://github.com/twist-space/twist-icons) in `Vue3/2`, you can use the [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) plugin to automatically import components without using import icon component in the project.

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { TwistIconsVueResolver } from '@twistify/twist-icons-plugins'

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