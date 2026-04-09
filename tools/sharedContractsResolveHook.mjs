/**
 * Custom resolve hook so `node --import ./tools/registerSharedContractsResolve.mjs`
 * can load puzzlegames that import `@shared-contracts/…` (mirrors Vite/Webpack alias).
 */
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@shared-contracts/')) {
    const rel = specifier.slice('@shared-contracts/'.length)
    const filePath = path.join(repoRoot, 'shared-contracts', rel)
    return { url: pathToFileURL(filePath).href, shortCircuit: true }
  }
  return nextResolve(specifier, context)
}
