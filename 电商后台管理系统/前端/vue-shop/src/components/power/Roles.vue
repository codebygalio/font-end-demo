<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" class="add-rules" >添加角色</el-button>
      <el-table border stripe :data="userList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- 展开内容 -->
            <!-- 渲染一级 -->
            <el-row
              v-for="(item, index) in props.row.children"
              :key="item.id"
              :class="[
                'mgleft',
                'bdbottom',
                'aligin-center',
                index == 0 ? 'bdtop' : '',
              ]"
            >
              <el-col :span="5">
                <div>
                  <el-tag closable @close="closeTag(props.row, item.id)">{{
                    item.authName
                  }}</el-tag
                  ><i class="el-icon-caret-right"></i>
                </div>
              </el-col>
              <el-col :span="19">
                <!-- 渲染二级 -->
                <el-row
                  :class="['aligin-center', index2 == 0 ? '' : 'bdtop']"
                  v-for="(subitem2, index2) in item.children"
                  :key="subitem2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="closeTag(props.row, subitem2.id)"
                      closable
                      type="success"
                      >{{ subitem2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 渲染三级 -->
                  <el-col :span="18">
                    <el-tag
                      @close="closeTag(props.row, subitem3.id)"
                      closable
                      type="warning"
                      v-for="(subitem3, subindex3) in subitem2.children"
                      :key="subitem3.id"
                      >{{ subitem3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 展开内容结束 -->
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" align="center">
        </el-table-column>

        <el-table-column label="角色名称" prop="roleDesc"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="rightDialog" width="50%" @close="closeDialog">
      <el-tree
        ref="rightsTree"
        :data="rightTree"
        :props="treeKeyValue"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="keys"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitTree">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色窗口 -->
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightDialog: false,
      setRoleDialog: false,
      userList: [],
      rightTree: [],
      treeKeyValue: {
        children: "children",
        label: "authName",
      },
      keys: [],
      roleId:''
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
 
    // 获得表格
    async getUserList() {
      const { data } = await this.$http.get("/roles");
      if (!data) return;
    //   console.log(data);
      this.userList = data;
    },
    // 表格关闭对话框
    async closeTag(roles, id) {
      const isConfirm = await this.$confirm(
        "此操作将删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((error) => error);
      if (isConfirm !== "confirm") return;
      const { data } = await this.$http.delete(
        `roles/${roles.id}/rights/${id}`
      );
      if (!data) return;
      roles.children = data;
      this.$message.success("删除权限成功");
    },
    // 打开设置权限对话框
    async showSetRightDialog(row) {
      this.roleId = row.id
     this.getKeyList(row.children,this.keys);
      const { data } = await this.$http.get("/rights/tree");
      if (!data) return;
      this.rightTree = data;
      this.rightDialog = true;
    },
    // 递归只获得最后一级ID
    getKeyList(list,arr) {
        // console.log('arr',arr)
       list.forEach(item => {
         if(item.children){
           return this.getKeyList(item.children,arr)
         }
           arr.push(item.id)
       })
    },
    // 关闭对话框
    closeDialog(){
        this.keys = []

    },
    // 更新指定角色权限
   async submitTree() {
        const keys = [
            ...this.$refs.rightsTree.getCheckedKeys(),
            ...this.$refs.rightsTree.getHalfCheckedKeys()
        ]
        let strKeys = keys.join(',')
        // console.log('keyid',strKeys)
        
      const {meta} =  await this.$http.post(`roles/${this.roleId}/rights`,{rids : strKeys})
        if(meta.status != 200) return
        this.$message.success(meta.msg)
        this.rightDialog = false && this.closeDialog()
        this.userList()
    //   console.log(res)
    //   console.log(this.$refs.rightsTree.getCheckedKeys());
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  min-width: 700px;
}
.mgleft {
  margin-left: 50px;
}
.el-tag {
  margin: 7px;
}
.add-rules {
  margin-bottom: 10px;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}
.aligin-center {
  display: flex;
  align-items: center;
}
</style>