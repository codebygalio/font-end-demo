<template>
<el-dialog
  title="分配角色"
  :visible.sync="value"
  width="30%"
  :before-close="handleClose">
   <div v-loading="isLoading">
    <el-checkbox-group v-model="checkList">
    <el-checkbox :label="role.id" v-for="role in roles" :key="role.id">
        {{role.name}}
    </el-checkbox>
  </el-checkbox-group>
          <el-row type="flex" justify="center" slot="footer" style="margin-top:20px;">

    <el-button type="primary" size="small" @click="assignRoles">确 定</el-button>
    <el-button @click="handleClose" size="small">取 消</el-button>
      </el-row>
   </div>

  
</el-dialog>
</template>
<script>
import { getRoleList } from '@/api/setting.js'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees.js'

export default {
props:{
    value: {type: Boolean},
        userId: {}

},
data(){return{
    isLoading: false,
checkList: [],
roles: []
}},
watch:{
    value(newValue){
        if(this.checkList == 0 && newValue == false){
            this.getRoleList()
        }
    }
},
created(){
    this.getRoleList()
},
methods:{
    async assignRoles(){
        try{
            const data = await assignRoles({id:this.userId, roleIds:this.checkList})
            this.$message({
                type: data.success ? 'success' : 'error',
                message: data.message
            })
            if(data.success){
                this.handleClose()
            }
        }finally{
            return
        }
        
    },
    handleClose(){
        this.$emit('input', false)
    },
    async getRoleList(){
        this.isLoading = true
        try{
            const {data:{rows}} = await getRoleList({page:1, pagesize:20})
            this.roles = rows
        }finally{
            return
        }    
        // console.log('data=',data)
    },
    async getUserDetailById(userId){
        this.isLoading = true
       try{
         const {data} = await getUserDetailById(userId)
        this.checkList = data.roleIds
        if(this.roles.length > 0){
                this.isLoading = false
            }
       }finally{
        // console.log(this.checkList.length > 0)
        // console.log(this.roles.length > 0)
        
       }
        // console.log(data.roleIds)
    }
}

}
</script>
<style lang="scss" scoped>

</style>