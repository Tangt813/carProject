<template>
<div class="box">
  <el-header>
    <div class="page_header">
      系统说明
    </div>
  </el-header>
  <el-main >
    <div id="system_description">
      <div class="text">系统具体功能：</div>
      <div class="text">输入：</div>
      <div class="text">输出：</div>
    </div>
  </el-main>

</div>
</template>

<script>
export default {
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive = true
    next(0)
  },
}
</script>

<style scoped>

</style>
