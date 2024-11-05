import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import { execa } from 'execa'
import minimist from 'minimist'

interface BuildOptions {
  watch: boolean;
}
const rootDir = resolve(fileURLToPath(import.meta.url), '../..')

const bin = (name: string) => resolve(rootDir, `node_modules/.bin/${name}`)

async function main() {
  const { watch } = minimist<BuildOptions>(process.argv.slice(2))

  if (watch) {
    await execa(bin('tsup'), ['src/index.ts', '--dts', '--format', 'cjs,esm', '--watch'], {
      stdio: 'inherit'
    })
    return
  }

  await execa(bin('tsup'), ['src/index.ts', '--dts', '--format', 'cjs,esm'], {
    stdio: 'inherit'
  })
}

main().catch((error) => {
  console.error(chalk.red(error))
  process.exit(1)
})
