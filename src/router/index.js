
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'
import Home from '@/views/home.vue'
import NotFound from '../components/404.vue'
import Register from '../views/user/register'
import faultDetectModel from "@/views/engineView/faultDetectModel.vue";
import carMonitoringData from "@/views/engineView/carMonitoringData.vue";
import alarmThresholdSelect from "@/views/engineView/alarmThresholdSelect.vue";
import faultAlarmModel from "@/views/engineView/faultAlarmModel.vue";
import systemDescription from "@/views/engineView/systemDescription.vue";
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['../views/user/login'], resolve)

Vue.use(Router)

let router = new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      type: 'login',
      component: Login,
    },
    {
      path: '*',
      component: NotFound

    },
    {
      path:'/register',
      type:'register',
      component:Register,
      name:'register'
    },
    {
      path: '/carMonitoringData',
      type: 'home',
      name: '汽车监控数据',
      component: Home,
      meta:{
        keepAlive:true
      },
      children: [
        {
          path: '/carMonitoringData',
          name: '汽车监控数据',
          components: {
            default: carMonitoringData,
            top: TopNav,
            aside: LeftNav,
          },
          leaf: true, // 只有一个节点
          iconCls: 'el-icon-s-platform', // 图标样式class
          menuShow: true,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/faultDetectModel',
          components: {
            default: faultDetectModel,
            top: TopNav,
            aside: LeftNav
          },
          name: '故障检测模型',
          iconCls: 'el-icon-search',
          leaf: true, // 只有一个节点
          menuShow: true,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/alarmThresholdSelect',
          components: {
            default: alarmThresholdSelect,
            top: TopNav,
            aside: LeftNav
          },
          name: '预警阈值选择',
          iconCls: 'el-icon-thumb',
          leaf: true, // 只有一个节点
          menuShow: true,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/faultAlarmModel',
          components: {
            default: faultAlarmModel,
            top: TopNav,
            aside: LeftNav
          },
          name: '故障预警模型',
          iconCls: 'el-icon-s-order',
          leaf:true,
          menuShow: true,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/systemDescription',
          components: {
            default: systemDescription,
            top: TopNav,
            aside: LeftNav
          },
          name: '系统说明',
          iconCls: 'el-icon-s-tools',
          leaf:true,
          menuShow: true,
          meta:{
            keepAlive:true
          }
        },


      ]
    }
  ]
});


export default router
