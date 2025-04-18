import { execa } from 'execa'
import { spinner } from './utils'

const packageName = '@iconify/json'

export async function checkIconifyVersion() {
  const s = spinner(`Check ${packageName} version`).start()
  try {
    const { stdout } = await execa('ncu', ['-f', packageName])
    const lines = stdout.split('\n')
    const newVersion = lines.find((line) => line.startsWith(` ${packageName}`))
    if (newVersion) {
      s.warn(`${packageName} has a new version, now update${newVersion}...`)
      await execa('ncu', ['-u', packageName])
      await execa('pnpm', ['install', '--force'])
      s.succeed(`${newVersion} update successfully!`)
      return
    }
    s.succeed(`${packageName} is up to date, start build icons :)`)
  } catch (error) {
    s.fail(error)
    throw error
  }
}
