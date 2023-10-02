<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%;">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown >
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add" @click.native="$emit('openDialog','add',treeNode)">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit" @click.native="$emit('openDialog','edit',treeNode)">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete" @click.native="confirmDelete">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

    </el-col>

  </el-row>
</template>
<script>
import { deleteDepartments } from '@/api/departments.js'
export default {
  props: {
    node:{},
    treeNode: {
      required: true,
      type: [Object]
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirmDelete() {
     
        this.$confirm(`您确定要删除${this.treeNode.name}?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.deleteDepartments()
        }).catch(() => { return })
      
    },
    async deleteDepartments() {
      try {
        await deleteDepartments(this.treeNode.id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$emit('update')
      } catch (err) {
        if (err.response && err.response.status === 405) {
          this.$message({
            message: '系统默认数据不可删除，只可删除默认数据',
            type: 'error'
          })
        }
      }
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
