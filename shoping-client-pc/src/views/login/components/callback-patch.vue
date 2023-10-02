<template>
  <Form ref="formCom" class="xtx-form" :validation-schema="mySchema" v-slot="{errors}">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field name="account" v-model="form.account" :class="{err: errors.account}" class="input"   type="text" placeholder="请输入用户名" />
      </div>
      <div class="error" v-if="errors.account">{{errors.account}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field name="mobile" v-model="form.mobile" :class="{err: errors.mobile}" class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field name="code" v-model="form.code" :class="{err: errors.code}" class="input" type="text" placeholder="请输入验证码" />
        <span @click="send" class="code">{{time === 0 ? '发送验证码' : time}}</span>
      </div>
      <div class="error" v-if="errors.code">{{errors.code}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field name="password" v-model="form.password" :class="{err: errors.password}" class="input" type="password" placeholder="请输入密码" />
      </div>
      <div class="error" v-if="errors.password">{{errors.password}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field name="rePassword" v-model="form.rePassword" :class="{err: errors.rePassword}" class="input" type="password" placeholder="请确认密码" />
      </div>
      <div class="error" v-if="errors.rePassword">{{errors.rePassword}}</div>
    </div>
    <a @click="submit" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
import Schema from '@/utils/vee-validate-schema.js'
import { userQQPatchLogin } from '@/api/user'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'CallbackPatch',
  components: {
    Form,
    Field
  },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const form = reactive({
      account: '',
      mobile: '',
      code: '',
      password: '',
      rePassword: ''
    })
    const mySchema = {
      account: Schema.accountApi,
      mobile: Schema.mobile,
      code: Schema.code,
      password: Schema.password,
      rePassword: Schema.rePassword
    }
    const time = ref(0)
    const router = useRouter()
    const store = useStore()
    const submit = () => {
      const valid = formCom.value.validate()
      if (valid) {
        userQQPatchLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          store.dispatch('cart/mergeCart').then(() => {
          // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl)
            // 3. 成功提示
            Message({ type: 'success', text: '完善信息成功' })
          })
        }).catch(e => {
          Message({ type: 'error', text: '完善信息失败' })
        })
      }
    }
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        if (time.value === 0) {
        // 没有倒计时才可以发送
          await userQQBindCode(form.mobile).then(() => {
            Message({ type: 'success', text: '发送成功' })
            time.value = 60
            resume()
          }).catch(e => {
            Message({ type: 'error', text: e.response.data?.message || '发送失败' })
          })
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }
    return { mySchema, form, submit, send, formCom }
  }
}
</script>

<style scoped lang='scss'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
