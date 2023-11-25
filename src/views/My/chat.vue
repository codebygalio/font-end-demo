<template>
<div class="chat-container">
<van-nav-bar
    fixed
    class="nav-bar"
  title="小智同学"
  left-arrow
  @click-left="$router.back()"
/>
<div class="content" ref="content">
        <chatItem v-for="(item,index) in list" :key="index" :message="item.msg" :isMe="item.isMe" :photo="user.userInfo.photo"   />
</div>

<!-- 底部 -->
<van-field
    class="buttom-send"
  v-model="message"
  rows="1"
  type="textarea"
  placeholder="说点什么..."
  @keyup.enter.exact="send"
>
 <template #button>
    <van-button size="small" type="primary" @click="send">发送</van-button>
  </template>
</van-field>
</div>

</template>
<script>
import {mapState} from 'vuex';
import chatItem from './chat-item.vue';
import io from "socket.io-client";
import {myUrl} from '@/utils/.my_settings'

export default {
name:"Chat",
components:{
    chatItem
},
created(){
     this.socket = io(myUrl, {
      query: {
        token: this.user.userTokens,
      },
      transports: ["websocket"],
    });
      this.socket.on("message", (data) => {
      this.list.push({
        msg: data.msg,
        isMe: false,
      });

      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
      });
    });
},
computed:{
    ...mapState(['user'])
},
data(){
    return {
        message: '',
        socket:null,
        list:[]
    }
},
methods:{
    send() {
      if (this.message == "") return this.$toast("请输入点内容");

      this.socket.emit("message", {
        msg: this.message,
        timestamp: Date.now(),
      });

      this.list.push({
        msg: this.message,
        isMe: true,
      });

      this.message = "";

      this.$nextTick(() => {
        
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
      });
    }
}

}
</script>
<style lang="scss" scoped>
.chat-container{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background-color: #fafafa;
.nav-bar{
        background-color: #3196fa ;
        ::v-deep .van-icon-arrow-left {
            color: #fff;
        }
        ::v-deep .van-nav-bar__title{
            color: #fff;
        }

}
.content{
    position:fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 160px;
    overflow-y: auto;

}

.buttom-send{
    position: absolute;
    bottom: 0;
}
}

</style>