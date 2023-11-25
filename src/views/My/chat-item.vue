<template>
<div class="right-user base-user" v-if="isMe">  
<div class="message">{{message}}</div>
<van-image
    round
    fit="cover"
    class="base-user-img"
  :src="photo"
/>
</div>
<div class="left-user base-user" v-else>  
<van-image
    round
    fit="cover"
    class="base-user-img"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
/>
<div class="message">{{message}}</div>

</div>


</template>
<script>
export default {
    props:{
        photo:{type:String,default:'http://geek.itheima.net/images/user_head.jpg'},
        isMe: {type:Boolean},
        message:{type:String}
    }
}
</script>
<style lang="scss" scoped>
.base-user{
display: flex;
    padding:20px;
    .base-user-img{
         width: 70px;
        height:70px;
    }
    .message{
        word-break: break-all;
        position:relative;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        font-size: 0.37333rem;
        max-width: 70%;
        padding:0 20px 0 20px;
        line-height: 1.01333rem;
        &::before{
            top: 14px;
             content: "";
          width: 20px;
          height: 20px;
          position: absolute;

          transform: rotate(45deg);
        }
    }
}
.left-user{
    .message{
        background-color: #e0effb;
        margin-left: 15px;
        &::before{
          background: #e0effb;
          left: -10px;
                border-left: 0.5px solid #c2d9ea;
          border-bottom: 0.5px solid #c2d9ea;
        }
    }
}
.right-user{
        justify-content: flex-end;

    .message{
        background-color: #9eea6a;     
        margin-right: 15px;
        &::before{
                      border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          top: 14px;
          background: #9eea6a;
          right: -10px;
        }
    }
}
</style>