import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        emptyOutDir: true,
        lib: {
            name: 'index',
            entry: resolve(__dirname, './src/index.ts'),
            fileName: 'index.ts',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});