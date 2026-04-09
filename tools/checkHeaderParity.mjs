import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')

function read(relPath) {
  return fs.readFileSync(path.join(repoRoot, relPath), 'utf8')
}

const checks = []

const mainTsx = read('src/allten/runtime/src/view/Main.tsx')
checks.push({
  name: 'All Ten left icon is home',
  ok: /icon="home"/.test(mainTsx),
})
checks.push({
  name: 'All Ten home goes to /puzzles/',
  ok: /window\.location\.href\s*=\s*"\/puzzles\/";/.test(mainTsx),
})
checks.push({
  name: 'All Ten links control still opens links modal',
  ok: /showLinks\(true\)/.test(mainTsx),
})
checks.push({
  name: 'All Ten stats opens via puzzle chrome menu',
  ok: /puzzleChrome=\{\{[\s\S]*onStats:\s*\(\)\s*=>\s*appState\.showStats\(true\)/.test(
    read('src/allten/main.jsx')
  ),
})
checks.push({
  name: 'All Ten help opens via puzzle chrome menu',
  ok: /onHelp:\s*\(\)\s*=>\s*appState\.showHelp\(true\)/.test(read('src/allten/main.jsx')),
})

const suiteFiles = [
  'puzzlegames/scurry/scurry.jsx',
  'puzzlegames/folds/folds.jsx',
  'puzzlegames/sumtiles/sumtiles.jsx',
  'puzzlegames/productiles/productiles.jsx',
  'puzzlegames/factorfall/factorfall.jsx',
  'puzzlegames/clueless/clueless.jsx',
  'puzzlegames/honeycombs/honeycombs.jsx',
]

for (const relPath of suiteFiles) {
  const content = read(relPath)
  checks.push({
    name: `${relPath} uses shared chrome contract`,
    ok: /getGameChrome\(GAME_KEYS\./.test(content),
  })
  checks.push({
    name: `${relPath} uses puzzle chrome menu in header`,
    ok: /puzzleChrome=\{\{/.test(content),
  })
}

const failed = checks.filter((c) => !c.ok)
if (failed.length) {
  console.error('Header parity check failed:')
  for (const check of failed) {
    console.error(`- ${check.name}`)
  }
  process.exit(1)
}

console.log('Header parity check passed.')
