<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :md="6">
          <el-input
            placeholder="请输入内容"
            v-model="requests.query"
            class="input-with-select"
            ><el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList"
            ></el-button
          ></el-input>
        </el-col>
      </el-row>
      <el-table border stripe="" :data="orderList" style="width: 100%">
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tag :type="scope.row.order_pay == 0 ? 'danger' : ''">{{
              scope.row.order_pay == 0 ? "未付款" : "已付款"
            }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column
        prop="order_pay"
        label="是否付款"
        >
      </el-table-column> -->
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.update_time | dayjs }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="openEditDialog"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-location-outline"
              size="mini"
              @click="openProgressDialog(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
        prop="update_time"
        label="下单时间"
        >
      </el-table-column> -->
      </el-table>
    </el-card>
    <!-- 编辑对话框 -->
    <el-dialog title="修改地址" :visible.sync="editDialog" width="50%">
      <!-- 编辑对话框内部 -->
      <el-form ref="form" label-width="100px">
        <el-form-item label="省市区/县">
          <el-cascader
          style="width:100%"
          v-model="putData.address1"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
    <el-input v-model="putData.address2"></el-input>
  </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialog = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
     <!-- 物流进度对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressDialog" width="50%">
      <!-- 物流进度对话框内部 -->
        <el-timeline :reverse="true">
    <el-timeline-item
      v-for="(item, index) in times"
      :key="index"
      :timestamp="item.time">
      {{item.context}}
    </el-timeline-item>
  </el-timeline>

      
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
const cityData = ()=> import( "./cityData")
export default {
  data() {
    return {
        progressDialog:false,
        putData:{

        },
      editDialog: false,
      requests: {
        query: "",
        pagenum: 1,
        pagesize: 30,
      },
      orderList: [],
      cityData,
      times:[
        {
            'time':'2020-02-17 22:41:24',
            'ftime':'2020-02-17 22:41:24',
            'context':'已签收,感谢使用顺丰,期待再次为您服务',
            'location':''
        },
        {
            'time':'2020-02-17 09:33:26',
            'ftime':'2020-02-17 09:33:26',
            'context':'快件交给xxx,正在派送途中',
            'location':''
        },
         {
            'time':'2020-02-17 09:32:16',
            'ftime':'2020-02-17 09:32:16',
            'context':'快件到达 【怀化市沅陵县二酉苗族乡合作点】',
            'location':''
        },
         {
            'time':'2020-02-13 18:39:21',
            'ftime':'2020-02-13 18:39:21',
            'context':'顺丰速运 已收取快件',
            'location':''
        }
      ]
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
     openProgressDialog(row){
        
        this.progressDialog = true
    },
    openEditDialog() {
      this.editDialog = true;
    },
    async getOrderList() {
      const { data } = await this.$http("/orders", { params: this.requests });
      if (!data) return;
      this.orderList = data.goods;
      //   console.log(this.orderList);
    },
  },
  filters: {
    dayjs(oldDate) {
      return dayjs(oldDate).format("YYYY-MM-DD  HH:mm:ss");
    },
  },
};
</script>

<style>
</style>