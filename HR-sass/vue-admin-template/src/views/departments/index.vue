<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card v-loading="isLoading" class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @openDialog="openDialog" />
        <el-tree  :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" :tree-node="data" @openDialog="openDialog" @update="getDepartments" />
        </el-tree>
      </el-card>
    </div>
    <addDialog ref="openDialog" v-if="showDialog"  v-model="showDialog" :node="node" :dia-log-type="diaLogType" :departs="list" @update="getDepartments" />
  </div>
</template>
<script>
import addDialog from '@/components/addDialog'
import TreeTools from '@/components/tree-tools'
import { getDepartments } from '@/api/departments.js'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Departments',
  components: {
    addDialog,
    TreeTools
  },
  data() {
    return {
      isLoading: true,
      diaLogType: 'add',
      node: {},
      showDialog: false,
      company: { name: '农业种植有限公司', manager: '负责人', id: '' },
      departs: [],
      list: [],
      defaultProps: {
        label: 'name' }
    }
   
  },
  created() {
    this.getDepartments()
  },
  methods: {
    openDialog(type, Node) {
    this.diaLogType = type
      this.node = Node

      this.showDialog = true
    },
    async getDepartments() {
      const { data: { depts }} = await getDepartments()
      this.list = depts
      this.departs = transListToTreeData(depts, '')
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-card{

}
</style>
