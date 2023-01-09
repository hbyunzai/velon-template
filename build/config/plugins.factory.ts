import type {PluginOption} from 'vite';
import vue from '@vitejs/plugin-vue';
import {viteMockServe} from 'vite-plugin-mock';
import VueMacros from 'unplugin-vue-macros/vite';
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import {PathUtil} from '../utils';
import AutoImport from 'unplugin-auto-import/vite';
import compressPlugin from 'vite-plugin-compression';
import VitePluginCertificate from 'vite-plugin-mkcert';
import {VitePWA} from 'vite-plugin-pwa';
import path from 'path';
import {createHtmlPlugin} from 'vite-plugin-html';
import Icons from 'unplugin-icons/vite';
import {FileSystemIconLoader} from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import topLevelAwait from "vite-plugin-top-level-await";

export class PluginsFactory {
    private static env: ImportMetaEnv;

    private static pluginList: PluginOption[] = [];

    public static importMetaEnv(env: ImportMetaEnv): typeof PluginsFactory {
        this.env = env;
        this.create();
        return this;
    }

    public static plugins(): PluginOption[] {
        return this.pluginList;
    }

    private static create(): void {
        this.setupMacros();
        this.setupVue();
        this.setupTopLevel();
        this.setupIcon();
        this.setupComponents();
        this.setupImports();
        this.setupMock();
        this.setupCompress();
        this.setupHttps();
        this.setupLegacy();
        this.setupPWA();
        this.setupHtml();
    }

    private static setupTopLevel(): void {
        this.pluginList.push(topLevelAwait({
            // The export name of top-level await promise for each chunk module
            promiseExportName: "__tla",
            // The function to generate import names of top-level await promise in each chunk module
            promiseImportName: i => `__tla_${i}`
        }))
    }

    private static setupIcon(): void {
        let localIconPath = path.resolve(PathUtil.getSrcPath(), 'assets/svg-icon');
        const collectionName = this.env.VITE_ICON_LOCAL_PREFIX.replace(`${this.env.VITE_ICON_PREFIX}-`, '');
        this.pluginList.push(
            Icons({
                compiler: 'vue3',
                customCollections: {
                    [collectionName]: FileSystemIconLoader(localIconPath)
                },
                scale: 1,
                defaultClass: 'inline-block'
            })
        );
        this.pluginList.push(
            createSvgIconsPlugin({
                iconDirs: [localIconPath],
                symbolId: `${this.env.VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
                inject: 'body-last',
                customDomId: '__SVG_ICON_LOCAL__'
            })
        );
    }

    private static setupHtml(): void {
        let entry = '/src/main.ts';
        const html = createHtmlPlugin({
            entry
        });
        this.pluginList.push(html);
    }

    private static setupPWA(): void {
        if (this.env.VITE_USE_PWA) {
            this.pluginList.push(
                VitePWA({
                    registerType: 'autoUpdate',
                    includeAssets: ['favicon.ico'],
                    manifest: {
                        name: this.env.VITE_APP_NAME,
                        short_name: this.env.VITE_APP_SHORT_NAME,
                        theme_color: '#fff',
                        icons: [
                            {
                                src: '/logo.png',
                                sizes: '192x192',
                                type: 'image/png'
                            },
                            {
                                src: '/logo.png',
                                sizes: '512x512',
                                type: 'image/png'
                            },
                            {
                                src: '/logo.png',
                                sizes: '512x512',
                                type: 'image/png',
                                purpose: 'any maskable'
                            }
                        ]
                    }
                })
            );
        }
    }

    private static setupLegacy(): void {
        if (this.env.VITE_USE_LEGACY) {
            console.warn('legacy is not implements vite@3');
        }
    }

    private static setupHttps(): void {
        if (this.env.VITE_USE_HTTPS) {
            this.pluginList.push(
                VitePluginCertificate({
                    source: 'coding'
                })
            );
        }
    }

    private static setupCompress(): void {
        if (this.env.VITE_USE_COMPRESS) {
            const compress: PluginOption[] = [];
            if (this.env.VITE_USE_COMPRESS_TYPE === 'gzip') {
                compress.push(
                    compressPlugin({
                        ext: '.gz',
                        algorithm: 'gzip',
                        deleteOriginFile: this.env.VITE_USE_COMPRESS_DELETE_ORIGIN
                    })
                );
            } else if (this.env.VITE_USE_COMPRESS_TYPE === 'brotli') {
                compress.push(
                    compressPlugin({
                        ext: '.br',
                        algorithm: 'brotliCompress',
                        deleteOriginFile: this.env.VITE_USE_COMPRESS_DELETE_ORIGIN
                    })
                );
            }
            compress.forEach(c => this.pluginList.push(c));
        }
    }


    private static setupImports(): void {
        const imports = AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            eslintrc: {
                enabled: true,
                filepath: path.resolve(PathUtil.getSrcPath(), '.eslintrc-auto-import.json'),
                globalsPropValue: true
            },
            dts: path.resolve(PathUtil.getSrcPath(), 'auto-imports.d.ts')
        });
        this.pluginList.push(imports);
    }

    private static setupComponents(): void {
        const collectionName = this.env.VITE_ICON_LOCAL_PREFIX.replace(`${this.env.VITE_ICON_PREFIX}-`, '');
        const components = Components({
            dts: path.resolve(PathUtil.getSrcPath(), 'components.d.ts'),
            types: [{from: 'vue-router', names: ['RouterLink', 'RouterView']}],
            resolvers: [
                AntDesignVueResolver({
                    resolveIcons: true,
                    importStyle: 'less'
                }),
                IconsResolver({customCollections: [collectionName], componentPrefix: this.env.VITE_ICON_PREFIX})
            ]
        });
        this.pluginList.push(components);
    }

    private static setupMacros(): void {
        this.pluginList.push(VueMacros({}));
    }

    private static setupVue(): void {
        this.pluginList.push(vue());
    }

    private static setupMock(): void {
        if (this.env.VITE_USE_MOCK) {
            const mock = viteMockServe({
                ignore: /^\\_/,
                mockPath: 'mock',
                localEnabled: true,
                prodEnabled: true,
                injectCode: `
      	  import { setupProdMockServer } from '../mock/index';
          setupProdMockServer();
        `
            });
            this.pluginList.push(mock);
        }
    }
}
