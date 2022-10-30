<template>
  <div>
    <el-card class="box-card">
      <el-alert
        title="注意：只允许第三级分类设置相关参数!"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <el-row class="mgtb-10">
        <el-col
          >选择商品分类：
          <!-- 级联选择器 -->
          <el-cascader
          clearable
            style="width: 300px"
            v-model="cascaderkey"
            :options="cateList"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
            }"
            @change="cascaderChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- 标签页 -->
      <el-tabs v-model="tabsAtive" @tab-click="tabsClick">
        <!-- 动态参数标签页 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button size="small" type="primary" :disabled="isDisabled" @click="openDialog"
            >添加参数</el-button
          >
        <!-- 表格 -->
          <el-table border  :data="dycTable">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag v-for="(item, index) in props.row.attr_vals" :key="index">{{item}}</el-tag>
                <el-input
 
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                 </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column prop="attr_name" label="属性名称">
            </el-table-column>
            
          
          </el-table>
        </el-tab-pane>
        <!-- 静态属性标签页 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button size="small" type="primary" :disabled="isDisabled" @click="dialogVisible = true"
            >添加属性</el-button
          >
          <!-- 表格 -->
          <el-table border v-if="dycTable.length > 0" :data="staticTable">
            <el-table-column type="expand">
              <template slot-scope="props"> </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column prop="attr_name" label="属性名称">
            </el-table-column>
            
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
  :title="tabsAtive == 'many' ?'动态参数' :'静态属性' "
  :visible.sync="dialogVisible"
  width="35%"
   >
  <el-input v-model="input"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        inputValue: '',
        inputVisible:false,
        // 对话框输入框
        input:'',
        // 对话框
        dialogVisible:false,
        // 动态参数表格
      staticTable: [],
    //   静态属性表格
      dycTable: [],
      // 标签页
      tabsAtive: "many",
      // 级联选择器
      cascaderkey: [],
      cateList: [],
    };
  },
  created() {
    this.getCateList();
  },
  watch:{
    cascaderkey(value){
    if(value.length <= 2) {
     this.staticTable = []
     this.dycTable = []
    }
    }
  },
  computed: {
    isDisabled() {
      return !(this.cascaderkey.length == 3);
    },
  },
  methods: {
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    handleInputConfirm(){
    
        this.inputVisible = false;
        this.inputValue = '';
    },
    openDialog(){
        this.dialogVisible = true
        this.input = ''
    },
    async submitForm(){
        if(this.input == '') return
        const {data} = await this.$http.post(`categories/${this.cascaderkey[this.cascaderkey.length - 1]}/attributes`,{
            attr_name:this.input,
            attr_sel:this.tabsAtive,
        })
        if(!data)return
        this.$message.success('添加成功')
        this.dialogVisible = false 
        this.cascaderChange()
    },
    async getCateList() {
      const { data } = await this.$http.get("/categories");
      if (!data) return;
      this.cateList = data;
      console.log(this.cateList);
    },
    // 级联选择器发生改变
    async cascaderChange(val) {
      if (this.cascaderkey.length <= 2) {
        this.cascaderkey = [];
        return;
      }
      const { data } = await this.$http.get(
        `/categories/${
          this.cascaderkey[this.cascaderkey.length - 1]
        }/attributes`,
        { params: { sel: this.tabsAtive } }
      );
      console.log(data);
      if (!data) return;
      if (this.tabsAtive == "only"){
        this.staticTable = data;
        this.staticTable.forEach(item => {
            item = item.attr_vals.split(',')
        })
      }
      if (this.tabsAtive == "many"){
        this.dycTable = data;
        this.dycTable.forEach(item => {
            item.attr_vals = /^\s*$/.test(item.attr_vals) ? null  : item.attr_vals.split(',') 
        })
        console.log(this.dycTable)
      }

    },
    tabsClick() {
      this.cascaderChange();
    },
  },
};
</script>

<style lang="scss" scoped>
.mgtb-10 {
  margin: 10px 0;
}
</style>