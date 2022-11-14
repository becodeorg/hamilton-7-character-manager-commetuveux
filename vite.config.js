import { defineConfig } from 'vite'
import { resolve } from 'path'
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
    build: {
        targer: 'esnext',
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                form: resolve(__dirname, "form.html"),
                card: resolve(__dirname, "card.html"),
            }
        }
    },
    base: '/hamilton-7-character-manager-commetuveux/', 
    plugins: [topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: i => `__tla_${i}`
    })
    ],
})