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
        <el-select v-model="faultType" placeholder="故障类型选择" @change="changeFaultType">
          <el-option
            v-for="item in faultTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="content_box">

        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%"
          >

            <el-table-column
            prop="threshold"
            label="预警阈值"
            width="120">
            </el-table-column>

            <el-table-column
            prop="precision"
            label="准确度"
            width="120">
            </el-table-column>

            <el-table-column
            prop="missing"
            label="召回率"
            width="120">
            </el-table-column>

            <el-table-column
            prop="time_gap"
            label="预警时间差"
            width="120">
            </el-table-column>

            <el-table-column
            prop="time_gap"
            label="误报率"
            >
            </el-table-column>

          </el-table>
        </div>

        <div class="charts">
          <img id="pic" class="picture" >
        </div>

      </div>
    </el-main>
  </div>
</template>

<script>
import util from "../../common/util";
import axios from "axios";

export default {
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive = true
    next(0)
  },
  data() {
    return {
      faultType: '',
      faultTypeOptions: [
        {
          value: 1,
          label: '520243|1'
        },
        {
          value: 2,
          label: '523017|20'
        },
        {
          value: 3,
          label: '520557|2'
        },
        {
          value: 4,
          label: '520268|4'
        },
        {
          value: 5,
          label: '5393|22'
        },
        {
          value: 6,
          label: '520243|4'
        },
        {
          value: 7,
          label: '3826|0'
        },
        {
          value: 8,
          label: '4339|11'
        },
        {
          value: 9,
          label: '157|4'
        },
        {
          value: 10,
          label: '2123|2'
        },
        {
          value: 11,
          label: '520462|0'
        },
        {
          value: 12,
          label: '520266|4'
        },
        {
          value: 13,
          label: '98|0'
        },
        {
          value: 14,
          label: '523010|1'
        }
      ],
      tableData:[],
    }
  },
  methods: {
    changeFaultType() {
      let url = util.changeFaultTypeUrl;
      let that=this;
      axios.get(url, {
        params: {
          index: this.faultTypeOptions[this.faultType-1]['label'],
        }
      }).then(function (res) {
        console.log(res);
        var pic = document.getElementById('pic');
        pic.src=res.data.result.img;
        that.tableData=res.data.result.data;
      });
    }
  }
}
</script>

<style scoped>

</style>
