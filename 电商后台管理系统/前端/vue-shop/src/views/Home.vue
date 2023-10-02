<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-left">
        <img src="../assets/main_logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <div class="header-right">
        <el-button type="info" @click="loginout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 导航菜单 -->
        <el-menu
          router
          :default-active="$router.currentRoute.path"
          :collapse-transition="false"
          :collapse="collapse"
          unique-opened
          class="aside-menu"
          background-color="#272d39"
          text-color="#fff"
          active-text-color="#409BFF"
        >
          <!-- 二级菜单 -->
          <el-submenu
            :index="'/' + item.path"
            v-for="item in MenuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="iconfont" :class="icon[item.id]"></i>
              <span> {{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              ><i class="iconfont" :class="icon[item.id]"></i>
              {{ subitem.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 内容 -->
        <el-main class="main">
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name" :to="item.path?{path:item.path}:''">{{item.name}}</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片 -->

<router-view></router-view>


        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
      MenuList: [],
      icon: {
        125: "icon-user",
        103: "icon-lock_fill",
        101: "icon-shangpin",
        102: "icon-danju",
        145: "icon-baobiao",
      },
      breadcrumb:[]
    };
  },
  created() {
    this.getMenuList();
  },
  watch:{
    $route:{
      immediate:true,
      handler(to){
        this.breadcrumb = []
       for(let i of to.matched){
         if(!i.name) continue 
         i.path?this.breadcrumb.push({name:i.name,path:i.path}):this.breadcrumb.push({name:i.name})
       }
       this.breadcrumb.length!=0?this.breadcrumb.unshift({name:'首页',path:'/home'}):[]
      //  console.log(this.breadcrumb)
      }
    }
  },
  methods: {
    async getMenuList() {
      const { data } = await this.$http.get("menus");
      this.MenuList = data;
      // console.log(this.MenuList);
      // console.log(this.$router);
    },
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollapse() {
      this.collapse = !this.collapse;
    },
  },
};
</script>

<style lang="scss" scoped>
$header_bk: #2d3336;
$aside_bk: #272d39;
$word_color: #fff;

.home-container {
  height: 100%;

  .el-header {
    background-color: $header_bk;
    color: $word_color;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-left {
      height: 80%;
      line-height: 100%;

      img {
        height: 100%;
        vertical-align: middle;
        padding-right: 10px;
      }
      span {
        font-size: 20px;
        vertical-align: middle;
      }
    }
  }

  .el-aside {
    background-color: $aside_bk;
    color: $word_color;
    .aside-menu {
      width: 100%;
    }
  }

  .el-main {
    background-color: #e9eef3;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  ::v-deep .el-breadcrumb{
    margin-bottom: 15px;
  }
  ::v-deep .el-card{
   box-shadow: 0 1px 1px rgba(0, 0, 0,0.15);
  }
 .main{
  background-color: #e9edf0;

 }
}
</style>