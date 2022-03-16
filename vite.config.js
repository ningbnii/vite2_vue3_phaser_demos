import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import px2vp from 'postcss-px2vp'
import fs from 'fs'

const vantStyleImport = () => {
  const libraryName = 'vant'
  return styleImport({
    libs: [
      {
        libraryName,
        esModule: true,
        resolveStyle(name) {
          return `${libraryName}/es/${name}/style`
        },
      },
    ],
  })
}

export default ({ mode }) =>
  defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_BASEURL,
    // 大佬方案https://juejin.cn/post/6961737808339795975
    css: {
      postcss: {
        plugins: [
          px2vp({
            viewportWidth(rule) {
              const file = rule.source?.input.file
              if (file?.includes('vant')) return 375
              return 750
            },
          }),
        ],
      },
    },
    plugins: [vue(), vantStyleImport()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      https: false,
      open: true,
    },
    https: {
      key: fs.readFileSync('.cert/key.pem'),
      cert: fs.readFileSync('.cert/cert.pem'),
    },
    build: {
      chunkSizeWarningLimit: 1500,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
      },
    },
  })
