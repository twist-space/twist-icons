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

/**
 * if you want icons loading animation,
 * can use it mounted style to head
 * @zh-CN 如果你想要让icons有loading效果
 * 你可以使用这个函数向head挂在loading动画
 */
export function mountedTwistIconsStyles() {
  // eslint-disable-next-line no-undef
  const style = document.createElement('style')
  const id = '__twist-icons-loading-vue2__'
  style.setAttribute('id', `${id}`)
  style.textContent = iconCss

  // eslint-disable-next-line no-undef
  if (!document.querySelector(`#${id}`)) {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      document.head.appendChild(style)
    })
  }
}
