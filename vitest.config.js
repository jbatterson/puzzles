import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['shared-contracts/__tests__/**/*.test.js'],
	},
})
