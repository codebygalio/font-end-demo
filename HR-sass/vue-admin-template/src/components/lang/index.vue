<template>
<div class="lang-container">
  <el-dropdown trigger="click" @command="changeLanguage" placement="bottom">
<div>
    <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
</div>
 <el-dropdown-menu slot="dropdown"> 
    <el-dropdown-item :disabled="langType == 'zh'" command="zh">中文</el-dropdown-item>
    <el-dropdown-item :disabled="langType == 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>  
</div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
    computed:{
        langType(){
            return this.$i18n.locale
        }
    },
methods:{
    changeLanguage(type){
        Cookie.set('lang',type)
        this.$i18n.locale = type
        this.$message.success('切换多语言成功')
    }
}
}
</script>
<style lang="scss" scoped>
.lang-container{
    cursor: pointer;
}
</style>