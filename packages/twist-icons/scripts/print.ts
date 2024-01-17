/* eslint-disable no-console */
import { red, green, cyan, blue, yellow, lightMagenta } from 'kolorist'

const print = {
  error(msg: string) {
    console.log(red(msg))
  },
  success(msg: string) {
    console.log(green(msg))
  },
  cyan(msg: string) {
    console.log(cyan(msg))
  },
  blue(msg: string) {
    console.log(blue(msg))
  },
  lightMagenta(msg: string) {
    console.log(lightMagenta(msg))
  },
  warning(msg: string) {
    console.log(yellow(msg))
  }
}

export default print
