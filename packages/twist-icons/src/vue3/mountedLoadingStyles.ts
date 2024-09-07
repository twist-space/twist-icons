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
  const style = document.createElement('style')
  const id = '__twist-icons-loading-vue3__'
  style.setAttribute('id', `${id}`)
  style.textContent = iconCss

  if (!document.querySelector(`#${id}`)) {
    setTimeout(() => {
      document.head.appendChild(style)
    })
  }
}
