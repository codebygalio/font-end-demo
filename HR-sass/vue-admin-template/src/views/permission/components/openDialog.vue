<template>
<el-dialog :visible="value" :title="showText" @close="btnCancel"> <!-- 表单 -->
      <div v-loading="isContainerLoading">
        <el-form ref="permForm" :model="formData" label-width="120px" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center" v-loading="isBtnLoading">
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
      </el-row>
      </div>
    </el-dialog>
</template>
<script>
import { addPermission, getPermissionDetail, updatePermission } from '@/api/permisson.js'
export default {
props:{
    value: { type: Boolean},
    id: {},
    type: {}
},
data(){
    return {
        isContainerLoading: false,
        isBtnLoading: false,
         formData:{
            name:'',
            code:'',
            description: '',
            enVisible:'1'
         },
         rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
},
computed: {
    showText() {
      return this.id ? '编辑权限' : '新增权限'
    }
  },
  created(){
    if(!this.type){
this.getPermissionDetail()
    }
    
  },
  methods:{
    async getPermissionDetail(){
        this.isContainerLoading = true
        try {
            const {data} = await getPermissionDetail(this.id)
        this.formData = data
        this.isContainerLoading = false
        }
        catch{}
        // console.log('getPermissionDetail=',data)
    },
    btnCancel() {
      this.$emit('input', false)
    },
    async btnOk(){
        try{
            await  this.$refs.permForm.validate()
            this.requestForm()
        }finally{
        }
        
   },
   async requestForm(){
    this.isBtnLoading = true
    try{
        if(this.type){
            await addPermission({...this.formData,pid:this.id, type: this.type })
    }else{
        await updatePermission(this.formData)
    }
    this.$message.success('操作成功')
        this.btnCancel()
        this.$emit('update')
    }finally{
        this.isBtnLoading = false
    }
            
   }
  }
}
</script>
<style lang="scss" scoped>

</style>