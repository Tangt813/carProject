<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24"><router-view name="top"></router-view></el-col>
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <router-view name="aside"></router-view>
      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
          </transition>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        loading: false
      }
    }
  }
</script>
