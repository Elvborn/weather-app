// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
	// Migrate extends
	...compat.extends('eslint-config-airbnb-base', 'prettier'),
];
