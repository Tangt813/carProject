<template style="overflow-y: auto">

  <div style="height:1800px;width:1250px;background:white">

    <div style="height:600px;width:1250px;">
      <div style="width:600px;height:550px;margin-top:5px;float: left">
        <div style="text-align: center ;font-size: 26px">调度前的车-站 位置分布</div>
        <div class="map">
          <div id="mapContainerLeft">
          </div>
          <br>
          <el-button class="button1" @click="showLeftHeat">显示热力图
          </el-button>
          <el-button class="button1" @click="hideLeftHeat">隐藏热力图
          </el-button>


          <el-button :disabled="disabled1" class="button2" style="float: right ; background-color: #e62222"
                     @click="work">开始调度
          </el-button>
          <div style="float: right ;height: 40px">
            <el-tag id="car-number-label">

            </el-tag>
            <el-tag  id="station-number-label">

            </el-tag>

          </div>

        </div>
      </div>
      <div style="width:600px;height:550px;margin-top:5px;float: right;">
        <div style="text-align: center ;font-size: 26px">调度后的车-站 位置分布</div>
        <div class="map">
          <div id="mapContainerRight" v-loading="waiting">
          </div>
          <br>
          <el-button class="button1" @click="showRightHeat" :disabled="disabled2">显示热力图
          </el-button>
          <el-button class="button1" @click="hideRightHeat" :disabled="disabled2">隐藏热力图
          </el-button>
          <el-tag v-show="isShow" effect="dark" style="font-size: 22px;display: none" type="danger" id="cost_time" ></el-tag>
          <el-button :disabled="disabled2" class="button2" style="float: right;background-color: #8e9083"
                     @click="reback">重置
          </el-button>
        </div>

      </div>
    </div>
    <div style="height:550px;width:1250px;background:white">
      <el-table
        :cell-style="cellStyle"
        :current-page.sync="currentPage"
        :data="carOutputTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :header-cell-style="tableHeaderCellStyle"
        border
        class="xlsx"
        height="550"
        style="width: 98%">
        <el-table-column
          label="汽车编号"
          prop="car_no"
          width="80">
        </el-table-column>
        <el-table-column
          label="前往的充电站名称"
          prop="station_name"
          width="150">
        </el-table-column>
        <el-table-column
          label="行驶距离"
          prop="distance"
          width="180">
        </el-table-column>
        <el-table-column
          label="调度充电量"
          prop="delta"
          width="180">
        </el-table-column>
        <el-table-column
          label="原本充电费用"
          prop="cost_bef"
          width="180">
        </el-table-column>
        <el-table-column
          label="积分减免费用"
          prop="bonus"
          width="180">
        </el-table-column>
        <el-table-column
          label="经度"
          prop="latitude"
          width="140">
        </el-table-column>
        <el-table-column
          label="纬度"
          prop="longitude">
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          :page-size="pageSize"
          :page-sizes="[10, 15, 20]"
          :total="total"
          class="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <div style="height:350px;width:1250px;background:white;padding-top: 30px">
      <div id="compareChart" style="width: 100%; height: 550px; "></div>
    </div>
  </div>

</template>

<script>

import util from '../../common/util'
import axios from "_axios@0.18.1@axios";
import echarts from "_echarts@4.9.0@echarts";

let mapLeft
let mapRight
let heatmapOverlayLeft
let heatmapOverlayRight
let carLeft = []
let carRight = []
let chargeStationLeft = []
let chargeStationRight = []
let leftHeatIsPaint = false
let rightHeatIsPaint = false
let carLeftData = []
let stationLeftData = []
let carRightData = []
let stationRightData = []
export default {

  mounted() {
  },
  data() {
    return {
      disabled1: false,
      disabled2: true,
      waiting: false,
      isShow: false,
      real_time_car_data: [
        {
          name: "A1车",
          state: "行驶",
          capacity: ["40kWh", "SOC98%"],
          location: ["119°21'", "30°03'"],
        }
      ],
      real_time_charge_station: [
        {
          name: "a1站",
          pole_number: "12",
          usage_rate: "50%",
          power: "360kw",
          location: ["119°61'", "30°03'"]
        }
      ],
      loading: false,
      carOutputTableData: [],
      option: {
        title: {
          text: '调度前后对比'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['调度前', '调度后'],
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
          boundaryGap: false
        },
        yAxis: {
          name: '功率/Mw',
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
            name: '调度前',
            type: 'line',
            color: "blue"
          },
          {
            name: '调度后',
            type: 'line',
            color: 'red'
          }
        ]
      },
      Id: [],
      before: [],
      after: [],
      currentPage: 1,
      pageSize: 10,
      total: 0

    }
  },
  created() {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    tableHeaderCellStyle() {
      return 'border-color: #868686; color: #606266; background-color: #aaccee;'
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1) { //指定坐标
        return 'color:#00C1DE'
      } else {
        return ''
      }
    },
    showLeftHeat() {
      if (!leftHeatIsPaint) {
        leftHeatIsPaint = true;
        var res = []
        // console.log(carLeftData[1]['latitude']);
        for (let i = 0; i < carLeftData.length; i++) {
          // console.log(i)
          res.push(
            {"lat": carLeftData[i]['latitude'], "lng": carLeftData[i]['longitude']}
          )
        }

        for (let i = 0; i < stationLeftData.length; i++) {
          res.push(
            {"lat": stationLeftData[i]['latitude'], "lng": stationLeftData[i]['longitude'], "count": 50}
          )
        }
        heatmapOverlayLeft = new BMapLib.HeatmapOverlay({"radius": 20, "visible": true, "opacity": 70});

        // console.log(heatmapOverlayLeft);
        mapLeft.addOverlay(heatmapOverlayLeft);
        heatmapOverlayLeft.setDataSet({data: res, max: 200});//data是热力图的详细数据
        // console.log(heatmapOverlayLeft)
        for (let i = 0; i < carLeft.length; i++) {
          mapLeft.removeOverlay(carLeft[i]);
        }
        for (let i = 0; i < chargeStationLeft.length; i++) {
          mapLeft.removeOverlay(chargeStationLeft[i]);
        }
      }
    },
    hideLeftHeat() {
      mapLeft.removeOverlay(heatmapOverlayLeft);
      for (let i = 0; i < carLeft.length; i++) {
        mapLeft.addOverlay(carLeft[i]);
      }
      for (let i = 0; i < chargeStationLeft.length; i++) {
        mapLeft.addOverlay(chargeStationLeft[i]);
      }
      leftHeatIsPaint = false;
    },
    showRightHeat() {
      if (!rightHeatIsPaint) {
        rightHeatIsPaint = true;
        var res = []
        for (let i = 0; i < carRightData.length; i++) {
          res.push(
            {"lat": carRightData[i]['latitude'], "lng": carRightData[i]['longitude']}
          )
        }

        for (let i = 0; i < stationRightData.length; i++) {
          res.push(
            {
              "lat": stationRightData[i]['latitude'],
              "lng": stationRightData[i]['longitude'],
              "count": stationRightData[i]['cars_count'] * 10
            }
          )
        }
        heatmapOverlayRight = new BMapLib.HeatmapOverlay({"radius": 20, "visible": true, "opacity": 70});

        // console.log(heatmapOverlayRight);
        mapRight.addOverlay(heatmapOverlayRight);
        heatmapOverlayRight.setDataSet({data: res, max: 200});//data是热力图的详细数据
        for (let i = 0; i < carRight.length; i++) {
          mapRight.removeOverlay(carRight[i]);
        }
        for (let i = 0; i < chargeStationRight.length; i++) {
          mapRight.removeOverlay(chargeStationRight[i]);
        }
      }
    },
    hideRightHeat() {
      mapRight.removeOverlay(heatmapOverlayRight);
      for (let i = 0; i < carRight.length; i++) {
        mapRight.addOverlay(carRight[i]);
      }
      for (let i = 0; i < chargeStationRight.length; i++) {
        mapRight.addOverlay(chargeStationRight[i]);
      }
      rightHeatIsPaint = false;
    },
    initMap() {
//初始化左地图

      mapLeft = new BMap.Map("mapContainerLeft");
//设置地图的中心点
      var mainPoint = new BMap.Point(119.609375416, 29.8592444615);
// 初始化地图，设置中心点坐标和地图级别
      mapLeft.centerAndZoom(mainPoint, 10);
      mapLeft.enableScrollWheelZoom();

//只显示某个省份的关键代码
      var cityName = util.cityName;
//添加缩略地图控件
      mapLeft.addControl(new BMap.OverviewMapControl());
      mapLeft.addControl(new BMap.NavigationControl({
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: new BMap.Size(100, 100)
      }));
      var boundary = new BMap.Boundary();
      boundary.get(cityName, function (rs) {       //获取行政区域
        var EN_JW = "180, 90;";         //东北角
        var NW_JW = "-180,  90;";       //西北角
        var WS_JW = "-180, -90;";       //西南角
        var SE_JW = "180, -90;";        //东南角
//4.添加环形遮罩层
        var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,
          {strokeColor: "none", fillColor: "CornflowerBlue", fillOpacity: 1, strokeOpacity: 0.5}); //建立多边形覆盖物
        mapLeft.addOverlay(ply1);
      });
      //读取汽车数据
      let leftCarInputUrl = util.pic4CarInputSmallScale;
      axios.get(leftCarInputUrl).then(function (res) {
        var carNumberLabel=document.getElementById('car-number-label');
        carNumberLabel.innerText="汽车数量："+res.data.length+" ";

        for (let i = 0; i < res.data.length; i++) {
          carLeftData.push(res.data[i]);
        }
        var points = [];
        for (let i = 0; i < carLeftData.length; i++) {
          var pt = new BMap.Point(carLeftData[i]['longitude'], carLeftData[i]['latitude']);
          points.push(pt);
          // let carIcon = new BMap.Icon(require("../../assets/images/汽车俯视图.svg"), new BMap.Size(30, 30));
          // carIcon.opacity = 0.5;
          // carLeft[i] = new BMap.Marker(pt, {icon: carIcon});

          // carLeft[i].addEventListener("click", (e) => {
          //   var ops = {
          //     width: 250,
          //     title: "车辆实时信息"
          //   }
          //   var infoWindow = new BMap.InfoWindow("车编号:"+i+"<br>容量："+carLeftData[i]['maxPower']+"<br>SOC: "+carLeftData[i]['soc']+"<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)
          //   mapLeft.openInfoWindow(infoWindow, e.target.point);
          // })
        }
        var options = {// 地图显示图标样式
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: 'black'
        }
        var pointCollection = new BMap.PointCollection(points, options)
        mapLeft.addOverlay(pointCollection);

      });
      //读取充电站数据
      let leftStationInputUrl = util.pic4StationInputSmallScale;
      axios.get(leftStationInputUrl).then(function (res) {
        var stationNumberLabel=document.getElementById('station-number-label');
        stationNumberLabel.innerText="充电桩数量："+res.data.length+" ";
        for (let i = 0; i < res.data.length; i++) {
          stationLeftData.push(res.data[i]);
        }
        for (let i = 0; i < stationLeftData.length; i++) {
          var pt = new BMap.Point(stationLeftData[i]['longitude'].toFixed(10), stationLeftData[i]['latitude'].toFixed(10));
          let chargeIcon = new BMap.Icon(require("../../assets/images/充电站.svg"), new BMap.Size(30, 30));
          chargeStationLeft[i] = new BMap.Marker(pt, {icon: chargeIcon});
          chargeStationLeft[i].addEventListener("click", (e) => {
            var ops = {
              width: 250,
              title: "充电站实时信息"
            }
            var infoWindow = new BMap.InfoWindow("充电站编号:" + i
              + "<br>充电站名称：" + stationLeftData[i]['stationName']
              + "<br>位置:" + e.target.point.lng + "," + e.target.point.lat , ops)
            mapLeft.openInfoWindow(infoWindow, e.target.point);
          })
          mapLeft.addOverlay(chargeStationLeft[i]);
        }
      })

    },

    async work() {
      this.waiting = true;
      this.disabled2 = false;
      this.disabled1 = true;
      // var button= document.getElementsByClassName("workButton");
      this.loading = true;
      // await this.sleep(30000);
      //初始化右地图
      mapRight = new BMap.Map("mapContainerRight");



      let that=this;
      let workDataUrl=util.pic4WorkUrl;
      axios.get(workDataUrl).then(function (res){
        console.log(res);
        //读取充电站数据
        for (let i = 0; i < res.data['dic_out_station']['cars_count'].length; i++) {
          var temp=new Array();
          temp['cars_count']=res.data['dic_out_station']['cars_count'][i];
          temp['latitude']=res.data['dic_out_station']['latitude'][i];
          temp['longitude']=res.data['dic_out_station']['longitude'][i];
          temp['power']=res.data['dic_out_station']['power'][i];
          temp['station_name']=res.data['dic_out_station']['station_name'][i];
          stationRightData.push(temp);
        }
        for (let i = 0; i < stationRightData.length; i++) {
          var pt = new BMap.Point(stationRightData[i]['longitude'].toFixed(10), stationRightData[i]['latitude'].toFixed(10));
          let chargeIcon = new BMap.Icon(require("../../assets/images/充电站.svg"), new BMap.Size(30, 30));
          chargeStationRight[i] = new BMap.Marker(pt, {icon: chargeIcon});
          chargeStationRight[i].addEventListener("click", (e) => {
            var ops = {
              width: 250,
              title: "充电站实时信息"
            }
            var infoWindow = new BMap.InfoWindow("充电站编号:" + i + "<br>充电站名称：" + stationRightData[i]['station_name'] +
              "<br>该站点汽车数量： " + stationRightData[i]['cars_count'] + "<br>位置:" + e.target.point.lng + "," + e.target.point.lat , ops)
            mapRight.openInfoWindow(infoWindow, e.target.point);
          })
          mapRight.addOverlay(chargeStationRight[i]);
        }
        //读取汽车数据
        for (let i = 0; i < res.data['dic_out_car']['bonus'].length; i++) {
          var temp=new Array();
          temp['bonus']=res.data['dic_out_car']['bonus'][i];
          temp['car_no']=res.data['dic_out_car']['car_no'][i];
          temp['cost_bef']=res.data['dic_out_car']['cost_bef'][i];
          temp['delta']=res.data['dic_out_car']['delta'][i];
          temp['distance']=res.data['dic_out_car']['distance'][i];
          temp['latitude']=res.data['dic_out_car']['latitude'][i];
          temp['longitude']=res.data['dic_out_car']['longitude'][i];
          temp['station_name']=res.data['dic_out_car']['station_name'][i];
          carRightData.push(temp);
        }
        that.$data.total = res.data['dic_out_car']['bonus'].length;
        console.log("test1 " + res.data['dic_out_car']['bonus'].length)
        var points = [];
        for (let i = 0; i < carRightData.length; i++) {
          var pt = new BMap.Point(carRightData[i]['longitude'], carRightData[i]['latitude']);
          points.push(pt);
          mapRight.addOverlay(carRight[i]);
        }
        console.log(points)
        var options = {// 地图显示图标样式
          size: BMAP_POINT_SIZE_BIG,
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: 'black'
        }
        var pointCollection = new BMap.PointCollection(points, options)
        // var pointCollection = new BMap.PointCollection(points, {shape: BMAP_POINT_SHAPE_WATERDROP, size: 20})
        // console.log(pointCollection)
        mapRight.addOverlay(pointCollection);

        var tempId = [];
        //读取对比数据
        for (let i = 0; i < 144; i++) {
          var h = i / 6;
          h = Math.floor(h);
          var m = i % 6;
          m = m + "0";
          tempId.push(h + ":" + m);
        }
        that.Id = tempId;
        that.before = res.data['dic_out_power'].power_bef;
        that.after = res.data['dic_out_power'].power_aft;
        that.compareChart = echarts.init(document.getElementById('compareChart'));
        var tempSeries = [
          {
            name: '调度后',
            type: 'line',
            color: "red",
            data: that.after
          },
          {
            name: '调度前',
            type: 'line',
            color: "blue",
            data: that.before
          }

        ];
        that.option.legend = {
          top: "4%"
        }
        that.option.series = tempSeries;
        that.option.xAxis.data = that.Id;
        that.compareChart.setOption(that.option);

        var costTimeTag=document.getElementById('cost_time');
        costTimeTag.style.display="";
        costTimeTag.innerText="优化计算时间:"+(res.data['total_time']/1000).toFixed(2)+" s";
      });

      //设置地图的中心点
      var point = new BMap.Point(119.609375416, 29.8592444615);
// 初始化地图，设置中心点坐标和地图级别
      mapRight.centerAndZoom(point, 10);
      mapRight.enableScrollWheelZoom();

//只显示某个省份的关键代码
      var cityName = util.cityName;
//添加缩略地图控件
      mapRight.addControl(new BMap.OverviewMapControl());
      mapRight.addControl(new BMap.NavigationControl({
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: new BMap.Size(100, 100)
      }));
      var boundary = new BMap.Boundary();
      boundary.get(cityName, function (rs) {       //获取行政区域
        var EN_JW = "180, 90;";         //东北角
        var NW_JW = "-180,  90;";       //西北角
        var WS_JW = "-180, -90;";       //西南角
        var SE_JW = "180, -90;";        //东南角
//4.添加环形遮罩层
        var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,
          {strokeColor: "none", fillColor: "CornflowerBlue", fillOpacity: 1, strokeOpacity: 0.5}); //建立多边形覆盖物
        mapRight.addOverlay(ply1);
      });


      // // 读取充电站数据
      // let rightStationInputUrl = util.pic4StationOutputSmallScale;
      // axios.get(rightStationInputUrl).then(function (res) {
      //   console.log(res);
      //   for (let i = 0; i < res.data.length; i++) {
      //     stationRightData.push(res.data[i]);
      //   }
      //   for (let i = 0; i < stationRightData.length; i++) {
      //     var pt = new BMap.Point(stationRightData[i]['longitude'], stationRightData[i]['latitude']);
      //     let chargeIcon = new BMap.Icon(require("../../assets/images/充电站.svg"), new BMap.Size(30, 30));
      //     chargeStationRight[i] = new BMap.Marker(pt, {icon: chargeIcon});
      //     chargeStationRight[i].addEventListener("click", (e) => {
      //       var ops = {
      //         width: 250,
      //         title: "充电站实时信息"
      //       }
      //       var infoWindow = new BMap.InfoWindow("充电站编号:" + i + "<br>充电站名称：" + stationRightData[i]['stationName'] +
      //         "<br>该站点汽车数量： " + stationRightData[i]['carsCount'] + "<br>位置:" + e.target.point.lng + "," + e.target.point.lat , ops)
      //       mapRight.openInfoWindow(infoWindow, e.target.point);
      //     })
      //     mapRight.addOverlay(chargeStationRight[i]);
      //   }
      // })
      //
      // // 读取汽车数据
      // let rightCarInputUrl = util.pic4CarOutputSmallScale;
      // axios.get(rightCarInputUrl).then(function (res) {
      //   for (let i = 0; i < res.data.length; i++) {
      //     carRightData.push(res.data[i]);
      //   }
      //   that.$data.total = res.data.length;
      //   // console.log("test1 " + res.data.length)
      //   var points = [];
      //   for (let i = 0; i < carRightData.length; i++) {
      //     var pt = new BMap.Point(carRightData[i]['longitude'], carRightData[i]['latitude']);
      //     points.push(pt);
      //     // let carIcon = new BMap.Icon(require("../../assets/images/汽车俯视图.svg"), new BMap.Size(30, 30));
      //     // carIcon.opacity = 0.5;
      //     // carRight[i] = new BMap.Marker(pt, {icon: carIcon});
      //     //
      //     // carRight[i].addEventListener("click", (e) => {
      //     //   var ops = {
      //     //     width: 250,
      //     //     title: "车辆实时信息"
      //     //   }
      //     //   var infoWindow = new BMap.InfoWindow("车编号:"+i+"<br>容量："+carRightData[i]['maxPower']+"<br>SOC: "+carRightData[i]['soc']+"<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)
      //     //   mapRight.openInfoWindow(infoWindow, e.target.point);
      //     // })
      //
      //     mapRight.addOverlay(carRight[i]);
      //   }
      //
      //
      //   // console.log(points)
      //   var options = {// 地图显示图标样式
      //     size: BMAP_POINT_SIZE_BIG,
      //     shape: BMAP_POINT_SHAPE_CIRCLE,
      //     color: 'black'
      //   }
      //   var pointCollection = new BMap.PointCollection(points, options)
      //   // var pointCollection = new BMap.PointCollection(points, {shape: BMAP_POINT_SHAPE_WATERDROP, size: 20})
      //   // console.log(pointCollection)
      //   mapRight.addOverlay(pointCollection);
      // });
      //
      // this.initCompareData();
      that.carOutputTableData = carRightData;


      this.loading = false;
      this.waiting = false;
      this.isShow = true;
    },
    initCompareData() {
      let that = this;
      let url = util.pic4CompareDataUrl;
      var tempId = [];
      axios.get(url).then(function (res) {
        for (let i = 0; i < 144; i++) {
          var h = i / 6;
          h = Math.floor(h);
          var m = i % 6;
          m = m + "0";
          tempId.push(h + ":" + m);
        }
        that.Id = tempId;
        that.before = res.data.power_bef;
        that.after = res.data.power_aft;
        that.compareChart = echarts.init(document.getElementById('compareChart'));
        var tempSeries = [
          {
            name: '调度后',
            type: 'line',
            color: "red",
            data: that.after
          },
          {
            name: '调度前',
            type: 'line',
            color: "blue",
            data: that.before
          }

        ];
        that.option.legend = {
          top: "4%"
        }
        that.option.series = tempSeries;
        that.option.xAxis.data = that.Id;
        that.compareChart.setOption(that.option);
      })
    },
    reback() {
      this.disabled1 = false
      this.disabled2 = true

      mapRight.clearOverlays()
      this.carOutputTableData = []
      let myChart = echarts.init(document.getElementById("compareChart"))
      myChart.clear()
      this.total = 0
      this.isShow = false;

    }
  }
}
</script>
<style scoped type="text/css">

#mapContainerLeft {
  height: 100%
}


#mapContainerRight {
  height: 100%;
}


.map {
  width: 100%;
  height: 90%;
  float: left;
  margin-right: 1%;
  margin-left: 1%;
  border: 1px solid #464646;
  position: relative;
}

.button1 {
  background-color: #00C1DE;
  color: white;
}

.button2 {
  color: white;
  background-color: darkorange;
}

.xlsx {
  border: 1px solid #464646;
}

.anchorBL {
  display: none;
}

#car-number-label,
#station-number-label
{
  font-weight: 700;
  height: 40px;
  line-height: 3;
}
</style>


