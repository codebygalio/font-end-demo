// import ClSkeleton from './cl-skeleton'
// import ClCarousel from './cl-carousel'
// import ClMore from './cl-more'
import defaultError from '@/assets/images/200.png'
import Message from './Message'
import Confirm from './Confirm'
// import ClBread from '@/components/library/cl-bread'
// import ClBreadItem from '@/components/library/cl-bread-item'

const importFn = require.context('./', false, /\.vue$/)
// console.log(importFn.keys())
export default {
  install (app) {
    // app.component(ClSkeleton.name, ClSkeleton)
    // app.component(ClCarousel.name, ClCarousel)
    // app.component(ClMore.name, ClMore)
    // app.component(ClBread.name, ClBread)
    // app.component(ClBreadItem.name, ClBreadItem)
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      app.component(component.name, component)
    })
    defineDirective(app)
    app.config.globalProperties.$Message = Message
    app.config.globalProperties.$Message = Confirm
  }
}

const defineDirective = (app) => {
  app.directive('lazy', {
    mounted (el, binding) {
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observe.unobserve(el)
          el.src = binding.value
          el.onerror = () => {
            el.src = defaultError
          }
        }
      }, { threshold: 0 })
      observe.observe(el)
    }
  })
}
