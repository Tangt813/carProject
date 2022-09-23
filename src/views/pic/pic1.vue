<template>
  <el-row class="wrap">
    <el-col  class="wrap-breadcrumb">
      <!--      <el-breadcrumb seporate="/">-->
      <!--        <el-breadcrumb-item :to="{ path: '/'}"><b>首页</b></el-breadcrumb-item>-->
      <!--      </el-breadcrumb>-->
      <el-col  class="wrap-main">
        <section class="chart-container">
          <el-row>
            <el-col style="width: 600px;height: 650px">
              <p>
                <el-dialog :visible.sync="upDialogFormVisible" >
                  <el-form :model="upForm">
                    <el-form-item :label-width="formLabelWidth" label="参数名称1">
                      <el-input v-model="upForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" label="参数名称2">
                      <el-select v-model="upForm.region" placeholder="请选择参数">
                        <el-option label="参数1一" value="shanghai"></el-option>
                        <el-option label="参数1二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-row  type="flex" justify="end">
                    <el-button @click="upDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="upDialogFormVisible = false">确 定</el-button>
                  </el-row>
                </el-dialog>
                <el-select v-model="areaValue" placeholder="功能区选择" style="margin-left: 35%" @change="changeAreaValue">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <div id="upperChart" style="width: 100%; height: 550px;"></div>
              <!--                            <div><img src="./图片1.png"></div>-->

            </el-col>
            <el-col style="width: 600px;height: 600px">
              <p>
<!--                <el-button style="margin-left: 100px;  color:#00C1DE; font-size: 20px ;"-->
<!--                           type="text" @click="downDialogFormVisible = true">参数调整-->
<!--                </el-button>-->
                <el-dialog :visible.sync="downDialogFormVisible" title="可选择参数" style="height: 550px">
                  <el-form :model="downForm">
                    <el-form-item :label-width="formLabelWidth" label="参数名称1">
                      <el-input v-model="downForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" label="参数名称2">
                      <el-select v-model="downForm.region" placeholder="请选择参数">
                        <el-option label="参数2一" value="shanghai"></el-option>
                        <el-option label="参数2二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-row  type="flex" justify="end">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </el-row>
                </el-dialog>

                <el-select v-model="areaValue2" placeholder="功能区选择" style="margin-left: 35%" @change="changeAreaValue">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <div id="downChart" style="width: 100%; height: 550px;"></div>
              <!--                            <div><img src="./图片1.png"></div>-->
            </el-col>
          </el-row>
        </section>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import echarts from 'echarts'
import axios from "axios";
import util from "../../common/util";

export default {

  data() {

    return {
      downDialogTableVisible: false,
      downDialogFormVisible: false,
      downForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },

      upDialogTableVisible: false,
      upDialogFormVisible: false,
      upForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      //数据
      upId: [],
      upAllChangeUpKwh: [],
      upAllChangeUpKwhLow: [],
      upAllChangeUpHKwh: [],
      upAllChangeUpHKwhLow: [],
      upAllChangeUpWKwh: [],
      upAllChangeUpWKwhLow: [],
      upThreeChangeUpLoad: [],
      upThreeChangeUpLoadLow: [],
      downId: [],
      downAllChangeUpKwh: [],
      downAllChangeUpKwhLow: [],
      downAllChangeUpHKwh: [],
      downAllChangeUpHKwhLow: [],
      downAllChangeUpWKwh: [],
      downAllChangeUpWKwhLow: [],
      downThreeChangeUpLoad: [],
      downThreeChangeUpLoadLow: [],

      //地区选择
      areaOptions: [{
        value: '1',
        label: '居民区'
      }, {
        value: '2',
        label: '工作区'
      }, {
        value: '3',
        label: '其他区'
      }, {
        value: '4',
        label: '所有区'
      }],

      //充电站选择
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
      upperOption: {
        title: {
          text: '调控区可上调潜力预测',
          textAlign: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: [
          {
            data: ['', '', '居民区(H)可上调潜力', '工作区(W)可上调潜力', '其他区(O)可上调潜力', '居民区(H)可上调潜力(意愿)',
              '工作区(W)可上调潜力(意愿)', '其他区(O)可上调潜力(意愿)', '总可上调潜力', '总可上调潜力(意愿)'],
            textStyle: {
              color: "black",
              fontSize: "10"
            }
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
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
          boundaryGap: false
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
          {
            name: '居民区(H)可上调潜力',
            type: 'line',
            color: "red"
          },
          {
            name: '居民区(H)可上调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "red",
              width: 4,
              type: 'dashed'
            }
          }
          ,
          {
            name: '工作区(W)可上调潜力',
            type: 'line',
            color: "blue"
          },
          {
            name: '工作区(W)可上调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "blue",
              width: 4,
              type: 'dashed'
            }
          },
          {
            name: '其他区(O)可上调潜力',
            type: 'line',
            color: "yellow"
          },
          {
            name: '其他区(O)可上调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "yellow",
              width: 4,
              type: 'dashed'
            }
          },
          {
            name: '总可上调潜力',
            type: 'line',
            areaStyle: {}
          },
          {
            name: '总可上调潜力(意愿)',
            type: 'line',
            areaStyle: {}
          }
        ]
      },
      downOption: {
        title: {
          text: '调控区可下调潜力预测'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {

          data: ['', '', '居民区(H)可下调潜力', '工作区(W)可下调潜力', '其他区(O)可下调潜力', '居民区(H)可下调潜力(意愿)', '',
            '工作区(W)可下调潜力(意愿)', '其他区(O)可下调潜力(意愿)', '总可下调潜力', '总可下调潜力(意愿)'],
          textStyle: {
            color: "black",
            fontSize: "10"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
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
          // data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
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
          {
            name: '居民区(H)可下调潜力',
            type: 'line',
            color: "red"
            // data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '居民区(H)可下调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "red",
              width: 4,
              type: 'dashed'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '工作区(W)可下调潜力',
            type: 'line',
            color: "blue",
            data: [21, 132, 141, 299, 210, 320, 340]
          },
          {
            name: '工作区(W)可下调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "blue",
              width: 4,
              type: 'dashed'
            },

            data: [211, 151, 109, 211, 266, 220, 140]
          },
          {
            name: '其他区(O)可下调潜力',
            type: 'line',
            color: "yellow",
            data: [21, 111, 155, 210, 216, 290, 340]
          },
          {
            name: '其他区(O)可下调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "yellow",
              width: 4,
              type: 'dashed'
            },
            data: [211, 121, 115, 110, 116, 220, 320]
          },
          {
            name: '总可下调潜力',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          },
          {
            name: '总可下调潜力(意愿)',
            data: [820, 932, 901, 100, 1000, 1330, 1320],
            type: 'line',
            areaStyle: {}

          }
        ]
      },
      areaValue: '4',
      areaValue2: '4'
      // stationValue: '1',
      // timeValue2: '1'
    }
  },
  created() {
    this.initUpAllData();
    this.initDownAllData();
  },

  mounted() {
    this.drawShape();
    this.changeAreaValue();
  },
  methods: {
    //函数
    initUpAllData() {
      //初始化函数

      let that = this;
      var tempId = [];
      let url = util.pic1UpRegulatedPotentialUrl;
      axios.get(url).then(function (res) {
        that.upAllChangeUpHKwh = res.data.allChangeUpHKwhList;
        that.upAllChangeUpHKwhLow = res.data.allChangeUpHKwhLowList;
        that.upAllChangeUpKwh = res.data.allChangeUpKwhList;
        that.upAllChangeUpKwhLow = res.data.allChangeUpKwhLowList;
        that.upAllChangeUpWKwh = res.data.allChangeUpWKwhList;
        that.upAllChangeUpWKwhLow = res.data.allChangeUpWKwhLowList;
        that.upThreeChangeUpKwh = res.data.threeChangeUpKwhList;
        that.upThreeChangeUpKwhLow = res.data.threeChangeUpKwhLowList;
        that.upperChart = echarts.init(document.getElementById('upperChart'));
        for (let i = 0; i < 1440; i++) {
          var h = i / 60;
          h = Math.floor(h);
          var m = i % 60;
          if (m.toString().length < 2) {
            m = '0' + m;
          }
          tempId.push(h + ":" + m);
        }
        that.upId = tempId;
        that.upperOption.xAxis.data = that.upId;
        // that.upperOption.legend[0].data=['居民区(H)可上调潜力','居民区(H)可上调潜力(意愿)'];
        var tempSeries = [
          {
            name: '居民区(H)可上调潜力',
            type: 'line',
            color: "red",
            data: that.upAllChangeUpHKwh
          },
          {
            name: '居民区(H)可上调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "red",
              width: 4,
              type: 'dashed'
            },
            data: that.upAllChangeUpHKwhLow
          }
          ,
          {
            name: '工作区(W)可上调潜力',
            type: 'line',
            color: "blue",
            data: that.upAllChangeUpWKwh
          },
          {
            name: '工作区(W)可上调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "blue",
              width: 4,
              type: 'dashed'
            },

            data: that.upAllChangeUpWKwhLow
          },
          {
            name: '其他区(O)可上调潜力',
            type: 'line',
            color: "yellow",
            data: that.upThreeChangeUpKwh
          },
          {
            name: '其他区(O)可上调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "yellow",
              width: 4,
              type: 'dashed'
            },
            data: that.upThreeChangeUpKwhLow
          },
          {
            name: '总可上调潜力',
            data: that.upAllChangeUpKwh,
            type: 'line',
            areaStyle: {
              color: '#F9E4D4',
            }
          },
          {
            name: '总可上调潜力(意愿)',
            data: that.upAllChangeUpKwhLow,
            type: 'line',
            areaStyle: {
              color: '#BAFFB4',
              opacity: 0.25
            }
          }
        ]
        that.upperOption.series = tempSeries;
        that.upperOption.legend = {
          top: "4%"
        }

        that.upperChart.setOption(that.upperOption);

      })
    },
    initDownAllData() {
      let that = this;
      let url = util.pic1DownRegulatedPotentialUrl;
      console.log("\u4e0b\u8c03\u4ef7\u683c");
      axios.get(url).then(function (res) {
        that.downAllChangeUpHKwh = res.data.allChangeDownHKwhList;
        that.downAllChangeUpHKwhLow = res.data.allChangeDownHKwhLowList;
        that.downAllChangeUpKwh = res.data.allChangeDownKwhList;
        that.downAllChangeUpKwhLow = res.data.allChangeDownKwhLowList;
        that.downAllChangeUpWKwh = res.data.allChangeDownWKwhList;
        that.downAllChangeUpWKwhLow = res.data.allChangeDownWKwhLowList;
        that.downThreeChangeUpKwh = res.data.threeChangeDownKwhList;
        that.downThreeChangeUpKwhLow = res.data.threeChangeDownKwhLowList;
        that.downChart = echarts.init(document.getElementById('downChart'));
        for (let i = 0; i < 1440; i++) {
          var h = i / 60;
          h = Math.floor(h);
          var m = i % 60;
          if (m.toString().length < 2) {
            m = '0' + m;
          }
          that.downId.push(h + ":" + m);
        }
        that.downOption.xAxis.data = that.downId;
        // that.downOption.legend[0].data=['居民区(H)可上调潜力','居民区(H)可上调潜力(意愿)'];
        var tempSeries = [
          {
            name: '居民区(H)可下调潜力',
            type: 'line',
            color: "red",
            data: that.downAllChangeUpHKwh
          },
          {
            name: '居民区(H)可下调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "red",
              width: 4,
              type: 'dashed'
            },
            data: that.downAllChangeUpHKwhLow
          }
          ,
          {
            name: '工作区(W)可下调潜力',
            type: 'line',
            color: "blue",
            data: that.downAllChangeUpWKwh
          },
          {
            name: '工作区(W)可下调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "blue",
              width: 4,
              type: 'dashed'
            },

            data: that.downAllChangeUpWKwhLow
          },
          {
            name: '其他区(O)可下调潜力',
            type: 'line',
            color: "yellow",
            data: that.downThreeChangeUpKwh
          },
          {
            name: '其他区(O)可下调潜力(意愿)',
            type: 'line',
            lineStyle: {
              color: "yellow",
              width: 4,
              type: 'dashed'
            },
            data: that.downThreeChangeUpKwhLow
          },
          {
            name: '总可下调潜力',
            data: that.downAllChangeUpKwh,
            type: 'line',
            areaStyle: {
              color: '#F9E4D4',
            }
          },
          {
            name: '总可下调潜力(意愿)',
            data: that.downAllChangeUpKwhLow,
            type: 'line',
            areaStyle: {
              color: '#BAFFB4',
              opacity: 0.25
            }
          }
        ]
        that.downOption.series = tempSeries;
        that.downOption.legend = {
          top: "4%"
        }
        console.log(that.downOption);
        that.downChart.setOption(that.downOption);

      })
    },

    changeTimeValue() {
      axios.get('http://localhost:521/user/all', {
        params: {
          area: this.areaValue,
          time: this.timeValue
        }
      }).then(function (response) {
        console.log(response);
        console.log(response.data.data)
      })
      console.log(this.areaValue,
        this.timeValue);
      // let obj = {};
      // obj = this.areaOptions.find((item) => {
      //   return item.value === this.timeValue;
      // });
      // console.log(obj.label);

    },
    changeAreaValue() {
      let that = this;
      that.upperOption.xAxis.data = that.upId;
      that.downOption.xAxis.data = that.downId;
      var upTempSeries = [];
      var downTempSeries = [];
      var upTempLegend = [
        {
          top: "4%",
          textVerticalAlign: 'auto',
          textStyle: {
            color: "black",
            fontSize: "12"
          }
        }
      ];
      var downTempLegend = [
        {
          top: "4%",
          textVerticalAlign: 'auto',
          textStyle: {
            color: "black",
            fontSize: "12"
          }
        }
      ]
      switch (this.areaValue) {
        case "1":
          upTempLegend.data = ['居民区(H)可上调潜力', '居民区(H)可上调潜力(意愿)'];
          upTempSeries = [{
            name: '居民区(H)可上调潜力',
            type: 'line',
            color: "red",
            data: that.upAllChangeUpHKwh
          },
            {
              name: '居民区(H)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "red",
                width: 4,
                type: 'dashed'
              },
              data: that.upAllChangeUpHKwhLow
            }];
          break;
        case "2":

          upTempLegend.data = ['工作区(W)可上调潜力', '工作区(W)可上调潜力(意愿)'];
          upTempSeries = [{
            name: '工作区(W)可上调潜力',
            type: 'line',
            color: "blue",
            data: that.upAllChangeUpWKwh
          },
            {
              name: '工作区(W)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "blue",
                width: 4,
                type: 'dashed'
              },

              data: that.upAllChangeUpWKwhLow
            }];
          break;

        case "3":

          upTempLegend.data = ['其他区(O)可上调潜力', '其他区(O)可上调潜力(意愿)'];
          upTempSeries = [{
            name: '其他区(O)可上调潜力',
            type: 'line',
            color: "yellow",
            data: that.upThreeChangeUpKwh
          },
            {
              name: '其他区(O)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "yellow",
                width: 4,
                type: 'dashed'
              },
              data: that.upThreeChangeUpKwhLow
            }];
          break;
        case "4":

          upTempLegend.data = ['', '', '居民区(H)可上调潜力', '工作区(W)可上调潜力', '其他区(O)可上调潜力', '居民区(H)可上调潜力(意愿)', '',
            '工作区(W)可上调潜力(意愿)', '其他区(O)可上调潜力(意愿)', '总可上调潜力', '总可上调潜力(意愿)'];
          upTempSeries = [
            {
              name: '居民区(H)可上调潜力',
              type: 'line',
              color: "red",
              data: that.upAllChangeUpHKwh
            },
            {
              name: '居民区(H)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "red",
                width: 4,
                type: 'dashed'
              },
              data: that.upAllChangeUpHKwhLow
            }
            ,
            {
              name: '工作区(W)可上调潜力',
              type: 'line',
              color: "blue",
              data: that.upAllChangeUpWKwh
            },
            {
              name: '工作区(W)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "blue",
                width: 4,
                type: 'dashed'
              },

              data: that.upAllChangeUpWKwhLow
            },
            {
              name: '其他区(O)可上调潜力',
              type: 'line',
              color: "yellow",
              data: that.upThreeChangeUpKwh
            },
            {
              name: '其他区(O)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "yellow",
                width: 4,
                type: 'dashed'
              },
              data: that.upThreeChangeUpKwhLow
            },
            {
              name: '总可上调潜力',
              data: that.upAllChangeUpKwh,
              type: 'line',
              areaStyle: {
                color: '#F9E4D4',

              }
            },
            {
              name: '总可上调潜力(意愿)',
              data: that.upAllChangeUpKwhLow,
              type: 'line',
              areaStyle: {
                color: '#BAFFB4',
                opacity: 0.25
              }
            }
          ];
          break;
      }
      switch (this.areaValue2) {
        case "1":
          downTempLegend.data = ['居民区(H)可下调潜力', '居民区(H)可下调潜力(意愿)'];
          downTempSeries = [{
            name: '居民区(H)可上调潜力',
            type: 'line',
            color: "red",
            data: that.downAllChangeUpHKwh
          },
            {
              name: '居民区(H)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "red",
                width: 4,
                type: 'dashed'
              },
              data: that.downAllChangeUpHKwhLow
            }];
          break;
        case "2":
          downTempLegend.data = ['工作区(W)可下调潜力', '工作区(W)可下调潜力(意愿)'];
          downTempSeries = [{
            name: '工作区(W)可上调潜力',
            type: 'line',
            color: "blue",
            data: that.downAllChangeUpWKwh
          },
            {
              name: '工作区(W)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "blue",
                width: 4,
                type: 'dashed'
              },

              data: that.downAllChangeUpWKwhLow
            }];
          break;
        case "3":
          downTempLegend.data = ['其他区(O)可下调潜力', '其他区(O)可下调潜力(意愿)'];
          downTempSeries = [
            {
              name: '其他区(O)可上调潜力',
              type: 'line',
              color: "yellow",
              data: that.downThreeChangeUpKwh
            },
            {
              name: '其他区(O)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "yellow",
                width: 4,
                type: 'dashed'
              },
              data: that.downThreeChangeUpKwhLow
            }];
          break;
        case "4":
          downTempLegend.data = ['', '', '居民区(H)可下调潜力', '工作区(W)可下调潜力', '其他区(O)可下调潜力', '居民区(H)可下调潜力(意愿)', '',
            '工作区(W)可下调潜力(意愿)', '其他区(O)可下调潜力(意愿)', '总可下调潜力', '总可下调潜力(意愿)'];
          downTempSeries = [
            {
              name: '居民区(H)可上调潜力',
              type: 'line',
              color: "red",
              data: that.downAllChangeUpHKwh
            },
            {
              name: '居民区(H)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "red",
                width: 4,
                type: 'dashed'
              },
              data: that.downAllChangeUpHKwhLow
            }
            ,
            {
              name: '工作区(W)可上调潜力',
              type: 'line',
              color: "blue",
              data: that.downAllChangeUpWKwh
            },
            {
              name: '工作区(W)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "blue",
                width: 4,
                type: 'dashed'
              },

              data: that.downAllChangeUpWKwhLow
            },
            {
              name: '其他区(O)可上调潜力',
              type: 'line',
              color: "yellow",
              data: that.downThreeChangeUpKwh
            },
            {
              name: '其他区(O)可上调潜力(意愿)',
              type: 'line',
              lineStyle: {
                color: "yellow",
                width: 4,
                type: 'dashed'
              },
              data: that.downThreeChangeUpKwhLow
            },
            {
              name: '总可上调潜力',
              data: that.downAllChangeUpKwh,
              type: 'line',
              areaStyle: {
                color: '#F9E4D4',
              }
            },
            {
              name: '总可上调潜力(意愿)',
              data: that.downAllChangeUpKwhLow,
              type: 'line',
              areaStyle: {
                color: '#BAFFB4',
                opacity: 0.25
              }
            }
          ];
      }
      ;
      that.upperOption.series = upTempSeries;
      that.upperOption.legend = upTempLegend;
      that.downOption.series = downTempSeries;
      that.downOption.legend = downTempLegend;
      that.downChart.clear();
      that.downChart.setOption(that.downOption);
      that.upperChart.clear();
      that.upperChart.setOption(that.upperOption);
    },

    changeStationValue() {
      axios.get('http://localhost:521/user/all', {
        params: {
          station: this.stationValue,
          time: this.timeValue2
        }
      }).then(function (response) {
        console.log(response);
        console.log(response.data.data)
      })
      console.log(this.stationValue,
        this.timeValue2);
      // let obj = {};
      // obj = this.areaOptions.find((item) => {
      //   return item.value === this.timeValue2;
      // });
      // console.log(obj.label);

    },
    changeTimeValue2() {
      axios.get('http://localhost:521/user/all', {
        params: {
          station: this.stationValue,
          time: this.timeValue2
        }
      }).then(function (response) {
        console.log(response);
        console.log(response.data.data)
      })
      console.log(this.stationValue,
        this.timeValue2);
      // let obj = {};
      // obj = this.areaOptions.find((item) => {
      //   return item.value === this.timeValue2;
      // });
      // console.log(obj.label);

    },
    drawShape() {
      this.upperChart = echarts.init(document.getElementById('upperChart'));
      this.downChart = echarts.init(document.getElementById('downChart'));
      this.upperChart.setOption(this.upperOption);
      this.downChart.setOption(this.downOption);
    }
  }
}
</script>

<style scoped>

.button1
{
  background-color: #00C1DE;
  color: white;
}

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

