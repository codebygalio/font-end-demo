<template>
<div class="loginSetting-container" >
    <el-form ref="form" :model="form" label-width="80px" style="width:500px" :rules="rules">
        <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password2">
    <el-input v-model="form.password2" type="password"></el-input>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="updateInfo">更新</el-button>
  </el-form-item>
    </el-form>
</div>
</template>
<script>
import { getUserAvatar } from '@/api/user.js'
import { saveUserDetailById } from '@/api/employees'
export default {
data(){return{
form:{
    id:this.$route.params.id,
    username: '',
    password2: ''
},
rules:{
    username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password2: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]

}

}},
created(){
    this.getUserDetail()
},
methods:{
    async getUserDetail(){
        const {data} = await getUserAvatar(this.form.id)
        this.form = data
        console.log('data',data)
    },
    async updateInfo(){
        try{
            await this.$refs.form.validate()
            this.saveUserDetailById()
        }catch{
            return
        }
    },
    async saveUserDetailById(){
        try{
            const data = await saveUserDetailById({...this.form, password: this.form.password2})
            this.$message({
                type: data.success? 'success' : 'error',
                message: data.message
            })
            if(data.success){
                this.form.password2 = ''
            }
        }finally{
            return
        }
    }
    

}

}
</script>
<style lang="scss" scoped>
.loginSetting-container{
    padding-top: 30px;
    margin-left: 120px;
}
</style>