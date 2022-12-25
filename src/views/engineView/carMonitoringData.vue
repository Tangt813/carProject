<template>
  <div class="box">
    <el-header>
      <div class="page_header">汽车监控数据</div>
    </el-header>
    <el-main>
      <div style="text-align: center;font-weight: bold">导入历史故障数据</div>
      <el-upload
        :action=this.carMonitoringImportFileUrl
        :on-success="handleSuccess"
        class="upload-demo"
        :multiple="false"
        drag
        style="text-align: center">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" style="align-content: center">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div id="car_monitoring_data_box" class="data_box">
        <div style="height:800px;width:98%;background:white">
          <el-table
            :current-page.sync="currentPage"
            :data="carMonitoringTableData"
            border
            class="xlsx"
            height="750"
            style="width: 98%">
            <el-table-column
              v-for="item in tableCol"
              :key="item"
              v-bind:label="item"
              v-bind:prop="item"
            >
            </el-table-column>

          </el-table>
          <el-pagination
            :page-size="pageSize"
            :total="total"
            :page-count="page_count"
            class="pagination"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>

      </div>
    </el-main>
  </div>

</template>

<script>
import axios from "axios";
import util from "../../common/util";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 1000,
      page_count:0,
      total: 0,
      carMonitoringTableData: [],
      tableCol: [],
      carMonitoringImportFileUrl: util.carMonitoringImportFileUrl
    }
  },
  methods: {
    handleSuccess(res) {
      // console.log(res)
      if (res.code === "200") {
        this.currentPage=1;
        this.carMonitoringTableData = res.result.rows_data;
        this.tableCol = res.result.col_index;
        this.total = res.result.total_count;
        this.page_count=res.result.page_num+1;

      } else {
        this.$message.error('上传错误，请检查文件是否符合规定');
      }

    },
    handleSizeChange(val) {
      this.pageSize = val;

    },
    handleCurrentChange(val) {
      this.currentPage = val;
      var url = util.carMonitoringChangePageUrl;
      let that = this;
      axios.get(url, {
        params: {
          page: val - 1
        }
      }).then(function (res) {
        // console.log(res);
        if (res.data.code === "200") {
          that.carMonitoringTableData = res.data.result.rows_data;
          that.tableCol = res.data.result.col_index;
        }
      })
    },
  },
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive = true
    next(0)
  }
}
</script>

<style scoped>

</style>
