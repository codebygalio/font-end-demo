<template>
<div class="profile-avatar-container">
<img :src="img" class="img" ref="img"> 
<div class="tooltar">
    <div class="cancel" @click="$emit('close')">取消</div>
    <div class="done" @click="confirm">完成</div>
</div>
</div>
</template>
<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {updateUserAvatar} from '@/api/user.js'
export default {
    props: {
        img:{
            type: String
        },
        value:{
            type: String
        }
    },mounted(){
        const image = this.$refs.img
this.cropper = new Cropper(image, {
    viewMode:1,       
  dragMode: 'move',  
  aspectRatio:1,     
  autoCropArea: 1,   
  cropBoxMovable: false,         
  cropBoxResizable: false,      
  background: false          
    });
        
    },
    data(){
        return {
            cropper:null
        }
    },
    methods:{
         confirm(){
             this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 0,
            });
            
                // console.log('cropper=',this.cropper)
            // console.log('formData=',this.cropper.getData())  //服务端裁切用这个
            this.cropper.getCroppedCanvas().toBlob(blob => {
                console.log(this.cropper,'测试=')
              this.updateUserImg(blob)
                 
            })
           
            },
       async updateUserImg(blob){
        //   console.log('blob=',blob)
                      try {
                         const fromData = new  FormData()            
                fromData.append('photo',blob)
                // console.log(FormData,'===-')
                const {data} = await updateUserAvatar(fromData) 
                this.$emit('input',data.photo)
                // console.log(this.value,'value=')
                // console.log(data.photo)
                this.$toast.success('更新成功')
            this.$emit('close')

                      }catch(err){
                this.$toast.fail('更新失败,请稍后重试')
            }
               

        }
    
}
}
</script>
<style lang="scss" scoped>
.profile-avatar-container{
    height: 100%;
    background-color: #000;
img{
    max-width: 100%;
    display: block;
}
.tooltar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
    .cancel,.done{
        width: 90px;
        height: 90px;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
}

</style>