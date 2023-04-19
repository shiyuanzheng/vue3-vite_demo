import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root, '')
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'kkk'
          })
        ]
      }),
      Components({
        resolvers: [
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),

          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            // prefix: 'icon',
            enabledCollections: ['ep', 'material-symbols']
          })
        ]
      }),
      Icons({
        autoInstall: true
      }),
      ElementPlus({
        useSource: true
      }),
      Inspect()
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~/': `${pathSrc}/`
      }
    },
    optimizeDeps: {
      include: ['lodash-es']
    },
    server: {
      overlay: {
        warnings: false,
        errors: false
      },
      open: true,
      port: 8088,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
