/* eslint-disable no-console */
import { red, green, cyan, blue, yellow } from 'kolorist'

const print = {
  error(msg) {
    console.log(red(msg))
  },
  success(msg) {
    console.log(green(msg))
  },
  cyan(msg) {
    console.log(cyan(msg))
  },
  blue(msg) {
    console.log(blue(msg))
  },
  warning(msg) {
    console.log(yellow(msg))
  }
}

export default print
