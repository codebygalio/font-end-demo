<template>
  <div>
    <el-card class="box-card">
      <el-button
        type="primary"
        style="margin-bottom: 10px"
        @click="openAddDialog"
        >添加分类</el-button
      >
      <!-- <el-table
    :data="cateList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="cat_id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="cat_name"
      label="家电名称"
      sortable
      width="180">
    </el-table-column>
   
  </el-table> -->

      <!-- 表格 -->
      <tree-table
        ref="table"
        :data="cateList"
        index-text="#"
        showIndex
        border
        :columns="columns"
        :selectionType="false"
        :expandType="false"
        style="margin-bottom: 10px"
      >
        <template slot="isWorking" slot-scope="scope">
          <i class="el-icon-success working" v-if="!scope.row.cat_deleted"></i>
          <i class="el-icon-error unwork" v-else></i>
        </template>
        <template slot="level" slot-scope="scope">
          <el-tag size="small" :type="scope.row.cat_level | getLevelTagColor">{{
            scope.row.cat_level | getLevel
          }}</el-tag>
        </template>
        <template slot="event" slot-scope="scope">
          <div class="event-group">
            <el-button type="primary" icon="el-icon-edit" size="small"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        class="fixed-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.query.pagenum"
        :page-sizes="page.pagesizes"
        :page-size="page.query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="addDialog" width="35%">
      <el-form ref="addForm" :model="addForm" label-width="90px">
        <el-form-item label="分类名称：">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            clearable
            @change="handleChange"
            :options="parentList"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
              checkStrictly: true,
            }"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentList: [],
      addForm: {
        cate_level: null,
        cat_name: "",
        cate_pid: null,
      },
      addDialog: false,
      columns: [
        {
          label: "家电",

          prop: "cat_name",
        },
        {
          label: "测试",

          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isWorking",
        },
        {
          label: "层级",
          type: "template",
          template: "level",
        },
        {
          label: "操作",
          type: "template",
          template: "event",
          width: "200px",
        },
      ],
      page: {
        query: {
          pagenum: 1,
          pagesize: 5,
        },
        pagesizes: [5, 10, 20, 40],
        total: 100,
      },
      cateList: [],
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
   async submitForm() {
    // console.log(this.addForm)
     const {data} =  await this.$http.post('categories',this.addForm)
     if(!data) return
     this.$message.success('新增分类成功')
     this.addDialog = false
     this.getCateList();
    },
    handleChange(value) {
      if (value.length > 0) {
        this.addForm.cate_level = value.length;
        this.addForm.cate_pid = value[value.length - 1];
      } else {
        this.addForm.cate_level = 0;
        this.addForm.cate_pid = 0;
      }
    },
    async openAddDialog() {
       
      this.addForm.cate_level = 0;
      this.addForm.cate_pid = 0;
      this.addDialog = true;
       this.$nextTick(()=>{
                  this.$refs.addForm.resetFields()
        })
      const { data } = await this.$http.get("/categories", {
        params: { type: 2 },
      });
      if (!data) return;
      console.log(data);
      this.parentList = data;
    },
    handleSizeChange(val) {
      this.page.query.pagesize = val;
      this.getCateList();
    },
    handleCurrentChange(val) {
      this.page.query.pagenum = val;
      this.getCateList();
    },

    async getCateList() {
      const { data } = await this.$http.get("/categories", {
        params: this.page.query,
      });
      if (!data) return;
      this.cateList = data.result;
      this.page.total = data.total;
      console.log(data);
    },
  },
  filters: {
    getLevel(value) {
      const levelObj = {
        0: "一级",
        1: "二级",
        2: "三级",
      };
      return levelObj[value];
    },
    getLevelTagColor(value) {
      const levelObj = {
        0: "",
        1: "success",
        2: "warning",
      };
      return levelObj[value];
    },
  },
};
</script>

<style lang="scss" scoped>
$workingColor: #0ea2b5;

.working {
  color: $workingColor;
}
.unwork {
  color: red;
}
.event-group {
  display: flex;
  justify-content: center;
}
.el-cascader {
  width: 100%;
}
</style>

