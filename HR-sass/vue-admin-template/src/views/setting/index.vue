<template>
  <div class="setting-container app-container">
    <el-card>
    <el-tabs v-model="activeName">
    <el-tab-pane label="角色管理" name="role">
       <role/>
    </el-tab-pane>
    <!-- 公司信息标签页 -->
    <el-tab-pane label="公司信息" name="info">
          <el-alert
    title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
    show-icon
    :closable="false"
    type="info">
  </el-alert>
        <el-form ref="form" :model="form" label-width="120px" style="margin-top:50px">
             <el-form-item label="企业名称">
    <el-input disabled v-model="form.name" style="width:400px"></el-input>
  </el-form-item>
  <el-form-item label="公司地址">
    <el-input disabled v-model="form.companyAddress" style="width:400px"></el-input>
  </el-form-item>
  <el-form-item label="公司电话">
    <el-input disabled v-model="form.companyPhone" style="width:400px"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input disabled v-model="form.companyEmail" style="width:400px"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" :rows="3" disabled v-model="form.remarks" style="width:400px"></el-input>
  </el-form-item>
            </el-form>

    </el-tab-pane>
  </el-tabs>
</el-card>
  </div>
</template>
<script>
import role from './components/role.vue'
export default {
  name: 'Setting',
  components:{
    role
  },
  data(){
    return {
        form:{
            name:'农业种植有限公司',
            companyAddress:'菲律宾',
            companyPhone:'110',
            companyEmail:'110@gmail.com',
            remarks:'农业种植有限公司'
        },
        activeName: 'role'
    }
  },
  
  methods:{
   
      
  }
}
</script>
<style lang="scss" scoped>

</style>
