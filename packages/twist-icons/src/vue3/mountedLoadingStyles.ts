const iconCss = `
.twist-vue3-icon--spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: twist-vue3-icon-circle--spin 1s infinite linear;
}

@-webkit-keyframes twist-vue3-icon-circle--spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`

/**
 * if you want icons spin animation,
 * can use it mounted style to head
 * @zh-CN 如果你想要让icons有spin效果
 * 你可以使用这个函数向head挂在spin动画
 */
export function mountedTwistIconsStyles() {
  const style = document.createElement('style')
  const id = '__twist-vue3-icons-spin__'
  style.setAttribute('id', `${id}`)
  style.textContent = iconCss

  if (!document.querySelector(`#${id}`)) {
    setTimeout(() => {
      document.head.appendChild(style)
    })
  }
}
