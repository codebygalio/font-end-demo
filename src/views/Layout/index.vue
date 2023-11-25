<template>
    <div class="layout-container">
        <router-view></router-view>
       <!-- 标签栏 -->
        <van-tabbar
            class="layout-tabbar"
            active-color="#3296fa"
            inactive-color="#707070"
            route
        >
            <van-tabbar-item  :to="{name: 'Home'}"><i slot="icon" class="icon icon-11"></i
                ><span class="title">首页</span></van-tabbar-item
            >
            <van-tabbar-item to="/qa"
                ><i slot="icon" class="icon icon-13"></i
                ><span class="title">问答</span></van-tabbar-item
            >
            <van-tabbar-item to="/video"
                ><i slot="icon" class="icon icon-8"></i
                ><span class="title">视频</span></van-tabbar-item
            >
            <van-tabbar-item to="/my"
                ><i slot="icon" class="icon icon-14"></i
                ><span class="title">{{user.userTokens ? '我的' : '未登录'}}</span></van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "Layout",
    created() {},
    data() {
        return {};
    },
    
    methods: {},
    computed:{
        ...mapState(['user'])
    }
};
</script>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
    .layout-tabbar {
        .icon {
            width: 40px;
            height: 40px;
        }
        .title {
            font-size: 20px;
            font-family: "微软雅黑";
        }
    }
}
</style>