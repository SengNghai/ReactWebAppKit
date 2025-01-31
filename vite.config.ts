/// <reference lib="webworker" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path'
// 生产还是开发
// const mode = 'production'
// 类型声明
declare let self: ServiceWorkerGlobalScope & typeof globalThis;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      mode: 'development',
      base: '/',
      manifest: {
        name: 'PwaApps',
        short_name: 'PWA应用',
        description: 'PWA应用IOS/Android/H5/桌面快捷方式/通知/下载快捷方式/离线访问/缓存/PWA/PWA应用/PWA应用IOS/PWA应用Android/PWA应用H5/PWA应用桌面快捷方式/PWA应用通知/PWA应用下载快捷方式/PWA应用离线访问/PWA应用缓存',
        theme_color: "#000000",
        icons: [
          //添加图标， 注意路径和图像像素正确
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'], //缓存相关静态资源
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 天
              }
            }
          }
        ]
        // runtimeCaching: [
        //   // 配置自定义运行时缓存
        //   mode !== 'production'
        //     ? {
        //       urlPattern: ({ url }) =>
        //         url.origin === 'https://app-api-0.com',
        //       handler: 'NetworkFirst',
        //       options: {
        //         cacheName: 'wisbayar-api',
        //         cacheableResponse: {
        //           statuses: [200],
        //         },
        //       },
        //     }
        //     : {
        //       urlPattern: ({ url }) =>
        //         url.origin === 'https://app-api.id',
        //       handler: 'NetworkFirst',
        //       options: {
        //         cacheName: 'wisbayar-api',
        //         cacheableResponse: {
        //           statuses: [200],
        //         },
        //       },
        //     },
        //   {
        //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        //     handler: 'CacheFirst',
        //     options: {
        //       cacheName: 'wisbayar-images',
        //       expiration: {
        //         // 最多30个图
        //         maxEntries: 30,
        //       },
        //     },
        //   },
        //   {
        //     urlPattern: /.*\.js.*/,
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'wisbayar-js',
        //       expiration: {
        //         maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
        //         maxAgeSeconds: 30 * 24 * 60 * 60,
        //       },
        //       cacheableResponse: {
        //         statuses: [200],
        //       },
        //     },
        //   },
        //   {
        //     urlPattern: /.*\.css.*/,
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'wisbayar-css',
        //       expiration: {
        //         maxEntries: 20,
        //         maxAgeSeconds: 30 * 24 * 60 * 60,
        //       },
        //       cacheableResponse: {
        //         statuses: [200],
        //       },
        //     },
        //   },
        //   {
        //     urlPattern: /.*\.html.*/,
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'wisbayar-html',
        //       expiration: {
        //         maxEntries: 20,
        //         maxAgeSeconds: 30 * 24 * 60 * 60,
        //       },
        //       cacheableResponse: {
        //         statuses: [200],
        //       },
        //     },
        //   },
        // ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
