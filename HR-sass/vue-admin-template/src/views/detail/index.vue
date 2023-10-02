<template>
<div class="detail-container app-container">
    <el-card>
         <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="登录账户设置" name="first">
        <loginSetting :id="id" />
    </el-tab-pane>
    <el-tab-pane label="个人详情" name="second">
        <!-- <userInfo/> -->
        <component :is="userComponents"/>
    </el-tab-pane>
    <el-tab-pane label="岗位信息" name="third">
        <!-- <jobInfo/> -->
        <component :is="jobComponents" />
    </el-tab-pane>
  </el-tabs>
        <!-- {{id}} -->
    </el-card>

</div>
</template>
<script>
import loginSetting from './components/loginSetting'
import userInfo from './components/userInfo'
import jobInfo from './components/jobInfo'
export default {
    props:['id'],
    components:{
        loginSetting,
        jobInfo
    },
    data(){
        return {
            jobComponents: jobInfo,
            userComponents: userInfo,
            activeName: 'first'
        }
    },
    methods:{
        handleClick(){}
    }
}
</script>
<style lang="scss" scoped>

</style>