<!--<template style="overflow-y: auto">-->

<!--  <div style="height:700px;width:1250px;background:white">-->

<!--    <div style="width:600px;height:550px;margin-top:5px;float: left">-->
<!--<div style="text-align: center ;font-size: 26px">调度前的车-站 位置分布</div>-->
<!--      <div class="map">-->
<!--        <div id="mapContainerLeft">-->
<!--        </div>-->
<!--        <br>-->
<!--        <el-button @click="showLeftHeat">显示热力图-->
<!--        </el-button>-->
<!--        <el-button @click="hideLeftHeat">隐藏热力图-->
<!--        </el-button>-->
<!--        <el-button @click="work" class="workButton">开始调度-->
<!--        </el-button>-->
<!--      </div>-->

<!--    </div>-->

<!--    <div style="width:600px;height:550px;margin-top:5px;float: right;">-->
<!--      <div style="text-align: center ;font-size: 26px">调度后的车-站 位置分布</div>-->
<!--      <div class="map">-->
<!--        <div id="mapContainerRight">-->
<!--        </div>-->
<!--        <br>-->
<!--        <el-button @click="showRightHeat">显示热力图-->
<!--        </el-button>-->
<!--        <el-button @click="hideRightHeat">隐藏热力图-->
<!--        </el-button>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--import util from '../../../common/util'-->
<!--import axios from "_axios@0.18.1@axios";-->

<!--let mapLeft-->
<!--let mapRight-->
<!--let heatmapOverlayLeft-->
<!--let heatmapOverlayRight-->
<!--let carLeft=[]-->
<!--let carRight=[]-->
<!--let chargeStationLeft=[]-->
<!--let chargeStationRight=[]-->
<!--let leftHeatIsPaint = false-->
<!--let rightHeatIsPaint = false-->
<!--let carLeftData=[]-->
<!--let stationLeftData=[]-->
<!--let carRightData=[]-->
<!--let stationRightData=[]-->
<!--export default {-->

<!--  mounted() {-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      real_time_car_data: [-->
<!--        {-->
<!--          name: "A1车",-->
<!--          state: "行驶",-->
<!--          capacity: ["40kWh", "SOC98%"],-->
<!--          location: ["119°21'", "30°03'"],-->
<!--        }-->
<!--      ],-->
<!--      real_time_charge_station: [-->
<!--        {-->
<!--          name: "a1站",-->
<!--          pole_number: "12",-->
<!--          usage_rate: "50%",-->
<!--          power: "360kw",-->
<!--          location: ["119°61'", "30°03'"]-->
<!--        }-->
<!--      ],-->

<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.$nextTick(() => {-->
<!--      this.initMap()-->
<!--    })-->

<!--  },-->
<!--  methods: {-->
<!--    showLeftHeat() {-->
<!--      if (!leftHeatIsPaint) {-->
<!--        leftHeatIsPaint=true;-->
<!--        var res = []-->
<!--        for (let i = 0; i < util.carData.length; i++) {-->
<!--          res.push(-->
<!--            {"lat": util.carData[i][1], "lng": util.carData[i][0]}-->
<!--          )-->
<!--        }-->

<!--        for (let i = 0; i < util.stationData.length; i++) {-->
<!--          res.push(-->
<!--            {"lat": util.stationData[i][1], "lng": util.stationData[i][0], "count": 30}-->
<!--          )-->
<!--        }-->
<!--        heatmapOverlayLeft = new BMapLib.HeatmapOverlay({"radius": 20, "visible": true, "opacity": 70});-->

<!--        console.log(heatmapOverlayLeft);-->
<!--        mapLeft.addOverlay(heatmapOverlayLeft);-->
<!--        heatmapOverlayLeft.setDataSet({data: res, max: 100});//data是热力图的详细数据-->
<!--        for (let i = 0; i < carLeft.length; i++) {-->
<!--          mapLeft.removeOverlay(carLeft[i]);-->
<!--        }-->
<!--        for (let i = 0; i <chargeStationLeft.length; i++) {-->
<!--          mapLeft.removeOverlay(chargeStationLeft[i]);-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    hideLeftHeat() {-->
<!--      mapLeft.removeOverlay(heatmapOverlayLeft);-->
<!--      for (let i = 0; i < carLeft.length; i++) {-->
<!--        mapLeft.addOverlay(carLeft[i]);-->
<!--      }-->
<!--      for (let i = 0; i <chargeStationLeft.length; i++) {-->
<!--        mapLeft.addOverlay(chargeStationLeft[i]);-->
<!--      }-->
<!--      leftHeatIsPaint=false;-->
<!--    },-->
<!--    showRightHeat() {-->
<!--      if (!rightHeatIsPaint) {-->
<!--        rightHeatIsPaint=true;-->
<!--        var res = []-->
<!--        for (let i = 0; i < util.carData.length; i++) {-->
<!--          res.push(-->
<!--            {"lat": util.carData[i][1], "lng": util.carData[i][0]}-->
<!--          )-->
<!--        }-->

<!--        for (let i = 0; i < util.stationData.length; i++) {-->
<!--          res.push(-->
<!--            {"lat": util.stationData[i][1], "lng": util.stationData[i][0], "count": 100}-->
<!--          )-->
<!--        }-->
<!--        // var res = [{"count": 61, "lat": 30.262180897456524, "lng":120.18841266632081},-->
<!--        //   {"count": 100, "lat": 30.208457, "lng":120.21189800000002},-->
<!--        //   {"count": 70, "lat": 30.183806, "lng":120.26425300000005}];-->
<!--        heatmapOverlayRight = new BMapLib.HeatmapOverlay({"radius": 20, "visible": true, "opacity": 70});-->

<!--        // console.log(heatmapOverlayRight);-->
<!--        mapRight.addOverlay(heatmapOverlayRight);-->
<!--        heatmapOverlayRight.setDataSet({data: res, max: 100});//data是热力图的详细数据-->
<!--        for (let i = 0; i < carRight.length; i++) {-->
<!--          mapRight.removeOverlay(carRight[i]);-->
<!--        }-->
<!--        for (let i = 0; i <chargeStationRight.length; i++) {-->
<!--          mapRight.removeOverlay(chargeStationRight[i]);-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    hideRightHeat() {-->
<!--      mapRight.removeOverlay(heatmapOverlayRight);-->
<!--      for (let i = 0; i < carRight.length; i++) {-->
<!--        mapRight.addOverlay(carRight[i]);-->
<!--      }-->
<!--      for (let i = 0; i <chargeStationRight.length; i++) {-->
<!--        mapRight.addOverlay(chargeStationRight[i]);-->
<!--      }-->
<!--      rightHeatIsPaint=false;-->
<!--    },-->
<!--    initMap() {-->
<!--//初始化左地图-->
<!--      mapLeft = new BMap.Map("mapContainerLeft");-->
<!--//设置地图的中心点-->
<!--      var point = new BMap.Point(119.609375416, 29.8592444615);-->
<!--// 初始化地图，设置中心点坐标和地图级别-->
<!--      mapLeft.centerAndZoom(point, 10);-->
<!--      mapLeft.enableScrollWheelZoom();-->

<!--//只显示某个省份的关键代码-->
<!--      var cityName = util.cityName;-->
<!--//添加缩略地图控件-->
<!--      mapLeft.addControl(new BMap.OverviewMapControl());-->
<!--      mapLeft.addControl(new BMap.NavigationControl({-->
<!--        type: BMAP_NAVIGATION_CONTROL_LARGE,-->
<!--        anchor: BMAP_ANCHOR_TOP_LEFT,-->
<!--        offset: new BMap.Size(100, 100)-->
<!--      }));-->
<!--      var boundary = new BMap.Boundary();-->
<!--      boundary.get(cityName, function (rs) {       //获取行政区域-->
<!--        var EN_JW = "180, 90;";         //东北角-->
<!--        var NW_JW = "-180,  90;";       //西北角-->
<!--        var WS_JW = "-180, -90;";       //西南角-->
<!--        var SE_JW = "180, -90;";        //东南角-->
<!--//4.添加环形遮罩层-->
<!--        var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,-->
<!--          {strokeColor: "none", fillColor: "CornflowerBlue", fillOpacity: 1, strokeOpacity: 0.5}); //建立多边形覆盖物-->
<!--        mapLeft.addOverlay(ply1);-->
<!--      });-->
<!--      //读取汽车数据-->
<!--      let that = this;-->
<!--      let url = util.carInputSmallScale;-->
<!--      axios.get(url).then(function (res)-->
<!--        {-->
<!--          for (let i = 0; i <res.data.length; i++) {-->

<!--            that.carLeftData.push(res.data[i]);-->
<!--          }-->
<!--          for (let i = 0; i <that.carLeftData.length; i++) {-->
<!--            var pt = new BMap.Point(that.carLeftData[i]['latitude'], that.carLeftData[i]['longitude']);-->

<!--            let carIcon = new BMap.Icon(require("../../../assets/images/汽车俯视图.svg"), new BMap.Size(30, 30));-->
<!--            carIcon.opacity = 0.5;-->
<!--            carLeft[i] = new BMap.Marker(pt, {icon: carIcon});-->

<!--            carLeft[i].addEventListener("click", (e) => {-->
<!--              var ops = {-->
<!--                width: 250,-->
<!--                title: "车辆实时信息"-->
<!--              }-->
<!--              var infoWindow = new BMap.InfoWindow("车编号:"+i+"<br>容量："+that.carLeftData[i]['maxPower']+"<br>SOC: "+that.carLeftData[i]['soc']+"<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)-->
<!--              mapLeft.openInfoWindow(infoWindow, e.target.point);-->
<!--            })-->

<!--            mapLeft.addOverlay(carLeft[i]);-->

<!--          }-->

<!--        });-->
<!--      console.log(carLeft);-->


<!--//读取充电站数据-->
<!--      for (var i = 0; i < that.stationLeftData.length; i++) {-->
<!--        var pt = new BMap.Point(that.stationLeftData[i][0], that.stationLeftData[i][1]);-->
<!--        let chargeIcon = new BMap.Icon(require("../../../assets/images/充电站.svg"), new BMap.Size(30, 30));-->
<!--        chargeStationLeft[i] = new BMap.Marker(pt, {icon: chargeIcon});-->
<!--        chargeStationLeft[i].addEventListener("click", (e) => {-->
<!--          var ops = {-->
<!--            width: 250,-->
<!--            title: "充电站实时信息"-->
<!--          }-->
<!--          var infoWindow = new BMap.InfoWindow("a1站 桩数12<br>使用率50%<br>功率360kw<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)-->
<!--          mapLeft.openInfoWindow(infoWindow, e.target.point);-->
<!--        })-->
<!--        mapLeft.addOverlay(chargeStationLeft[i]);-->
<!--      }-->

<!--    },-->
<!--    work()-->
<!--    {-->
<!--      var button= document.getElementsByClassName("workButton");-->
<!--      button.loading=true;-->
<!--      //初始化右地图-->
<!--      mapRight = new BMap.Map("mapContainerRight");-->
<!--//设置地图的中心点-->
<!--      var point = new BMap.Point(119.609375416, 29.8592444615);-->
<!--// 初始化地图，设置中心点坐标和地图级别-->
<!--      mapRight.centerAndZoom(point, 10);-->
<!--      mapRight.enableScrollWheelZoom();-->

<!--//只显示某个省份的关键代码-->
<!--      var cityName = util.cityName;-->
<!--//添加缩略地图控件-->
<!--      mapRight.addControl(new BMap.OverviewMapControl());-->
<!--      mapRight.addControl(new BMap.NavigationControl({-->
<!--        type: BMAP_NAVIGATION_CONTROL_LARGE,-->
<!--        anchor: BMAP_ANCHOR_TOP_LEFT,-->
<!--        offset: new BMap.Size(100, 100)-->
<!--      }));-->
<!--      var boundary = new BMap.Boundary();-->
<!--      boundary.get(cityName, function (rs) {       //获取行政区域-->
<!--        var EN_JW = "180, 90;";         //东北角-->
<!--        var NW_JW = "-180,  90;";       //西北角-->
<!--        var WS_JW = "-180, -90;";       //西南角-->
<!--        var SE_JW = "180, -90;";        //东南角-->
<!--//4.添加环形遮罩层-->
<!--        var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,-->
<!--          {strokeColor: "none", fillColor: "CornflowerBlue", fillOpacity: 1, strokeOpacity: 0.5}); //建立多边形覆盖物-->
<!--        mapRight.addOverlay(ply1);-->
<!--      });-->
<!--//读取汽车数据-->
<!--      for (var i = 0; i < util.carData.length; i++) {-->
<!--        var pt = new BMap.Point(util.carData[i][0], util.carData[i][1]);-->
<!--        let carIcon = new BMap.Icon(require("../../../assets/images/汽车俯视图.svg"), new BMap.Size(30, 30));-->
<!--        carIcon.opacity = 0.5;-->
<!--        carRight[i] = new BMap.Marker(pt, {icon: carIcon});-->
<!--        carRight[i].addEventListener("click", (e) => {-->
<!--          var ops = {-->
<!--            width: 250,-->
<!--            title: "车辆实时信息"-->
<!--          }-->
<!--          var infoWindow = new BMap.InfoWindow("A1车 行驶<br>容量40kWh,SOC98%<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)-->
<!--          mapRight.openInfoWindow(infoWindow, e.target.point);-->
<!--        })-->
<!--        mapRight.addOverlay(carRight[i]);-->
<!--      }-->
<!--//读取充电站数据-->
<!--      for (var i = 0; i < util.stationData.length; i++) {-->
<!--        var pt = new BMap.Point(util.stationData[i][0], util.stationData[i][1]);-->
<!--        let chargeIcon = new BMap.Icon(require("../../../assets/images/充电站.svg"), new BMap.Size(30, 30));-->
<!--        chargeStationRight[i] = new BMap.Marker(pt, {icon: chargeIcon});-->
<!--        chargeStationRight[i].addEventListener("click", (e) => {-->
<!--          var ops = {-->
<!--            width: 250,-->
<!--            title: "充电站实时信息"-->
<!--          }-->
<!--          var infoWindow = new BMap.InfoWindow("a1站 桩数12<br>使用率50%<br>功率360kw<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)-->
<!--          mapRight.openInfoWindow(infoWindow, e.target.point);-->
<!--        })-->
<!--        mapRight.addOverlay(chargeStationRight[i]);-->
<!--      }-->
<!--      button.loading=false;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style type="text/css">-->
<!--#mapContainerLeft {-->
<!--  height: 100%-->
<!--}-->

<!--#mapContainerRight {-->
<!--  height: 100%;-->
<!--}-->


<!--.map {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  float: left;-->
<!--  margin-right: 1%;-->
<!--  margin-left: 1%;-->
<!--  border: 1px solid #464646;-->
<!--  position: relative;-->
<!--}-->

<!--.anchorBL{display:none;}-->
<!--</style>-->


