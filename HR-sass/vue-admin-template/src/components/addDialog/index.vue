<template>
  <el-dialog :title="diaLogType === 'edit' ? '编辑' : '新增'" :visible.sync="value" :before-close="handleClose">
     <div v-loading="isLoading"> 
        <el-form
      ref="ruleForm"
 
      :model="form"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- @focus="getEmployeeSimple" -->
        <el-select  v-model="form.manager" placeholder="请选择" >
          <el-option v-for="people in peoples" :key="people.id" :label="people.username" :value="people.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        
      </el-form-item>
    </el-form>
     <el-row  type="flex" justify="center">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        size="small"
        :loading="submitLoading"
        @click="handleSubmit"
      >确定</el-button>
    </el-row>
     </div>
    
   
  </el-dialog>
</template>
<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'

export default {

  props: {
    departs: {
      type: Array
    },
    diaLogType: {
      type: String,
      default: 'add'
    },
    value: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object
    }
  },
  data() {
    var validateName = async(rule, value, callback) => {
        let isSameName;
        if(this.diaLogType === 'add'){
         isSameName = this.departs.filter(item => item.pid === this.node.id).some(item => item.name === value)
        }else{
         isSameName = this.departs.filter(item => item.pid == this.node.pid && item.id != this.node.id).some(item => item.name === value)
        }

      isSameName ? callback(new Error(`同级部门已经存在${value}这个部门了`)) : callback()
      // callback(new Error('请输入密码'));
    }
    var validateCode = async(rule, value, callback) => {
        let isSameCode;
        if(this.diaLogType === 'add'){
                   isSameCode = this.departs.some(item => item.code === value && value)
        }else{
                isSameCode = this.departs.some(item=> item.code === value && value !== this.node.code)
        }   
      isSameCode ? callback(new Error(`已经存在${value}这个编码了`)) : callback()
      // callback(new Error('请输入密码'));
    }
    return {
        submitLoading:false,
      isLoading: true,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '长度在1-50个字符之间',
            trigger: 'blur'
          },
          { validator: validateName, trigger: 'blur' }
        ],

        code: [
          {
            required: true,
            message: '请输入部门编码',
            trigger: 'change'
          },
          {
            min: 1,
            max: 50,
            message: '部门编码在1-50个字符之间',
            trigger: 'blur'
          },
          { validator: validateCode, trigger: 'blur' }
        ],

        manager: [
          {
            required: true,
            message: '请输入部门负责人',
            trigger: 'blur'
          }
        ],

        introduce: [
          {
            required: true,
            message: '请输入部门介绍',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 300,
            message: '部门介绍在1-300个字符之间',
            trigger: 'blur'
          }
        ]
      },
      peoples: []
    }
  },
  created() {
    this.getEmployeeSimple()
    if (this.diaLogType === 'edit') {
      this.form = this.node
    }
  },
  methods: {
    async getEmployeeSimple() {
      try {
        const { data } = await getEmployeeSimple()
        this.peoples = data
        // if (this.diaLogType !== 'edit') {
        this.isLoading = false
        // }
      } catch { return }
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
            if(this.diaLogType === 'add'){
                this.addInfo()
            }else{
                this.editInfo()
            }
          
        } else {
          return false

        }
            
      })
    },
   async editInfo(){
    try{
        const data = await updateDepartments(this.form)
        this.$message({
            message: '更新成功',
            type: 'success'
          })
                  this.$emit('update')
        this.$emit('input', false)    
    }catch(err){
        if (err.response && err.response.status === 405) {
            this.$message({
            message: '系统默认数据不可修改',
            type: 'error'
          })    
        }
    }
    },
    async addInfo() {
        this.submitLoading = true
      try {
        await addDepartments({ ...this.form, pid: this.node.id })
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$emit('update')
        this.$emit('input', false)
      } finally{
        this.submitLoading = false
      }
      

    },
    handleClose() {
    //   console.log('test', this.diaLogType)
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
