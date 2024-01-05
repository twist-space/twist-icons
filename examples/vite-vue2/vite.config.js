import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { TwistIconsVueResolver } from '@twist-space/twist-icons-plugins'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: 'src',
      dts: 'src/components.d.ts',
      transformer: 'vue2',
      resolvers: [
        TwistIconsVueResolver(
          { version: 'vue2' }
        )
      ]
    })
  ]
})
