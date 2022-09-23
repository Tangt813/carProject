<template>
  <div style="height:700px;width:1200px;background:white">

    <div style="width:1200px;height:590px;margin-top:5px">
      <div class="map">
        <div id="container">
        </div>
        <br>
        <el-button @click="showGrid" class="button1">显示网格
        </el-button>
        <el-button @click="hideGrid" class="button1">隐藏网格
        </el-button>
        <div style="float: right" class="date">
          {{date}}
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import util from '../../common/util'

let map;
let boundary;
let polyline;
let boundaryIsPaint = false;
const gridPolyline = [];
let car=[];
let chargeStation=[]
export default {

  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  data() {
    return {
      date: new Date(),
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

    }
  },
  created() {
    this.$nextTick(() => {
      this.initMap()
    })

  },
  methods: {
    getBoundary() {
      if (!boundaryIsPaint) {
        // console.log(gridPolyline);
        boundary = new BMap.Boundary();
        const name = "杭州市滨江区";
        boundary.get(name, function (rs) {       //获取行政区域
          //map.clearOverlays();        //清除地图覆盖物
          var count = rs.boundaries.length; //行政区域的点有多少个
          for (var i = 0; i < count; i++) {
            polyline = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 4, fillColor: "none", strokeColor: "#ff0000"}); //建立多边形覆盖物

            map.addOverlay(polyline);  //添加覆盖物
            // var allOverlay = map.getOverlays();
            // console.log(allOverlay);

            boundaryIsPaint = true;
            // map.setViewport(ply.getPath());    //调整视野
          }
        });
      }
    },
    hideBoundary() {
      if (boundaryIsPaint) {
        map.removeOverlay(polyline);
        boundaryIsPaint = false;
      }

    },

    showGrid() {

      // const map = localStorage.getItem("map");
      this.getBoundary();
      var grid = new BMap.Polyline([], {strokeColor: "red"});
      var points = [];
      var newPoint;
      points[0] = [];
      newPoint =
        new BMap.Point(120.240762, 30.235695);
      points[0].push(newPoint);
      newPoint =
        new BMap.Point(120.237169, 30.224462);
      points[0].push(newPoint);
      newPoint =
        new BMap.Point(120.223227, 30.215849);
      points[0].push(newPoint);
      newPoint =
        new BMap.Point(120.193907, 30.200118);
      points[0].push(newPoint);
      newPoint =
        new BMap.Point(120.186002, 30.213227);
      points[0].push(newPoint);
      grid.setPath(points[0]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[1] = [];
      newPoint =
        new BMap.Point(120.223227, 30.215849);
      points[1].push(newPoint);
      newPoint =
        new BMap.Point(120.224521, 30.200868);
      points[1].push(newPoint);
      newPoint =
        new BMap.Point(120.209429, 30.197247);
      points[1].push(newPoint);
      newPoint =
        new BMap.Point(120.209861, 30.182075);
      points[1].push(newPoint);
      newPoint =
        new BMap.Point(120.228545, 30.182075);
      points[1].push(newPoint);
      grid.setPath(points[1]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[2] = [];

      newPoint =
        new BMap.Point(120.193907, 30.199557);
      points[2].push(newPoint);
      newPoint =
        new BMap.Point(120.195056, 30.19219);
      points[2].push(newPoint);
      newPoint =
        new BMap.Point(120.195488, 30.18245);
      points[2].push(newPoint);
      newPoint =
        new BMap.Point(120.209861, 30.182075);
      points[2].push(newPoint);
      grid.setPath(points[2]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[3] = [];
      newPoint =
        new BMap.Point(120.193907, 30.200118);
      points[3].push(newPoint);
      newPoint =
        new BMap.Point(120.166095, 30.188257);
      points[3].push(newPoint);
      newPoint =
        new BMap.Point(120.158909, 30.189381);
      points[3].push(newPoint);
      newPoint =
        new BMap.Point(120.154309, 30.184885);
      points[3].push(newPoint);
      newPoint =
        new BMap.Point(120.145973, 30.198745);
      points[3].push(newPoint);
      grid.setPath(points[3]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[4] = [];
      newPoint =
        new BMap.Point(120.154309, 30.184885);
      points[4].push(newPoint);
      newPoint =
        new BMap.Point(120.158477, 30.183824);
      points[4].push(newPoint);
      newPoint =
        new BMap.Point(120.195488, 30.18245);
      points[4].push(newPoint);
      grid.setPath(points[4]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[5] = [];
      newPoint =
        new BMap.Point(120.132894, 30.163717);
      points[5].push(newPoint);
      newPoint =
        new BMap.Point(120.155315, 30.174583);
      points[5].push(newPoint);
      newPoint =
        new BMap.Point(120.152441, 30.183199);
      points[5].push(newPoint);
      newPoint =
        new BMap.Point(120.154309, 30.184885);
      points[5].push(newPoint);
      grid.setPath(points[5]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[6] = [];
      newPoint =
        new BMap.Point(120.152441, 30.143106);
      points[6].push(newPoint);
      newPoint =
        new BMap.Point(120.16128, 30.149602);
      points[6].push(newPoint);
      newPoint =
        new BMap.Point(120.16243, 30.161094);
      points[6].push(newPoint);
      newPoint =
        new BMap.Point(120.155315, 30.174583);
      points[6].push(newPoint);
      grid.setPath(points[6]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[7] = [];
      newPoint =
        new BMap.Point(120.159484, 30.166714);
      points[7].push(newPoint);
      newPoint =
        new BMap.Point(120.170335, 30.17171);
      points[7].push(newPoint);
      newPoint =
        new BMap.Point(120.180899, 30.175457);
      points[7].push(newPoint);
      newPoint =
        new BMap.Point(120.180037, 30.177455);
      points[7].push(newPoint);
      newPoint =
        new BMap.Point(120.180252, 30.179078);
      points[7].push(newPoint);
      newPoint =
        new BMap.Point(120.18478, 30.179078);
      points[7].push(newPoint);
      newPoint =
        new BMap.Point(120.185139, 30.18295);
      points[7].push(newPoint);
      grid.setPath(points[7]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[8] = [];
      newPoint =
        new BMap.Point(120.188158, 30.153662);
      points[8].push(newPoint);
      newPoint =
        new BMap.Point(120.189882, 30.161781);
      points[8].push(newPoint);
      newPoint =
        new BMap.Point(120.194194, 30.168525);
      points[8].push(newPoint);
      newPoint =
        new BMap.Point(120.194697, 30.173084);
      points[8].push(newPoint);
      newPoint =
        new BMap.Point(120.189667, 30.173022);
      points[8].push(newPoint);
      newPoint =
        new BMap.Point(120.183312, 30.170567);
      points[8].push(newPoint);
      newPoint =
        new BMap.Point(120.180899, 30.175457);
      points[8].push(newPoint);
      grid.setPath(points[8]);
      gridPolyline.push(grid);
      map.addOverlay(grid);


      grid = new BMap.Polyline([], {strokeColor: "red"});

      points[9] = [];
      newPoint =
        new BMap.Point(120.194697, 30.173084);
      points[9].push(newPoint);
      newPoint =
        new BMap.Point(120.20174, 30.17196);
      points[9].push(newPoint);
      newPoint =
        new BMap.Point(120.205621, 30.173958);
      points[9].push(newPoint);
      newPoint =
        new BMap.Point(120.226102, 30.176643);
      points[9].push(newPoint);
      grid.setPath(points[9]);
      gridPolyline.push(grid);
      map.addOverlay(grid);

    },
    hideGrid() {
      this.hideBoundary();
      for (let i = 0; i < gridPolyline.length; i++) {
        map.removeOverlay(gridPolyline[i]);
      }
    },

    initMap() {

      map = new BMap.Map("container");
      //设置地图的中心点
      var point = new BMap.Point(119.609375416, 29.8592444615);
      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(point, 10);
      map.enableScrollWheelZoom();

      //只显示某个省份的关键代码
      var cityName = util.cityName;
      //添加缩略地图控件
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.NavigationControl({
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
        map.addOverlay(ply1);
      });
      //读取汽车数据
      for (var i = 0; i < util.carData.length; i++) {
        var pt = new BMap.Point(util.carData[i][0], util.carData[i][1]);
        let carIcon = new BMap.Icon(require("../../assets/images/汽车俯视图.svg"), new BMap.Size(30, 30));
        carIcon.opacity = 0.5;
        car[i] = new BMap.Marker(pt, {icon: carIcon});
        car[i].addEventListener("click", (e) => {
          var ops = {
            width: 250,
            title: "车辆实时信息"
          }
          var infoWindow = new BMap.InfoWindow("A1车 行驶<br>容量40kWh,SOC98%<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)
          map.openInfoWindow(infoWindow, e.target.point);
        })
        map.addOverlay(car[i]);
      }
      // console.log(car);
//读取充电站数据
      for (var i = 0; i < util.stationData.length; i++) {
        var pt = new BMap.Point(util.stationData[i][0], util.stationData[i][1]);
        let chargeIcon = new BMap.Icon(require("../../assets/images/充电站.svg"), new BMap.Size(30, 30));
        chargeStation[i] = new BMap.Marker(pt, {icon: chargeIcon});
        chargeStation[i].addEventListener("click", (e) => {
          var ops = {
            width: 250,
            title: "充电站实时信息"
          }
          var infoWindow = new BMap.InfoWindow("a1站 桩数12<br>使用率50%<br>功率360kw<br>位置(" + e.target.point.lng + "," + e.target.point.lat + ")", ops)
          map.openInfoWindow(infoWindow, e.target.point);
        })
        map.addOverlay(chargeStation[i]);
      }
    }
  }
}
</script>
<style type="text/css" scoped>
#container {
  height: 100%
}


.map {
  width: 100%;
  height: 100%;
  float: left;
  margin-right: 1%;
  margin-left: 1%;
  border: 1px solid #464646;
  position: relative;
}
.anchorBL{display:none;}

.date
{
  font-size: 15px;
}

.button1
{
  background-color: #00C1DE;
  color: white;
}
</style>
