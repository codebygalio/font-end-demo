<template>
    <div class="imageUploadContainer">
    <el-upload 
    :http-request="upload"
    :on-remove="handleRemove"
    :on-change="handleChange"
    :before-upload="beforeAvatarUpload"
 :class="{'disabled': fileComputed}"  list-type="picture-card" action="#" :file-list="fileList" :limit="1"   :on-preview="handlePreview">
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            dialogImageUrl:'',
            dialogVisible:false,
            fileList: []
        };
    },
    computed: {
        fileComputed() {
            return this.fileList.length > 0
        }
    },
    methods: {
        upload(params){
            // console.log(params)
        },
        beforeAvatarUpload(fileInfo){
            console.log('fileInfo=',fileInfo)
            const types = ['image/png', 'image/gif', 'image/bmp', 'image/jpeg']
            const isInclude = types.includes(fileInfo.type)
            if(!isInclude){
                this.$message.error('上传图片类型只能是 JPG、GIF、BMP、PNG格式！')
                return false
            }
            if(fileInfo.size >= 5*1024*1024){
                this.$message.error('上传的图片不能超过5MB')
                return false
            }

            // if(fileInfo.size >= 5*1024)
            // console.log('fileInfo=',fileInfo)
            return true
        },
        handlePreview(imgInfo){
            this.dialogVisible = true
            // console.log('imgInfo=',imgInfo)
            this.dialogImageUrl = imgInfo.url
        },
        handlePictureCardPreview() {},
        handleRemove(fileInfo) {
            const getIndex = this.fileList.indexOf(fileInfo)
            this.fileList.splice(getIndex,1)
            // console.log(this.fileList)

        },
        handleChange(file,fileList){
            if(this.fileList.length === 0){
                this.fileList.push(file)
            }
            console.log('file=',file)
            console.log('filetype=',file.type)
            // console.log('fileList=',fileList)
            // console.log('fileList=',fileList)
            // if(this.fileList.length === 0){
            // this.fileList.push(imgInfo)    
            // }
            // console.log(imgInfo)
        }
    },
};
</script>
<style lang="scss" scoped>
.imageUploadContainer{
    ::v-deep .el-dialog__header{
    position:relative;
    .el-dialog__headerbtn{
        top: 50%;
transform:translateY(-50%)
    }
}
 .disabled{
    ::v-deep .el-upload--picture-card{
        display: none;
    }
}
}
</style>