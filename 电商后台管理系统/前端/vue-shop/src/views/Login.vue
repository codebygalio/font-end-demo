<template>
  <div class="login-container">
    <div class="login-box-outside">
        <!-- 登录窗口 -->
      <div class="login-box">
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="" />
        </div>
        <!-- 表单 -->
        <el-form ref="userForm" class="login-form" :model="userForm" :rules="rules" @keyup.enter.native.exact="onSubmit" >
          <el-form-item prop="username">
            <el-input v-model="userForm.username" autocomplete="off" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="userForm.password"
              autocomplete="off"
              prefix-icon="iconfont icon-3702mima"
            ></el-input>
          </el-form-item>
            <el-form-item class="login-button">
    <el-button type="primary"  @click="onSubmit">登录</el-button>
    <el-button native-type="reset" type="info">重置</el-button>
  </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    let validateUsername = (rule, value, callback) => {
        if (!/^[\w]*$/.test(value)){
            callback(new Error('账号只允许字母、数字组合'));
        }
        callback()
      };
    return {
      userForm: {},
      rules:{
        username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
             { validator: validateUsername, trigger: 'blur' },
            { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods:{
    onSubmit(){
        this.$refs.userForm.validate(async valid =>{
            if(!valid) return
              const res = await this.$http.post('/login',this.userForm)
              if(!res) return 
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
        })
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2b4b6b;
$im_bg: #eee;
$shadow_color: #ddd;
$while_color: #fff;
.login-container {
  overflow: hidden;
  background-color: $bg;
  min-height: 100%;
  .login-box-outside {
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-box {
      width: 450px;
      height: 300px;
      max-width: 100%;
      position: relative;
      background-color: $while_color;
      border-radius: 3px;
      .login-form{
        box-sizing: border-box;
        padding: 0 30px;
        position: absolute;
        bottom: 0;
        width: 100%;
        .login-button{
            float: right;
        }
        ::v-deep .el-input__prefix{
            left: 8px;
        }
      }
      .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid $shadow_color;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: $while_color;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: $im_bg;
        }
      }
    }
  }
}
</style>