<template>
    <div class="home-new" ref="target">
        <homePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
            <template #right>
                <clMore path="/" />
            </template>
            <transition name="fade">
                <ul v-if="goods.length" class="goods-list">
                    <li v-for="item in goods" :key="item.id">
                        <RouterLink :to="`/product/${item.id}`">
                            <img :src="item.picture" alt="" />
                            <p class="name ellipsis">{{ item.name }}</p>
                            <p class="price">&yen;{{ item.price }}</p>
                        </RouterLink>
                    </li>
                </ul>
                <HomeSkeleton bg="#f0f9f4" v-else />
            </transition>
        </homePanel>
    </div>
</template>
<script>
import { useLazyData } from '@/hooks/index.js'
import HomeSkeleton from './home-skeleton'
import homePanel from './home-panel'
import { findNew } from '@/api/home'
export default {
  components: {
    homePanel,
    HomeSkeleton
  },
  setup () {
    // const goods = ref([])

    // findNew().then((data) => {
    //   goods.value = data.result
    // })
    const { target, result } = useLazyData(findNew)
    return { goods: result, target }
  }
}
</script>
<style lang="scss" scoped>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;
    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        @include hoverShadow();
        img {
            width: 306px;
            height: 306px;
        }
        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }
        .price {
            color: $priceColor;
        }
    }
}
</style>
