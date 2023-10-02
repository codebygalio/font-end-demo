<template>
<ClBread>
        <ClBreadItem to="/">首页</ClBreadItem>
        <Transition name="fade-right">
        <ClBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</ClBreadItem>
        </Transition>
        <Transition name="fade-right">
        <ClBreadItem v-if="category.sub">{{category.sub.name}}</ClBreadItem>
        </Transition>

      </ClBread>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup () {
    const route = useRoute()
    const store = useStore()
    const category = computed(() => {
      const cate = {}
      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })
    return { category }
  }
}
</script>
<style lang="scss" scoped>

</style>
