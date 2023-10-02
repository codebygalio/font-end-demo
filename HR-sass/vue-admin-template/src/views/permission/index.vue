<template>
  <div class="permission-container app-container" v-loading="isLoading">
    <page-tools :showBefore="false">
        <template v-slot:after>
            <el-button type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
        </template>    
    </page-tools> 
      <el-table border :data="permissionList" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type===1" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="assignPerm(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <openDialog v-if="showDialog" v-model="showDialog" @update="getPermissionList" :id="dialogData.pid" :type="dialogData.type"/>
  </div>
</template>
<script>
import { getPermissionList, delPermission } from '@/api/permisson'
import { transListToTreeData } from '@/utils/index.js'
import openDialog from './components/openDialog.vue'
export default {
  name: 'Permission',
  components:{
    openDialog
  },
  data(){
    return{
        dialogData:{
            pid: null,
            type: null
        },
        showDialog: false,
        isLoading:false,
    permissionList:[]
  }},
  created(){
    this.getPermissionList()
  },
  methods:{
     async delPermission(id){
       try{
        await  this.$confirm('确定删除该权限节点吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList()
       }catch{

       }
        

          
    },
    assignPerm(id){
        this.dialogData.type = null
        this.dialogData.pid = id
        this.showDialog = true
    },
    addPermission(type, pid){
         this.dialogData.type = type
      this.dialogData.pid = pid
      this.showDialog = true
    },
    async getPermissionList(){
        this.isLoading = true
        try{
            const {data} = await getPermissionList()
        this.permissionList = transListToTreeData(data, '0')
        console.log('mytestdata=', data)
        this.isLoading = false
        }finally{}
        // console.log('data=',data)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
