<template>
  <div v-loading="containerLoading">
    <el-row style="height:60px">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addRole">新增角色</el-button>
       </el-row>
    <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    border
    style="width: 60%">
    <el-table-column
    align="center"
    label="序号"
      type="index"
      width="120">
    </el-table-column>
    <el-table-column
    align="center"
      property="name"
      label="名称"
     >
    </el-table-column>
    <el-table-column
    align="center"
      property="description"
      label="描述"
      >
    </el-table-column>
     <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button
          size="small"
          type="success"
          @click="handleAssign(scope.row)">分配权限</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
      :current-page="page.page"
      :page-size="page.pagesize"
      :total="page.total"
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"    
      >
    </el-pagination>
</el-row>
<role-dialog v-if="roleDialog" v-model="roleDialog" :id="editId" @update="getRoleList"/>
<assignDialog v-model="showAssignDialog" ref="assignDialog"/>
  </div>
</template>

<script>
import { getRoleList, deleteRole } from '@/api/setting.js'
import roleDialog from './roleDialog.vue'
import assignDialog from './assignDialog'

export default {
    components:{
        roleDialog,
        assignDialog
    },
data(){
    return {
        editId: null,
        showAssignDialog: false,
        roleDialog: false,
        containerLoading:true,
        tableData:[],
        page:{
            total:0,
            page:1,
            pagesize:2,
        }
    }
},
mounted(){
    this.getRoleList()
  },
  methods:{
     async getRoleList(){
        this.containerLoading = true
    const {data} = await getRoleList(this.page)
    this.page.total = data.total
    const getDOMText = document.querySelector('.el-pagination__total').innerText
    document.querySelector('.el-pagination__total').innerText = getDOMText.replace('{total}',this.page.total)
    this.tableData = data.rows
    this.containerLoading = false
  },
  handleCurrentChange(page){
        this.page.page = page
        this.getRoleList()
    },
    handleAssign(row){
        this.$refs.assignDialog.initUserAssign(row.id)
        this.showAssignDialog = true
      },
      handleEdit(row){
    this.editId = row.id
    this.roleDialog = true
    
        // console.log(row)
      },
      async handleDelete(row){
        this.$confirm(`此操作将永久删除${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
            this.deleteByid(row)
        }).catch(()=>{})
      },
      async deleteByid(row){
         const data =await deleteRole(row.id)
        this.$message({
                type: data.success? "success": "error",
                message: data.message
            })
        if(data.success){
            if(this.tableData.length == 1 && this.page.page != 1){
                   this.page.page -= 1
            }
           this.getRoleList()
        }
      },
      addRole(){
        this.editId = null 
        this.roleDialog = true
      },
  }
}
</script>

<style>

</style>