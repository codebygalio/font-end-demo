<template>
<div class="edit-channels-container" >
    <!-- {{user}} -->
  <van-cell :border="false" class="channels-top">
    <span slot="title" class="channels-title">我的频道</span>
    <van-button type="danger" round plain size="small" class="channels-edit" @click="isEdit=!isEdit">{{isEdit? '完成' : '编辑'}}</van-button>
  </van-cell>

  <van-grid  class="grid-container my-channels">
  <van-grid-item @click="onMyChannelClick(channel,index)" v-for="(channel,index) in userChannels" :key="channel.id" :class="{'active': index == active}"  :text="channel.name"  class="grid-item">
    <van-icon slot="icon" name="clear" v-show="isEdit && !fixedList.includes(channel.id)"></van-icon>
    </van-grid-item>
</van-grid>

<!-- 频道推荐 -->
  <van-cell :border="false" class="channels-top recommed-top">
    <span slot="title" class="channels-title">频道推荐</span>
  </van-cell>

  <van-grid  class="grid-container recommed">
  <van-grid-item @click="isEdit && addUserChannels(channel)" v-for="channel in recommedChannels" :key="channel.id"  :text="channel.name"  class="grid-item" icon="plus" />
</van-grid>
</div>
</template>
<script>
import {getAllChannel, addUserChannel, deleteUserChannel} from '@/api/channel'
import {mapState}  from 'vuex'
import {setItem} from '@/utils/storage'
export default {
    name:'editChannelsContainer',
    props:{
        userChannels:{
            required: true
        },
        active:{
            required: true
        }
    },
    data(){
        return {
            isEdit: false,
       channelList: [],
       fixedList: [0] 
        }
    },
    created(){
        this.getAllChannel()
    },
    computed:{
        ...mapState(['user']),
        recommedChannels(){
            return this.channelList.filter(channel => {
               return !this.userChannels.some(mychannel => {
                    return mychannel.id == channel.id
                })
            })
            // const channels = []
            // this.channelList.forEach(channel => {

            //    const checkSame =  this.userChannels.find(mychannel => {
            //        return mychannel.id == channel.id
            //     })
            //     if(!checkSame)channels.push(channel)

            // })
            // return channels
        }
    },
    methods:{
        onMyChannelClick(channel,index){
            if(this.isEdit){
                if(this.fixedList.includes(channel.id))return
                if(index < this.active){
                    this.$emit('update:active',(this.active-1))
                }
                // const newUserChannels = this.userChannels.filter(beforeChannel => {
                // return !(beforeChannel == channel)})
                // this.$emit('update:userChannels',newUserChannels)
                this.removeUserChannels(channel,index)
            }else{
                this.$emit('closeChennelEdit',index)
            }
        },
        async removeUserChannels(channel,index){
             this.userChannels.splice(index,1)
            if(this.user.userTokens){
                try{
                    await deleteUserChannel(channel.id)
                   
                }catch(err){
                    this.$$toast('操作失败，请稍后重试')
                }
            }else{
                setItem('local_channels',this.userChannels)
            }
            
        },
        async addUserChannels(channel){
            this.userChannels.push(channel)
            if(this.user.userTokens){
               try{
                const {data} =  await addUserChannel({
                    id:channel.id,
                    seq:this.userChannels.length
                })
                
                // console.log(data)
               }
               catch(err){
                this.$toast('保存失败，请稍后重试')
               }
            }else{
                setItem('local_channels',this.userChannels)
            }
              

            // console.log(channel)
        },
        async getAllChannel(){
                  try {
             const {data} =  await getAllChannel()  
                            //  console.log('+',this.userChannels)
            this.channelList =  data.channels
                
            //  console.log(this.channelList)
            }
            catch (err){
                if(err) return
                this.$toast('数据获取失败')
            }
            
          
        }
    }
}
</script>
<style lang="scss" scoped>
.edit-channels-container{
    padding-top: 95px;
    
    .channels-top{
        margin-bottom: 17px;
           .channels-title{
        font-size: 32px;
        font-family: '微软雅黑';
        color: #333333;
    }
    .channels-edit{
        width: 104px;
        height: 48px;
        border: #f85959 1px solid;
        .van-button__text{
            font-size: 27px;
            color: #f85959;
            font-family: '微软雅黑';
        }

    }

    }
    .recommed-top.channels-top{
        margin-top: 75px;
        padding-top: 0;
        padding-bottom: 0;
    }
  
 
}

</style>

 <style lang="scss">
 .edit-channels-container{
    .grid-container{
    margin-left: 22px;
    &::after{
        border-top-width:0;
    }
       
    .grid-item{
        height: 86px;
        margin-right: 23px ;
        margin-top: 29px;
        padding-right: 0 !important;
          .van-grid-item__content{
            padding:0 34px;
            // display: flex;
            background-color: #f4f5f6;
            
            .van-grid-item__icon{
                font-size: 24px;
                color: #222222;
            }
            .van-grid-item__text{
                white-space: nowrap;
                font-size: 36px;
                font-family: '微软雅黑';
                color: #222222;
                margin-top: 0;
                
            }
        }
        

    }

      
    }
    .my-channels.grid-container{
        .van-grid-item__icon-wrapper{
            position: absolute;
            right: -10px;
            top: -10px;
            font-size: 30px;
            z-index: 2;
            color: #cacaca;
        }
        .active{
            .van-grid-item__text{
                color: red;
            }
        }
    }
    .recommed.grid-container{
        .van-grid-item__content{
            flex-direction:unset;
            justify-content: center;
            align-items: center;
        }
         .van-grid-item__text{
            margin-left: 6px;
         }
    }

 }


</style>