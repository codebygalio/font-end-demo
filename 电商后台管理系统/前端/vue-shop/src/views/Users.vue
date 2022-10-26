<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :lg="6">
        <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUsersList">
          <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
        </el-input>
      </el-col>
      <el-col :lg="6">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table stripe border :data="usersList" style="width: 100%">
      <el-table-column align="center" label="#" type="index"> </el-table-column>
      <el-table-column prop="role_name" label="用户昵称"> </el-table-column>
      <el-table-column prop="username" label="用户账号"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            @change="userStateChanged(scope.row)"
            v-model="scope.row.mg_state"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-tooltip content="分配角色" placement="top" :enterable="false">
  <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
</el-tooltip>
          
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: null,
        pagenum: 1,
        pagesize: 100,
      },
      usersList: [],
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      const { data } = await this.$http.get("/users", {
        params: this.queryInfo,
      });
      console.log(data);
      console.log(!data);
      if (!data) return;
      this.usersList = data.users;
      console.log(this.usersList);
    },
    async userStateChanged(userinfo) {
      const {data} =  await this.$http.put(`/users/${userinfo.id}/state/${userinfo.mg_state}`)
      if(!data) return
      this.$message.success('更新用户状态成功!')
    },
  },
};
</script>

<style language="scss" scoped>
::v-deep .el-col {
  margin-bottom: 10px;
}
</style>