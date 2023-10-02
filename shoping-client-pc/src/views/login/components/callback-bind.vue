<template>
  <Form ref="formCom" class="xtx-form" :validation-schema="mySchema"  autocomplete="off" v-slot="{errors}">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{nickname}} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{err: errors.mobile}" v-model="form.mobile" name="mobile" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{err: errors.code}" v-model="form.code" name="code" class="input" type="text" placeholder="短信验证码" />
        <span @click="send()" class="code">{{time===0?'发送验证码':`${time}秒后发送`}}</span>
      </div>
      <div class="error" v-if="errors.code">{{errors.code}}</div>
    </div>
    <a @click="submit" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import { onUnmounted, reactive, ref } from 'vue'
import { Form, Field, validate } from 'vee-validate'
import Schema from '@/utils/vee-validate-schema.js'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/Message'
export default {
  name: 'CallbackBind',
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
    const nickname = ref(null)
    const avatar = ref(null)
    const form = reactive({
      mobile: '',
      code: ''
    })
    const mySchema = {
      mobile: Schema.mobile,
      code: Schema.code
    }
    if (QC.Login.check()) {
      QC.api('get_user_info').success(res => {
        avatar.value = res.data.figureurl_1
        nickname.value = res.data.nickname
      })
    }
    const formCom = ref(null)
    const time = ref(0)

    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, { immediate: false })
    onUnmounted(() => {
      pause()
    })

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
    const submit = () => {
      const valid = formCom.value.validate()
      if (valid) {
        userQQBindLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          store.dispatch('cart/mergeCart').then(() => {
          // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl)
            // 3. 成功提示
            Message({ type: 'success', text: 'QQ绑定成功' })
          })
        }).catch(e => {
          Message({ type: 'error', text: '绑定失败' })
        })
      }
    }
    return { nickname, avatar, form, mySchema, send, time, formCom, submit }
  }
}
</script>

<style scoped lang='scss'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
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
