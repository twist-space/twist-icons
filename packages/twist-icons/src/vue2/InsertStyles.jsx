const ICONKEY = 'twist-icons-vue2'
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

export function findStyleNode(value) {
  // eslint-disable-next-line no-undef
  const head = document.querySelector('head')

  return Array.from(head.children)
    .filter((node) => node.tagName === 'STYLE')
    .find((node) => node.getAttribute(ICONKEY) === value)
}

export function insertStyles(value) {
  const styleTarget = findStyleNode(value)

  if (styleTarget) {
    if (styleTarget.innerHTML !== iconCss) {
      styleTarget.innerHTML = iconCss
    }
    return
  }

  // eslint-disable-next-line no-undef
  const style = document.createElement('style')
  style.setAttribute('twist-icons-vue2', value)
  style.innerHTML = iconCss
  // eslint-disable-next-line no-undef
  document.head.appendChild(style)
}
