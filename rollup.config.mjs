import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/event-dispatcher.js',
				sourcemap: true,
				format: 'umd',
				name: 'EVENT_DISPATCHER',
			},
			{
				file: 'dist/event-dispatcher.min.js',
				sourcemap: true,
				format: 'umd',
				name: 'EVENT_DISPATCHER',
				plugins: [
					terser(),
				],
			},
		],
		plugins: [
			resolve({
				browser: true,
			}),
			commonjs(),
			typescript({
				sourceMap: true,
				inlineSources: true,
			}),
		],
	},
	{
		input: "./dist/index.d.ts",
		output: [{ file: "dist/event-dispatcher.d.ts", format: "es" }],
		plugins: [
			dts(),
			del({ hook: "buildEnd", targets: ["./dist/*.d.ts", "./dist/*/"] }),
		],
	},
];