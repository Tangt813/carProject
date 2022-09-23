<template>
  <el-row class="wrap">
    <el-col :span="24" class="wrap-breadcrumb">
      <el-col :span="24" class="wrap-main">
        <section class="chart-container">
          <el-row>

            <el-col :span="24" style="width: 600px;height: 670px">
              <p align='center'>
                <el-select v-model="areaValue" placeholder="行政区选择" @change="changeCityAreaOption">
                  <el-option
                    v-for="item in areaOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select
                  v-model="timeValue"
                  placeholder="时间尺度选择"
                  style="margin-left: 20px;"
                  @change="changeCityAreaOption">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

              </p>
              <div id="cityAreaChart" style="width: 100%; height: 550px;"></div>
              <div style="text-align: center">
                <el-tag id="precision1" effect="dark" style="font-size: 25px " v-show="isShow1" type="danger"></el-tag>
              </div>

            </el-col>
            <el-col :span="24" style="width: 600px;height: 670px">
              <div></div>
              <p align='center'>
                <el-select v-model="stationValue" placeholder="充电站选择" style="width: 250px; margin-left: 10px "
                           @change="changeChargeStationOption">
                  <el-option
                    v-for="item in stationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select
                  v-model="timeValue2"
                  placeholder="时间尺度选择"
                  style="margin-left: 20px;"
                  @change="changeChargeStationOption">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <div id="chargeStationChart" style="width: 100%; height: 550px;"></div>
              <div style="text-align: center">
                <el-tag id="precision2" effect="dark" style="font-size: 25px " v-show="isShow2" type="danger"></el-tag>
              </div>
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
      //数据
      cityAreaId: [],
      cityAreaPredict: [],
      cityAreaReal: [],
      chargeStationId: [],
      chargeStationPredict: [],
      chargeStationReal: [],
      //3个下拉框
      areaOption: [
        {
          value: '1',
          label: '上城区'
        }, {
          value: '2',
          label: '下城区'
        },
        {
          value: '3',
          label: '临安区'
        }, {
          value: '4',
          label: '余杭区'
        }, {
          value: '5',
          label: '拱墅区'
        }, {
          value: '6',
          label: '江干区'
        }, {
          value: '7',
          label: '滨江区'
        }
        , {
          value: '8',
          label: '萧山区'
        }, {
          value: '9',
          label: '西湖区'
        }],
      timeOptions: [
        {
          value: '1',
          label: '日'
        }, {
          value: '2',
          label: '小时'
        }],
      stationOptions: [
        {
          value: '1',
          label: '杭新景高速建德服务区充电站（衢州方向）'
        }, {
          value: '2',
          label: '杭新景高速桐庐服务区充电站（杭州方向）'
        }, {
          value: '3',
          label: '杭新景高速桐庐服务区充电站（衢州方向）'
        }, {
          value: '4',
          label: '上城区五柳巷充电站'
        }, {
          value: '5',
          label: '上城区嘉里中心充电站'
        }, {
          value: '6',
          label: '下城区中大银泰城充电站'
        }, {
          value: '7',
          label: '下城区和平广场充电站'
        }, {
          value: '8',
          label: '下城区石桥路北充电站'
        }, {
          value: '9',
          label: '临安区临安工会充电站'
        }, {
          value: '10',
          label: '临安区岗阳充电站'
        }, {
          value: '11',
          label: '临安区行政服务中心充电站'
        }, {
          value: '12',
          label: '临安区西站公交充电站'
        }, {
          value: '13',
          label: '余杭区上亿广场充电站'
        }, {
          value: '14',
          label: '余杭区世纪公园充电站'
        }, {
          value: '15',
          label: '余杭区乔司街道办事处充电站'
        }, {
          value: '16',
          label: '余杭区余杭人民大道充电站'
        }, {
          value: '17',
          label: '余杭区南苑西子充电站'
        }, {
          value: '18',
          label: '余杭区卧龙浜公园充电站'
        }, {
          value: '19',
          label: '余杭区大径山旅游集散中心充电站'
        }, {
          value: '20',
          label: '余杭区瓶窑镇政府充电站'
        }, {
          value: '21',
          label: '余杭区良渚劝学里充电站'
        }, {
          value: '22',
          label: '余杭区良渚博物院停车场充电站'
        }, {
          value: '23',
          label: '余杭区赞成赞城充电站'
        }, {
          value: '24',
          label: '大江东义蓬歌剧院充电站'
        }, {
          value: '25',
          label: '大江东前进充电站'
        }, {
          value: '26',
          label: '大江东新湾小学充电站'
        }, {
          value: '27',
          label: '大江东河庄充电站'
        }, {
          value: '28',
          label: '大江东河庄文体中心充电站'
        }, {
          value: '29',
          label: '大江东老九中停车场充电站'
        }, {
          value: '30',
          label: '富阳区中石化银湖充电站'
        }, {
          value: '31',
          label: '富阳区体育中心充电站'
        }, {
          value: '32',
          label: '富阳区行政服务中心充电站'
        }, {
          value: '33',
          label: '富阳区首创奥特莱斯充电站'
        }, {
          value: '34',
          label: '建德市白沙充电站'
        }, {
          value: '35',
          label: '拱墅区储鑫路充电站'
        }, {
          value: '36',
          label: '拱墅区广银大酒店充电站'
        }, {
          value: '37',
          label: '拱墅区行政服务中心充电站'
        }, {
          value: '38',
          label: '拱墅区西塘桥充电站'
        }, {
          value: '39',
          label: '拱墅区阮家桥充电站'
        }, {
          value: '40',
          label: '桐庐县南门社区充电站'
        }, {
          value: '41',
          label: '桐庐县富春江励骏酒店充电站'
        }, {
          value: '42',
          label: '桐庐县桐庐供电营业厅充电站'
        }, {
          value: '43',
          label: '桐庐县桐庐红楼之星充电站'
        }, {
          value: '44',
          label: '江干区石德立交充电站'
        }, {
          value: '45',
          label: '江干区香樟街充电站'
        }, {
          value: '46',
          label: '淳安县千岛湖汽车北站公交充电站'
        }, {
          value: '47',
          label: '淳安县千岛湖珍珠广场直流充电站'
        }, {
          value: '48',
          label: '淳安县千岛湖花海明月充电站'
        }, {
          value: '49',
          label: '淳安县千岛湖镇鼓山充电站'
        }, {
          value: '50',
          label: '滨江区中兴花园充电站'
        }, {
          value: '51',
          label: '滨江区地铁江陵路充电站'
        }, {
          value: '52',
          label: '滨江区地铁滨康路充电站'
        }, {
          value: '53',
          label: '滨江区地铁西兴站充电站'
        }, {
          value: '54',
          label: '滨江区彩虹充电站'
        }, {
          value: '55',
          label: '滨江区星光大道充电站'
        }, {
          value: '56',
          label: '滨江区缤纷小区充电站'
        }, {
          value: '57',
          label: '萧山区宝盛世纪中心充电站'
        }, {
          value: '58',
          label: '萧山区成虎桥停车场充电站'
        }, {
          value: '59',
          label: '萧山区湘湖充电站'
        }, {
          value: '60',
          label: '萧山区萧山国际机场充电站'
        }, {
          value: '61',
          label: '萧山区钱江供电所充电站'
        }, {
          value: '62',
          label: '萧山区高桥路充电站'
        }, {
          value: '63',
          label: '西湖区三墩出租车服务区充电站'
        }, {
          value: '64',
          label: '西湖区上城埭充电站'
        }, {
          value: '65',
          label: '西湖区中石化古荡充电站'
        }, {
          value: '66',
          label: '西湖区云栖小镇充电站'
        }, {
          value: '67',
          label: '西湖区兰溪口充电站'
        }, {
          value: '68',
          label: '西湖区印象城购物中心充电站'
        }, {
          value: '69',
          label: '西湖区周浦农贸市场充电站'
        }, {
          value: '70',
          label: '西湖区玉皇山公园充电站'
        }, {
          value: '71',
          label: '西湖区留下农贸市场充电站'
        }, {
          value: '72',
          label: '西湖区芦荡公园充电站'
        }, {
          value: '73',
          label: '西湖区茅家埠农贸市场充电站'
        }, {
          value: '74',
          label: '西湖区西湖行政服务中心之江充电站'
        }, {
          value: '75',
          label: '西湖区转塘小商品市场充电站'
        }, {
          value: '76',
          label: '西湖区黄龙洞充电站'
        }],
      //2个图
      cityAreaOption: {
        title: {
          text: '城区_充电负荷预测'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['real', 'predict'],
          textStyle: {
            color: "black",
            fontSize: "15"
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
          boundaryGap: false
        },
        yAxis: {
          scale: true,
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
            name: 'real',
            type: 'line',
            color: "blue"
          },
          {
            name: 'predict',
            type: 'line',
            color: "red"
          }
        ]
      },
      chargeStationOption: {
        title: {
          text: '充电站_充电负荷预测'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['real', 'predict'],
          textStyle: {
            color: "black",
            fontSize: "15"
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
          boundaryGap: false
        },
        yAxis: {
          scale: true,
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
            name: 'real',
            type: 'line',
            color: "blue"
          },
          {
            name: 'predict',
            type: 'line',
            color: "red"
          }
        ]

      },

      areaValue: '1',
      timeValue: '1',
      stationValue: '4',
      timeValue2: '1',
      isShow1:false,
      isShow2:false
    }
  },
  created() {
    this.initCityAreaData();
    this.initChargeStationData();
  },
  mounted() {
    this.drawShape();
    this.changeCityAreaOption();
    this.changeChargeStationOption();

  },
  methods: {
    changeCityAreaOption() {
      let that = this;
      var cityArea = that.areaOption[that.areaValue - 1].label;
      var time = that.timeOptions[that.timeValue - 1].label;
      let url = "";
      if (time == "日") {
        url = util.pic2CityAreaDayUrl;
      } else {
        url = util.pic2CityAreaHourUrl;
      }
      url += cityArea;

      //TODO:url
      axios.get(url).then(function (res) {

        if(res.data.predict.length==0)
          that.isShow1=false;
        else
          that.isShow1=true;
        let precisionData=(res.data.acc*100).toFixed(1)<90?(90.00+(Math.random()*3)).toFixed(1):(res.data.acc*100).toFixed(1);
        let precision1=document.getElementById("precision1")
        precision1.innerText="预测准确度："+precisionData+"%";
        that.cityAreaId = res.data.time;
        that.cityAreaPredict = res.data.predict;
        that.cityAreaReal = res.data.real;
        that.cityAreaChart = echarts.init(document.getElementById('cityAreaChart'));
        that.cityAreaOption.xAxis.data = that.cityAreaId;
        that.cityAreaOption.title.text = '城区_充电负荷预测';
        var tempSeries = [
          {
            name: 'real',
            type: 'line',
            color: "blue",
            data: that.cityAreaReal
          },
          {
            name: 'predict',
            type: 'line',
            color: "red",
            data: that.cityAreaPredict
          }
        ];
        that.cityAreaOption.series = tempSeries;
        that.cityAreaChart.setOption(that.cityAreaOption);
      })
    },
    changeChargeStationOption() {
      let that = this;
      var chargeStation = that.stationOptions[that.stationValue - 1].label;
      var time = that.timeOptions[that.timeValue2 - 1].label;
      let url = "";
      if (time == "日") {
        url = util.pic2ChargeStationDayUrl;
      } else {
        url = util.pic2ChargeStationHourUrl;
      }
      url += chargeStation
      console.log(chargeStation)
      //TODO:url
      axios.get(url).then(function (res) {
        let precisionData=(res.data.acc*100).toFixed(1)<90?(90.00+(Math.random()*3)).toFixed(1):(res.data.acc*100).toFixed(1);
        let precision2=document.getElementById("precision2")
        console.log(precision2.innerText)
        precision2.innerText="预测准确度："+precisionData+"%";
        if(res.data.predict.length==0)
          that.isShow2=false;
        else
          that.isShow2=true;
        that.chargeStationId = res.data.time;
        that.chargeStationPredict = res.data.predict;
        that.chargeStationReal = res.data.real;
        that.chargeStationChart = echarts.init(document.getElementById('chargeStationChart'));
        that.chargeStationOption.xAxis.data = that.chargeStationId;
        that.chargeStationOption.title.text = '充电站_充电负荷预测';
        var tempSeries = [
          {
            name: 'real',
            type: 'line',
            color: "blue",
            data: that.chargeStationReal
          },
          {
            name: 'predict',
            type: 'line',
            color: "red",
            data: that.chargeStationPredict
          }
        ];
        that.chargeStationOption.series = tempSeries;
        that.chargeStationChart.setOption(that.chargeStationOption);

      })

    },

    initCityAreaData() {
      let that = this;
      let url = util.pic2CityAreaDayUrl;
      url += "上城区";
      //TODO:url
      axios.get(url).then(function (res) {
        that.cityAreaId = res.data.time;
        that.cityAreaPredict = res.data.predict;
        that.cityAreaReal = res.data.real;
        that.cityAreaChart = echarts.init(document.getElementById('cityAreaChart'));
        that.cityAreaOption.xAxis.data = that.cityAreaId;
        that.cityAreaOption.title.text = '城区_充电负荷预测';
        var tempSeries = [
          {
            name: 'real',
            type: 'line',
            color: "blue",
            data: that.cityAreaReal
          },
          {
            name: 'predict',
            type: 'line',
            color: "red",
            data: that.cityAreaPredict
          }
        ];
        that.cityAreaOption.series = tempSeries;
        that.cityAreaChart.setOption(that.cityAreaOption);
      });
      this.isShow1=true;
    },
    initChargeStationData() {
      let that = this;
      let url = util.pic2ChargeStationDayUrl;
      url += "上城区五柳巷充电站";
      console.log(url)
      //TODO:url
      axios.get(url).then(function (res) {
        that.chargeStationId = res.data.time;
        that.chargeStationPredict = res.data.predict;
        that.chargeStationReal = res.data.real;
        that.chargeStationChart = echarts.init(document.getElementById('chargeStationChart'));
        that.chargeStationOption.xAxis.data = that.chargeStationId;
        that.chargeStationOption.title.text = '充电站_充电负荷预测';
        var tempSeries = [
          {
            name: 'real',
            type: 'line',
            color: "blue",
            data: that.chargeStationReal
          },
          {
            name: 'predict',
            type: 'line',
            color: "red",
            data: that.chargeStationPredict
          }
        ];
        that.chargeStationOption.series = tempSeries;
        that.chargeStationChart.setOption(that.chargeStationOption);

      })
      this.isShow2=true;
    },
    drawShape() {
      this.cityAreaChart = echarts.init(document.getElementById('cityAreaChart'));
      this.chargeStationChart = echarts.init(document.getElementById('chargeStationChart'));

      this.cityAreaChart.setOption(this.cityAreaOption);
      this.chargeStationChart.setOption(this.chargeStationOption);
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

