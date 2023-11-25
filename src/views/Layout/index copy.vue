<template>
  <div class="layout-container">
    <router-view></router-view>
    <div class="tabs">
        <div v-for="tab in tabs" :key="tab.name" class="tab" @click="tabClick(tab.path)" :class="{'active_tab': tab.path == $route.fullPath}">
            <div :class="tab.meta.icon" class="icon"></div>
            <div class="icon-title">{{tab.meta.name}}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
name:'Layout',
created(){
},
data(){
return {
    tabs: this.$router.options.routes[0].children
}    
},
methods:{
    tabClick(path){
        if(this.$route.fullPath != path){
         this.$router.push(path)   
        }
    }
}
}

</script>

<style lang="scss" scoped>
.layout-container{
    background-color: #f5f7f9;
    height: 100%;
.tabs{
    height: 1.3067rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab{
        text-align: center;
        .icon{
        font-size: 40px;
        margin-bottom: 10px;
    }
    .icon-title{
        font-size: 20px;
    }
    }
    .active_tab{
        .icon{
            color: #3296fa;
        }
        .icon-title{
            color: #3296fa;
        }
    }
}
}
</style>