<template>
  <div>
    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <el-steps
        :active="tabActive - 0"
        finish-status="success"
        class="stepsContainer"
      >
      
        <el-step v-for="step in steps" :title="step" :key="step"></el-step>
      </el-steps>
      <el-form ref="form">
      <!-- 标签页 -->
      <el-tabs tab-position="left" v-model="tabActive" :before-leave="tabsLeave" @tab-click="inTab">
        <!--标签页 基本信息 -->
        <el-tab-pane label="基本信息" name="0">
          <el-form v-model="addForm" ref="form" label-position="top">
            <el-form-item label="商品名称：">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格：">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量：">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类：">
              <el-cascader
              @change="cascaderChange"
            v-model="addForm.goods_cat"
            :options="cateList"
             :props="{ expandTrigger: 'hover', label: 'cat_name' ,value : 'cat_id' }"
             ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 标签页 商品参数 -->
        <el-tab-pane label="商品参数" name="1">
            <el-form-item v-for="item in cateParams" :key="item.attr_id" :label="item.attr_name">
                <el-checkbox-group v-model="item.attr_vals">
                    <el-checkbox v-for="attrItem in item.attr_vals" :label="attrItem" :key="attrItem" border></el-checkbox>
                    </el-checkbox-group>
  </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <!-- 标签页 上传图片 -->
        <el-tab-pane label="商品图片" name="3">
            <el-upload
            :headers="setHeaders"
  class="upload-demo"
  action="http://127.0.0.1:8888/api/private/v1/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleSuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
        </el-tab-pane>
        <!-- 标签页 商品内容 -->
        <el-tab-pane label="商品内容" name="4">
            <quillEditor v-model="addForm.goods_introduce"></quillEditor>
        </el-tab-pane>
      </el-tabs>
      </el-form>

    </el-card>
    <el-dialog
  title="预览"
  :visible.sync="previewDialog"
  width="50%"
  >
  <img class="preview-img" :src="previewImg">
  
</el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
     data() {
    return {
        previewImg:null,
        previewDialog:false,
        setHeaders:{
            authorization: sessionStorage.getItem('token')
        },
        fileList:[],
        cateParams:[],
        cateList: [],
      addForm: {
        goods_introduce:'',
        goods_cat: [],
        goods_name: "",
        pic:[]
      },
      steps: [
        "基本信息",
        "商品参数",
        "商品属性",
        "商品图片",
        "商品内容",
        "完成",
      ],
      tabActive: "0",
    };
  },
  created() {
    this.getCateList()
    
  },
  methods:{
    handleSuccess(response){
        console.log('response: ',response)
       const data = response.data && response.data.tmp_path
       if(data) this.fileList.push({pic:data})
       console.log('this.fileList: ',this.fileList)
    },
    handlePreview(file){
        this.previewImg = file.url
        this.previewDialog = true
    },
    handleRemove(file){
        const removePath = file.response.data.tmp_path
       const index =  this.fileList.findIndex(x => {
            return x.pic == removePath
        })
        this.fileList.splice(index, 1)
        console.log('newFileList:',this.fileList)
    },
    async inTab(){
        if(this.tabActive == '1'){
        const {data} = await this.$http.get(`categories/${this.addForm.goods_cat[this.addForm.goods_cat.length-1]}/attributes`,
        {params:{sel:'many'}})
         if(!data) return 
         data.forEach(item => {
            item.attr_vals =item.attr_vals.length > 0 ? item.attr_vals.split(',') : []
         })
         this.cateParams = data
         console.log(data)
        }
    },
    tabsLeave(){
    if(this.addForm.goods_cat.length <= 2){
        this.$message.error('请选择商品分类')
        return false
    }
    },
    cascaderChange(){
        if(this.addForm.goods_cat.length <=2 ){
            this.addForm.goods_cat = []
        }
    },
    async getCateList(){
       const {data} = await this.$http('categories')
       this.cateList = data
       console.log(data)
    }
  },
  components:{
    quillEditor
  }
 
};
</script>

<style lang="scss" scoped>
$step_active: #6294c8;
.stepsContainer {
  width: 90%;
  font-size: 12px;
  margin: 15px auto;
}
.preview-img{
    width: 100%;
}
</style>