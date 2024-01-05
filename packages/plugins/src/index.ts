import { resolveModule } from 'local-pkg'
import { dirname } from 'path'
import { readFileSync } from 'fs'
import type { ComponentResolver } from 'unplugin-vue-components/types'

export type VueResolverOptions = {
  version: 'vue3' | 'vue2'
}

export type TwistVueIconsType = '@twist-space/vue3-icons' | '@twist-space/vue2-icons'

let _cacheIconIdentify: string[]
let module: TwistVueIconsType

function parse(manifest: string) {
  const match = manifest.match(/\[[^\]]*\]/g)
  if (match) {
    return JSON.parse(match[0])
  }

  return []
}

export function resolveIcons(rawName: string, module: string) {
  const name = rawName.toLowerCase()
  const id = _cacheIconIdentify.find((id) => name.startsWith(id))

  if (id) {
    return {
      name: rawName,
      from: `${module}/${id}`
    }
  }

  return undefined
}

export function resolveIconProvider(name: string, module: string) {
  if (name === 'IconProvider') {
    return {
      name,
      from: module
    }
  }

  return undefined
}

export function TwistIconsVueResolver(
  { version }: VueResolverOptions
): ComponentResolver[] {
  try {
    if (!_cacheIconIdentify) {
      module = `@twist-space/${version}-icons`
      const iconPath = resolveModule(module)
      const manifestStr = readFileSync(`${dirname(iconPath)}/IconsManifest.js`, 'utf-8')
      _cacheIconIdentify = parse(manifestStr).map((item) => item.id)
    }
  } catch (error) {
    throw new Error(`[@twist-space/twist-icons-plugins]: failed to load "${module}", have you installed it?`)
  }

  return [
    {
      type: 'component',
      resolve: (name) => resolveIcons(name, module)
    },
    {
      type: 'component',
      resolve: (name) => resolveIconProvider(name, module)
    }
  ]
}
