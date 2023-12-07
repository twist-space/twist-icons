import { defineComponent } from 'vue'

const ICONKEY = 'twist-icons-vue3'
const iconCss = `
.twist-icon-loading {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: twist-icon-circle-loading 1s infinite linear;
}

@-webkit-keyframes twist-icon-circle-loading {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`

const findStyleNode = (value: string): HTMLStyleElement | undefined => {
  const head = document.querySelector('head') as HTMLHeadElement

  return Array.from(head.children)
    .filter((node) => node.tagName === 'STYLE')
    .find((node) => node.getAttribute(ICONKEY) === value) as HTMLStyleElement | undefined
}

const insertStyles = (value: string) => {
  const styleTarget = findStyleNode(value)

  if (styleTarget) {
    if (styleTarget.innerHTML !== iconCss) {
      styleTarget.innerHTML = iconCss
    }
    return
  }

  const style = document.createElement('style')
  style.setAttribute('twist-icons-vue3', value)
  style.innerHTML = iconCss
  document.head.appendChild(style)
}

export const UseInsertStyle = defineComponent({
  name: 'InsertStyles',
  setup() {
    insertStyles('@twist-space/vue3-icons-css')
    return () => null
  }
})
