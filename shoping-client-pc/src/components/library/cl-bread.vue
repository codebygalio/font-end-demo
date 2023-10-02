<script>
import { h } from 'vue'
export default {
  name: 'ClBread',
  render () {
    const items = this.$slots.default()
    const dymaincItems = []
    items.forEach((item, i) => {
      dymaincItems.push(item)
      if (i < (items.length - 1)) {
        dymaincItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'cl-bread' }, dymaincItems)
  }
}
</script>
<style lang="scss">
.cl-bread {
  display: flex;
  padding: 25px 10px;
  .cl-bread-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: $xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // &:last-child{
    //     display: none;
    // }
  }
}
</style>
