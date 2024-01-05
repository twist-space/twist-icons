import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { TwistIconsVueResolver } from '@twist-space/twist-icons-plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: 'src',
      dts: true,
      resolvers: [
        TwistIconsVueResolver({
          version: 'vue3'
        })
      ]
    })
  ]
})
