import { register } from 'node:module'

register(new URL('./sharedContractsResolveHook.mjs', import.meta.url).href)
