import path from 'path'
import { execa } from 'execa'
import { spinner } from './utils'

const packageName = '@iconify/json'
// ncu updates the package.json in cwd. @iconify/json belongs to this package,
// which is also the cwd pnpm uses for these scripts (`pnpm -C ./packages/twist-icons`).
const packageDir = path.resolve(__dirname, '..')

async function checkIconifyVersion() {
  const s = spinner(`Check ${packageName} version`).start()
  try {
    const { stdout } = await execa('ncu', ['-f', packageName], {
      cwd: packageDir
    })
    const lines = stdout.split('\n')
    const newVersion = lines.find((line) => line.startsWith(` ${packageName}`))
    if (newVersion) {
      s.warn(`${packageName} has a new version, now update${newVersion}...`)
      await execa('ncu', ['-u', packageName], {
        cwd: packageDir
      })
      await execa('pnpm', ['install', '--force'], {
        cwd: packageDir
      })
      s.succeed(`${newVersion} update successfully!`)
      return
    }
    s.succeed(`${packageName} is up to date, start build icons :)`)
  } catch (error) {
    s.fail(error)
    throw error
  }
}

checkIconifyVersion()
