import { createVNode, render } from 'vue'
import ClConfirm from './cl-confirm'

const div = document.createElement('div')
div.setAttribute('class', 'cl-confirm-container')
document.body.appendChild(div)

export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    // 点击取消触发的函数
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 点击确认触发的函数
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    const vn = createVNode(ClConfirm, { title, text, cancelCallback, submitCallback })

    // const vn = createVNode(ClConfirm, { title, text, cancelCallback, submitCallback })
    render(vn, div)
  })
}
