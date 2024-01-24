import { execa } from 'execa'
import print from './print'

const packageName = '@iconify/json'

export async function checkIconifyVersion() {
  try {
    const { stdout } = await execa('ncu', ['-f', packageName])
    const lines = stdout.split('\n')
    const newVersion = lines.find((line) => line.startsWith(` ${packageName}`))
    if (newVersion) {
      print.warning(`${packageName} has a new version, now update${newVersion}...`)
      await execa('ncu', ['-u', packageName])
      await execa('pnpm', ['install', packageName])
      return
    }
    print.success(`${packageName} is up to date, start build icons :)`)
  } catch (error) {
    print.error(error)
  }
}
