<template>
<div ref="radarContainer" class="radar-container">
radar
</div>
</template>
<script>
// import * as echarts from 'echarts';
import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import {LegendComponent } from 'echarts/components';
echarts.use([
      RadarChart,
  LegendComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default {
    mounted(){
        var myChart = echarts.init(this.$refs.radarContainer);
        myChart.setOption({
  legend: {
    data: ['张三', '李四']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '工作效率', max: 100 },
      { name: '考勤', max: 100 },
      { name: '积极性', max: 100 },
      { name: '帮助同事', max: 100 },
      { name: '自主学习', max: 100 },
      { name: '正确率', max: 100 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [10, 100, 100, 0, 90, 70],
          name: '张三'
        },
        {
          value: [100, 100, 100, 100, 100, 100],
          name: '李四'
        }
      ]
    }
  ]
});
    }
}
</script>
<style lang="scss" scoped>
.radar-container{
    width: 600px;
    height: 400px;
}
</style>