<template>
  <div class="box">
    <el-header>
      <div class="page_header">
        预警阈值选择
      </div>
    </el-header>
    <el-main>
      <div style="text-align: center">
        <span>故障类型选择</span>
        <el-select v-model="faultType" placeholder="故障类型选择">
          <el-option
            v-for="item in faultTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="content_box">
        <div class="table">
        </div>
        <div class="charts">
          <div>

          </div>
        </div>
      </div>

    </el-main>
  </div>
</template>

<script>
export default {
  name: "alarmThresholdSelect",
  data() {
    return {
      faultType: '',
      faultTypeOptions: [
        {
          value: 1,
          label: 'Normal|Normal'
        },
        {
          value: 2,
          label: '520243|1'
        },
        {
          value: 3,
          label: '523017|20'
        },
        {
          value: 4,
          label: '520557|2'
        },
        {
          value: 5,
          label: '520268|4'
        },
        {
          value: 6,
          label:  '5393|22'
        },
        {
          value: 7,
          label: '520243|4'
        },
        {
          value: 8,
          label: '3826|0'
        },
        {
          value: 9,
          label: '4339|11'
        },
        {
          value: 10,
          label: '157|4'
        },
        {
          value: 11,
          label: '2123|2'
        },
        {
          value: 12,
          label: '520462|0'
        },
        {
          value: 13,
          label: '520266|4'
        },
        {
          value: 14,
          label:  '98|0'
        },
        {
          value: 15,
          label: '523010|1'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
