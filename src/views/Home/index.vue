<template>
    <div class="home-container">
        <!-- 搜索栏 -->
        <van-nav-bar class="home-navbar" fixed>
            <van-button
                slot="title"
                round
                class="search-button"
                color="#5babfb"
                to="/search"
            >
                <i class="icon-12 search-icon" slot="icon"></i
                ><span class="text">搜索</span>
            </van-button>
        </van-nav-bar>
        <!-- 标签栏 -->
        <van-tabs v-model="active" animated swipeable class="tabs" >
            <van-tab v-for="channel in userChannels" :key="channel.id" :title="channel.name" >
                <!-- 内容 -->
                <articleList :channel="channel.id"/></van-tab>
            <div slot="nav-right" class="tabs-right" @click="isChennelEditShow = true">
                <div class="opa">
                </div>
                <i class="icon-3 logo"></i>
            </div>
        </van-tabs>
        <!-- 频道编辑弹出层 -->
            <van-popup
            
  v-model="isChennelEditShow"
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '100%' }"
>
<edit-channels @closeChennelEdit="closeChennelEdit" :userChannels.sync="userChannels" :active.sync="active"/>
</van-popup>
        
    </div>
</template>
<script>
import { getUserChannels } from '@/api/user'
import articleList from '@/components/article-list'
import EditChannels from './components/EditChannels.vue'
import {mapState} from 'vuex'
import {getItem} from '@/utils/storage'


export default {
    name: "Home",
    created(){
        this.getChannels()
    },
    data() {
        return {
            isChennelEditShow: false,
            active: 2,
            userChannels: [],
            tmpChannels: [{"id":0,"name":"推荐"},{"id":1,"name":"html"},{"id":2,"name":"开发者资讯"},{"id":4,"name":"c++"},{"id":6,"name":"css"},{"id":7,"name":"数据库"},{"id":8,"name":"区块链"},{"id":9,"name":"go"},{"id":10,"name":"产品"},{"id":11,"name":"后端"},{"id":12,"name":"linux"}]
        }
    },
    components:{
        articleList,
        EditChannels
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        closeChennelEdit(active){
            this.active = active
            this.isChennelEditShow = false
        },
        async getChannels(){
            if(this.user.userTokens){
                try {
                 const {data} =  await getUserChannels()
                 this.userChannels = data.channels
                // console.log(this.userChannels)
            }
            catch(err){
                if(!err) return
                this.$toast('获取频道列表失败')
            }
            }else{
                const local_channels= getItem('local_channels')
                // console.log('local_channels=',local_channels)
                if(local_channels){
                    this.userChannels = local_channels
                }else{
                    this.userChannels = this.tmpChannels
                }
            }
            
        }
    }
};
</script>
<style lang="scss" scoped>
.home-container {
    .home-navbar {
        box-sizing: border-box;
        padding: 21px 112px 12px 83px;
        height: 97px;
        background-color: #3296fa;

        .search-button {
            height: 64px;
            width: 555px;
            max-width: unset;
            .search-icon {
                width: 32px;
                height: 32px;
            }
            .text {
                font-size: 28px;
            }
        }
    }
    .tabs{
        .tabs-right{
            position: fixed;
            right: 0;
            width: 66px;
            height: 82px;
            
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border-bottom: 1px solid #edeff3;
            
            &::before{
                content: '';
                width: 1px;
                height: 58px;
                background-image: url('~@/assets/img/gradient-gray-line.png');
                position: absolute;
                background-size: contain;
                left: 0;
            }
            .opa{
                background-color: #ffffff;
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0.902;
                 z-index: -1;
            }
            i.logo{
                color: #333333;
            font-size: 33px;
           
            }
        }
    }
}
</style>
<style lang="scss">
.home-container {
    padding:180px 0 99.96px 0;
    box-sizing: border-box;
    height: 100%;
    .home-navbar {
        .van-nav-bar__title {
            max-width: unset;
        }
        .van-button__icon {
            display: flex;
            align-items: center;
        }
        .van-button__text {
            margin-left: 9px;
        }
        .van-nav-bar__content {
            height: unset;
        }
    }
    .tabs {
        .van-tabs__wrap {
            position:fixed;
            top: 97px;
            height: 82px;
            z-index: 1;
            left: 0;
            right: 0;
            .van-tabs__nav {
                padding: 0 66px 0 0;
                .van-tabs__line {
                    top: 68px;
                    width: 31px;
                    height: 6px;
                    background-color: #3296fa;
                    color: #333333;
                }
                .van-tab {
                    min-width: 200px;

                    border-right: 1px solid #edeff3;
                    border-bottom: 1px solid #edeff3;
                    .van-tab__text {
                        font-size: 30px;
                        font-family: "微软雅黑";
                    }
                }
            }
        }
     
    }
}
</style>