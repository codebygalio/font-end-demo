<template>
<el-dialog
  title="提示"
  :visible.sync="value"
  width="30%"
  :before-close="handleClose">
    <div v-loading="isLoading">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
             <el-input v-model="form.name"></el-input>
             </el-form-item>
             <el-form-item label="描述" prop="description">
             <el-input v-model="form.description"></el-input>
             </el-form-item>
     </el-form>
   
  <span slot="footer">
   <el-row type="flex" justify="center">
    <el-button size="small" type="primary" @click="submitForm">确定</el-button>
      <el-button  size="small" @click="handleClose">取消</el-button>
   </el-row>
  </span>
    </div>
</el-dialog>

</div>
</template>
<script>
import {  getRoleDetails, editRole, addRole } from '@/api/setting.js'

export default {
name:"",
props:{
    value:{
        type: Boolean
    },
    id:{
        type: [String, Number]
    }
},
data(){
    return {
        rules:{
            name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]

        },
        isLoading:false,
        form: {}
    }
},
created(){
    if(this.id){
        this.isLoading = true
    this.getRoleDetails()
    }
    
},
methods:{
   async submitForm(){
        try{
            await this.$refs.form.validate()
            this.editRole()
        }catch{
            
        }
        
    },
    async editRole(){
        try{
            let data;
            if(this.id){
                 data = await editRole(this.form)
            }else{
                data = await addRole(this.form)
            }
            
       if(data.success){
         this.$emit('update')
        this.handleClose()
       }
        this.$message({
            type: data.success ? "success" : "error",
            message: data.message
        })
        }catch{
            return 
        }
       
    },
   async getRoleDetails(){
    
    const {data} = await getRoleDetails(this.id)
    this.form = data
     this.isLoading = false
    // console.log('inf=',this.info)
    },
    handleClose(){
        this.$emit('input',false)
    }
},

}
</script>
<style lang="scss" scoped>

</style>