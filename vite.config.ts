import { defineConfig, loadEnv } from 'vite';
import { wrapperEnv, createOptimization, BuildFactory, createProxy, PluginsFactory } from './build';

export default defineConfig(configEnv => {
	const env: ImportMetaEnv = wrapperEnv(loadEnv(configEnv.mode, process.cwd()));
	return {
		server: {
			https: env.VITE_USE_HTTPS,
			host: true,
			port: env.VITE_SERVER_PORT,
			cors: true,
			proxy: createProxy(env.VITE_USE_PROXY_OPTIONS)
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					modifyVars: {
						'root-entry-name': 'variable'
					}
				}
			}
		},
		optimizeDeps: createOptimization(),
		plugins: PluginsFactory.importMetaEnv(env).plugins(),
		build: BuildFactory.importMetaEnv(env).options(),
		esbuild: BuildFactory.importMetaEnv(env).esOptions()
	};
});
