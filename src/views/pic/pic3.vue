<template>
  <el-row class="wrap">
    <el-col :span="24" class="wrap-breadcrumb">
      <!--      <el-breadcrumb seporate="/">-->
      <!--        <el-breadcrumb-item :to="{ path: '/'}"><b>首页</b></el-breadcrumb-item>-->
      <!--      </el-breadcrumb>-->
      <el-col :span="24" class="wrap-main">
        <section class="chart-container">
          <el-row>

            <el-col :span="24"  style="width: 600px;height: 650px">
              <p align='center'>
                <!--                <el-select v-model="areaValue" placeholder="功能区选择">-->
                <!--                  <el-option-->
                <!--                    v-for="item in areaOptions"-->
                <!--                    :key="item.value"-->
                <!--                    :label="item.label"-->
                <!--                    :value="item.value">-->
                <!--                  </el-option>-->
                <!--                </el-select>-->
                <el-select v-model="timeValue" style="margin-left: 20px;" placeholder="时间段选择" @change="changeTimeValue">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <div id="taxiChart" style="width: 100%; height: 550px;"></div>
              <!--                            <div><img src="./图片1.png"></div>-->
            </el-col>
            <el-col :span="24 " style="width: 600px;height: 650px">

              <!--              <p align='center'>-->
              <!--                <el-select  v-model="stationValue" placeholder="充电站选择">-->
              <!--                  <el-option-->
              <!--                    v-for="item in stationOptions"-->
              <!--                    :key="item.value"-->
              <!--                    :label="item.label"-->
              <!--                    :value="item.value">-->
              <!--                  </el-option>-->
              <!--                </el-select>-->
              <!--                <el-select v-model="timeValue2" style="margin-left: 20px;" placeholder="时间尺度选择">-->
              <!--                  <el-option-->
              <!--                    v-for="item in timeOptions"-->
              <!--                    :key="item.value"-->
              <!--                    :label="item.label"-->
              <!--                    :value="item.value">-->
              <!--                  </el-option>-->
              <!--                </el-select>-->
              <!--              </p>-->
              <div id="privateChart" style="width: 100%; height: 590px; padding-top: 35px;"></div>
              <!--              <div><img src="./图片2.png"></div>-->
            </el-col>
          </el-row>
        </section>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import util from "../../common/util";

export default {

  data() {
    return {
      taxiId: [],
      taxiP_s: [],
      taxiP_eAndP_s: [],
      privateId: [],
      privateP_s: [],
      privateP_eAndP_s: [],
      areaOptions: [{
        value: '1',
        label: '居民区'
      }, {
        value: '2',
        label: '工作区'
      },
        {
          value: '3',
          label: '商业区'
        }, {
          value: '4',
          label: '景区'
        }],
      timeOptions: [{
        value: '1',
        label: '工作日'
      }, {
        value: '2',
        label: '非工作日'
      }],
      stationOptions: [{
        value: '1',
        label: '充电站1'
      }, {
        value: '2',
        label: '充电站2'
      },
        {
          value: '3',
          label: '充电站3'
        }, {
          value: '4',
          label: '充电站4'
        }],
      taxiOption: {
        title: {
          text: '出租车电网负荷'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['power_ev+power_social', 'power_social'],
          textStyle: {
            color: "black",
            fontSize: "16"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          },
          type: 'category',
          boundaryGap: false,
          data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
        },
        yAxis: {
          scale:true,
          splitLine: {
            show: false
          },
          type: 'value',
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          }
        },
        series: [

        ]
      },
      privateOption: {
        title: {
          text: '私家车电网负荷'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['power_ev+power_social', 'power_social'],
          textStyle: {
            color: "black",
            fontSize: "16"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          },
          type: 'category',
          boundaryGap: false,
          data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
        },
        yAxis: {
          scale:true,
          splitLine: {
            show: false
          },
          type: 'value',
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          }
        },
        series: [
        ]
      },
      areaValue: '1',
      timeValue: '1',
      stationValue: '1',
      timeValue2: '1'
    }
  },
  created() {
    this.initTaxiData();
    this.initPrivateData();
  },
  mounted() {
    this.drawShape();
    this.changeTimeValue();
  },
  methods: {
    initTaxiData() {
      let that = this;
      let url = util.pic3TaxiIntelligentAggregateResponseWorkdayUrl;
      var tempId = [];
      axios.get(url).then(function (res) {
        for (let i = 0; i < 144; i++) {
          var h = i / 6;
          h = Math.floor(h);
          var m = i % 6;
          m = m + "0";
          tempId.push(h + ":" + m);
        }
        that.taxiId = tempId;
        that.taxiP_s = res.data.p_s;
        console.log(that.taxiP_s);
        that.taxiP_eAndP_s = res.data.p_eAndp_s;
        that.taxiChart = echarts.init(document.getElementById('taxiChart'));
        var tempSeries = [
          {
            name: 'power_social',
            type: 'line',
            color: "blue",
            data: that.taxiP_s
          },
          {
            name: 'power_ev+power_social',
            type: 'line',
            color: "red",
            data: that.taxiP_eAndP_s
          }
        ];
        that.taxiOption.legend = {
          top: "4%"
        }
        that.taxiOption.series = tempSeries;
        that.taxiOption.xAxis.data = that.taxiId;
        that.taxiChart.setOption(that.taxiOption);
      })
    },
    initPrivateData() {
      let that = this;
      let url = util.pic3PrivateIntelligentAggregateResponseUrl;
      var tempId = [];
      axios.get(url).then(function (res) {
        for (let i = 0; i < 144; i++) {
          var h = i / 6;
          h = Math.floor(h);
          var m = i % 6;
          m = m + "0";
          tempId.push(h + ":" + m);
        }
        that.privateId = tempId;
        that.privateP_s = res.data.p_s;
        console.log(that.privateP_s);
        that.privateP_eAndP_s = res.data.p_eAndp_s;
        that.privateChart = echarts.init(document.getElementById('privateChart'));
        var tempSeries = [
          {
            name: 'power_social',
            type: 'line',
            color: "blue",
            data: that.privateP_s
          },
          {
            name: 'power_ev+power_social',
            type: 'line',
            color: "red",
            data: that.privateP_eAndP_s
          }
        ];
        that.privateOption.legend = {
          top: "4%"
        }
        that.privateOption.series = tempSeries;
        that.privateOption.xAxis.data = that.privateId;
        that.privateChart.setOption(that.privateOption);
      })
    },
    changeTimeValue() {
      let that = this;
      var tempSeries = [];
      let url = "";
      switch (that.timeValue) {
        case "1":
          url = util.pic3TaxiIntelligentAggregateResponseWorkdayUrl;
          break;
        case "2":
          url = util.pic3TaxiIntelligentAggregateResponseNonWorkdayUrl;
      }
      axios.get(url).then(function (res) {
        // console.log(url);
        that.taxiP_s = res.data.p_s;
        that.taxiP_eAndP_s = res.data.p_eAndp_s;
        that.taxiChart = echarts.init(document.getElementById('taxiChart'));
        tempSeries = [
          {
            name: 'power_social',
            type: 'line',
            color: "blue",
            data: that.taxiP_s
          },
          {
            name: 'power_ev+power_social',
            type: 'line',
            color: "red",
            data: that.taxiP_eAndP_s
          }
        ];
        that.taxiOption.series = tempSeries;
        that.taxiChart.setOption(that.taxiOption);
      })
    },
    drawShape() {
      this.taxiChart = echarts.init(document.getElementById('taxiChart'));
      this.privateChart = echarts.init(document.getElementById('privateChart'));
      this.taxiChart.setOption(this.taxiOption);
      this.privateChart.setOption(this.privateOption);
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.chart-container {
  width: 100%;
}

.chart-container .el-col {
  padding: 30px 20px;
}
</style>

