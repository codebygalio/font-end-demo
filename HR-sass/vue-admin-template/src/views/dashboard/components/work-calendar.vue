<template>
<div class="q-container">
<el-row type="flex" justify="end">
     <el-select @change="dateChange" v-model="currentYear" placeholder="请选择" size="small">
    <el-option
      v-for="item in yearList"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
    <el-select@change="dateChange" v-model="currentMonth" placeholder="请选择" size="small" style="margin-left:10px">
    <el-option
      v-for="item in 12"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
</el-row>
<!-- 日历 -->
<el-calendar v-model="currentDate">
     <template
    slot="dateCell"
    slot-scope="{date, data}">
    <div class="date-content">
        <span class="text">{{ data.day | getDay }} </span>
        <span v-if="isRest(date,data)" class="rest">休</span>
    </div>
      
      
  </template>
</el-calendar>
</div>
</template>
<script>
export default {
    props:{
        stateDate: {
            type: Date,
            default: () => new Date()
        }
    },
data(){
return {
    value1:null,
    yearList:[],
currentYear: null,
currentMonth: null,
currentDate: null
}},
 created(){
        this.currentYear = this.stateDate.getFullYear()
        this.currentMonth = this.stateDate.getMonth() + 1
        this.yearList = Array.from(Array(11), (v, i)=>this.currentYear + i -5)
        this.dateChange()
    },
methods:{
    isRest(date,data){
        return date.getDay() === 6 || date.getDay() ===0
    },
    dateChange() {
        this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
        console.log('123')
    }
},filters:{
    getDay(val){
        const day = val.split('-')[2]
      return  day.startsWith('0') ? day.substr(1) : day
    }
}
}
</script>
<style lang="scss" scoped>
  ::v-deep  .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;
}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }

</style>