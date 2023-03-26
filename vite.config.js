import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"


export default defineConfig({
    resolve: { alias: { '@': '/src' } },
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
            symbolId: "icon-[dir]-[name]",
            customDomId: "spritesheet",
        }),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.png'],
            manifest: {
                name: "Haven - Score d'habitabilité",
                short_name: 'Haven',
                description: "Haven - Score d'habitabilité",
                theme_color: '#000',
                icons: [
                    {
                        src: 'https://raw.githubusercontent.com/imac-web/haven-client-pwa/main/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/main.scss";`,
            },
        },
        devSourcemap: true,
    },
    base: "/"

})
