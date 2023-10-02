<template>
<el-dialog
  title="新增员工"
  :visible.sync="value"
  width="30%"
  :before-close="handleClose">
  <div v-loading="showLoading">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="姓名" prop="username">
    <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="form.mobile" placeholder="请输入手机号" type="tel" maxlength="11"></el-input>
  </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
         <el-date-picker
      v-model="form.timeOfEntry"
      type="date"
      placeholder="请输入入职时间">
    </el-date-picker>
  </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="form.formOfEmployment" placeholder="请选择聘用形式">
    <el-option
      v-for="item in employees.hireType"
      :key="item.id"
      :label="item.value"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
    <el-form-item label="工号" prop="workNumber">
    <el-input v-model="form.workNumber" placeholder="请输入工号"></el-input>
  </el-form-item>
    <el-form-item label="部门" prop="departmentName">
    <el-input v-model="form.departmentName" placeholder="请输入部门" @focus="showDepartList = true"></el-input>
    <el-tree v-show="showDepartList" :data="departList" :props="{label: 'name'}" @node-click="handleNodeClick" default-expand-all
></el-tree>

  </el-form-item>
    <el-form-item label="转正时间" prop="correctionTIme">
        <el-date-picker
      v-model="form.correctionTIme"
      type="date"
      placeholder="转正时间">
    </el-date-picker>
  </el-form-item>


    </el-form>

  <span slot="footer">
    <el-row type="flex" align="middle" justify="center">
        <el-button  @click="handleClose" size="small">取消</el-button>
        <el-button type="primary" size="small" @click="submitForm" :loading="buttonLoading">确定</el-button>
    </el-row>
  </span>
  </div>
</el-dialog>
</template>
<script>
import { addEmpoyee } from '@/api/employees.js'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils/index'
import employees from '@/api/constant/employees'
export default {
    props:{
        value:{type:Boolean}
    },
    data(){
        return{
            employees,
            buttonLoading:false,
        departList:[],
        showDepartList:false,
        showLoading:false,
        form:{
            departmentName: ''
        },
        rules:{
            username:[
                { required: true, message: '姓名不能为空', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 2 到 4 个字符', trigger: 'blur' }
            ],
            mobile:[
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                {pattern: /^1[3-9][0-9]{9}$/,message:'手机号格式错误',trigger: 'blur'}
            ],
            timeOfEntry:[
                { required: true, message: '入职时间不能为空', trigger: 'blur' },
            ],
            formOfEmployment:[
                { required: true, message: '聘用形式不能为空', trigger: 'blur' },
            ],
            workNumber:[
                { required: true, message: '工号不能为空', trigger: 'blur' },
            ],
             departmentName:[
                { required: true, message: '部门不能为空', trigger: 'change' },
            ],
            correctionTIme:[
                { required: true, message: '转正时间不能为空', trigger: 'blur' },
            ],
        }
    }},
    created(){
        this.getDepartments()
    },
    methods:{
        handleClose(){
            // this.$refs.form.resetFields()
            this.$emit('input',false)
        },
       async getDepartments(){
        this.showLoading = true
            try{
                const {data:{depts}} = await getDepartments()
            this.departList = transListToTreeData(depts, '')
                        this.showLoading = false
                                    // console.log('dddd=',this.DepartList)
            }finally{return}
        },
        handleNodeClick(data){
            // console.log('treedata=',data)
            this.form.departmentName = data.name
            this.showDepartList = false
        },
        async submitForm(){
            try{
                await this.$refs.form.validate()
                this.buttonLoading = true
                const data = await addEmpoyee(this.form)
                this.$message({
          message: data.message,
          type: 'success'
        });//
        this.$emit('update')
                this.handleClose()
                // console.log(data)
                this.$parent.getEmployeeList()
            }catch{ return false }
            finally{
                this.buttonLoading = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>