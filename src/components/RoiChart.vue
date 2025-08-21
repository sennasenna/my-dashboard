
<template>
  <div ref="chart" style="height: 300px; width: 100%;"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
const myChart = ref(null) // 保存实例

const props = defineProps({
  fetchApi: {
    type: Function,
    required: true
  },
  apiParams: {
    type: Object,
    default: () => ({})
  }
})


async function updateChart(){
  const roiData = await props.fetchApi(props.apiParams)
  myChart.value.setOption({
    xAxis: {
      type: 'category',
      data: roiData.map(item => item.cumulative_invest)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: roiData.map(item => item.cumulative_profit),
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ]
  })
}

onMounted(() => {
  myChart.value = echarts.init(chart.value)
  updateChart()
})

watch(() => props.apiParams, updateChart, { deep: true })

</script>
