<template>
<el-dialog
  title="提示"
  :visible.sync="value"
  width="30%"
  :before-close="handleClose">
  
  <div v-loading="isLoading">
    <el-tree
        ref="permTree"
        :data="permData"
        :props="{label: 'name'}"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
  <el-row type="flex" justify="center" slot="footer">
    <el-button type="primary" size="small" @click="submitForm">确 定</el-button>
    <el-button @click="handleClose" size="small">取 消</el-button>
  </el-row>
  </div>
    
</el-dialog>
</template>
<script>



import { getRoleDetails, assignPerm } from '@/api/setting'
import { getPermissionList } from '@/api/permisson'
import { transListToTreeData } from '@/utils'
export default {
props:{
    value:{
        type: Boolean
    }},
data(){
    return {
        isLoading:false,
        permData:[],
        selectCheck:[],
        roleId: null,
        getDetailSuccess: false
    }
},
created(){
    this.initpermData()
},
methods:{
    async submitForm(){
        try{
            await assignPerm({permIds:this.$refs.permTree.getCheckedKeys(), id: this.roleId})
        this.$message.success('分配权限成功')
      this.handleClose()
        }catch{}
    },
    handleClose(){
        this.getDetailSuccess = false
        this.$refs.permTree.setCheckedKeys([]);
        this.$emit('input',false)
    },
    async initpermData() {
        this.isLoading = true
        try{
            const {data} = await getPermissionList()
            this.permData = transListToTreeData(data,'0')
            if(this.getDetailSuccess){
                this.loading = false
            }
        }
        catch{}
    },
    async initUserAssign(id){
        if(this.permData.length === 0){
            this.initpermData()
        }
        this.roleId = id
        this.isLoading = true
        try{
            const {data} = await getRoleDetails(id)
        this.selectCheck = data.permIds
        // console.log('initUserAssign=',this.selectCheck)
        this.getDetailSuccess = true
        
        if(this.permData.length > 0){
            this.isLoading = false
        }
        
        }finally{
            
        }
    }
}
}
</script>
<style lang="scss" scoped>

</style>