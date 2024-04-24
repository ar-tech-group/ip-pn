import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

/**
 * Конфигурация приложения.
 *
 * @link https://vitejs.dev/config/
 */
export default ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base:    '',
        plugins: [
            vue(),
            svgLoader(),
            eslintPlugin({ cache: false }),
        ],
        build: {
            minify:            'terser',
            assetsInlineLimit: 1024,
            sourcemap:         'hidden'
        },
        resolve: {
            alias: [
                {
                    find:        '@',
                    replacement: resolve(__dirname, 'src')
                }
            ]
        },
        css: {
            preprocessorOptions: {
                css:  { charset: false },
                scss: {
                    sassOptions: {
                        outputStyle: 'expanded',
                    },
                    charset:        false,
                    additionalData: `
                        @import "@/styles/_variables.scss";
                        @import "@/styles/_mixins.scss";
                    `
                },
            },
        },
    });
};
