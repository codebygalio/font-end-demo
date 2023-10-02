<template>
  <div>
    <el-card class="box-card">
 <div id='main' style="height:400px;width:50%;"></div>
</el-card>
  </div>
</template>

<script>
 import echarts from '../components/echarts.min'
export default {
data(){
    return {
      chartsConfig:{}
    }
},
mounted(){
  this.getChartsConfig()
},
methods:{
async getChartsConfig(){
const {data} =await this.$http.get('/reports/type/1')
if(!data) return
console.log(data)
this.chartsConfig = data
this.initEcharts()
},
initEcharts(){
let chartDom = document.getElementById('main');
let myChart = echarts.init(chartDom);
let option = {
  title: {
    text: 'Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
 
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  }
}

option = Object.assign(option, this.chartsConfig)
console.log(this.chartsConfig)
myChart.setOption(option)
}
}
}
</script>

<style>

</style>