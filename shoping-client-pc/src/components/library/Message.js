import { createVNode, render } from 'vue'
import ClMessage from './cl-message'

const div = document.createElement('div')
div.setAttribute('class', 'cl-message-container')
document.body.appendChild(div)

let timer = null
export default ({ type, text }) => {
  const vnode = createVNode(ClMessage, { type, text })
  render(vnode, div)
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
