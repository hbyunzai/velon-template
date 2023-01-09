import { antdvStyleDeps } from './antd.optimize';
import { DepOptimizationOptions } from 'vite';

export const optimize = [
	...antdvStyleDeps,
	'@vue/runtime-core',
	'@vue/shared',
	'ant-design-vue/es/locale/zh_CN',
	'ant-design-vue/es/locale/en_US',
	'vue',
	'vue-router',
	'pinia',
	'axios',
	'@vueuse/core',
	'@vueuse/shared',
	'@ant-design/icons-vue',
	'ant-design-vue/es/table',
	'ant-design-vue/es/tree-select',
	'ant-design-vue/es/vc-util/get',
	'ant-design-vue/es/_util/props-util',
	'dayjs',
	'extend'
];

export function createOptimization(): DepOptimizationOptions {
	return {
		include: optimize
	};
}
