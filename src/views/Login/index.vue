<template>
  <div class="login-container">
   <!-- 导航栏 -->
   <van-nav-bar
   class="nav-bar"
  title="登录"
><i slot="left" class="icon-17 left-icon" @click="$router.back()"></i></van-nav-bar>
  <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="loginForm.mobile"
        type="digit"
        name="mobile"
          maxlength="11"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' },{pattern:/^1[3,4,5,6,7,8,9]\d{9}$/,message:'输入的手机号有误'}]"
        label-width='1.3733rem'
      >
      <i slot="label" class="icon-10"></i>
      </van-field>
      <van-field
      name="code"
      maxlength="6"
        v-model="loginForm.code"
        type="digit"
        placeholder="请输入验证码"
        label-width='1.3733rem'
        :rules="[{ required: true, message: '请填写验证码' },{ pattern: /^\d{6}$/, message: '验证码长度在6位数' }]"
      >
      <i slot="label" class="icon-16"></i>
      <template #button>
        <van-count-down :time="10000" format="ss s" v-if="showCount" @finish="showCount=false"/>
    <van-button size="small"  round class="get-code" @click="getCode" native-type="button" v-else>获取验证码</van-button>
  </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"   block type="info" native-type="submit" :disabled="isDisabled">登录</van-button>
      </div>
    </van-form> 

  </div>
</template>

<script>
import {login} from  '@/api/user'
export default {
name:'Login',
data(){
  return {
    showCount:false,
    loginForm: {
      mobile:null,
      code:null
    }
  }
},
computed:{
  isDisabled(){
    let lock = false
   for(let itemValue of Object.values(this.loginForm)){
    if(!/^\d{4,}$/.test(itemValue)) lock = true
   }
   return lock
  }
},
methods:{
 async getCode(e){
   try {
    await this.$refs.loginForm.validate('mobile')
    this.showCount = true
     this.loginForm.code = 246810
    this.$toast.success('获取验证码成功,已自动填入')
   }catch(error){
    return 
   }
  },
 async onSubmit(){
   try{
    this.$toast.loading({
  message: '加载中...',
  forbidClick: true,
  duration:0
});
    const {data} = await  login(this.loginForm)
    this.$toast.success('登录成功');
    this.$store.commit('setUserTokens',data)
    this.$router.push({name:'My'})
   }catch(err){
    if(!err) return
    if(err.status == 400){
      this.$toast.fail('手机号或验证码错误');
    }else{
            this.$toast.fail('登录失败,请稍后重试');
    }
   }
   
  }
}
}
</script>

<style lang="scss" scoped>
$navColor:#3296fa;
$whileColor:#fff;
.login-container{
  background: #f5f7f9;
  height: 100%;
}
.nav-bar{
  background: $navColor;
  color: $whileColor;
  
}
.get-code{
  width: 152px;
  height: 46px;
  font-size: 22px;
  font-family: '微软雅黑';
  color: #666666;
  background: #ededed;
}
.login-btn-wrap{
  margin: 53px 28px;
  .login-btn{
    color: #fff;
  }
}
</style>

<style lang="scss">
$whileColor: #fff;

.login-container{
.van-nav-bar__title{
    color: $whileColor;
}
.icon-17 .left-icon{
color:#fff ;
}
.van-cell{
    padding-left: 0px;
}
.van-field__label{
    margin-right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.van-field__body{
    
    .van-field__button{
        border-left: 1px solid #eeeeee;

    }
}

}
</style>