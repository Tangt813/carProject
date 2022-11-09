<template>
  <div class="box">
    <el-header>
      <div class="page_header">故障检测模型</div>
    </el-header>
    <el-main>
      <div class="parameter_part">
        <div class="part_header">模型参数</div>
        <div class="parameter_setting">
          <el-row :gutter="5">
            <el-col :span="4">
              <div class="cell-content bg-purple">模型</div>
            </el-col>
            <el-col :span="20">
              <div class="cell-content bg-purple">参数设置</div>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="4"><div class="cell-content bg-purple" >RF</div></el-col>
            <el-col :span="10" title="请输入200-300以内的值">
              <div class="parameter bg-purple cell-content" >
                <span >n_estimators:</span>
                <el-slider
                  v-model="n_estimators"
                  style="width: 80%;margin-left: 5px"
                  :max="300"
                  :min="200"
                  :step="1"
                  input-size="small"
                  show-input>
                </el-slider>
              </div>
            </el-col>
            <el-col :span="10" title="请输入10-100以内的值">
              <div class="parameter bg-purple cell-content">max_depth:&nbsp;&nbsp;
                <el-slider
                  v-model="RF_max_depth"
                  style="width: 80%;margin-left: 5px"
                  :max="100"
                  :min="10"
                  :step="1"
                  input-size="small"
                  show-input>
                </el-slider>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="4"><div class="cell-content bg-purple" >XGB</div></el-col>
            <el-col :span="20" title="请输入5-10以内的值">
              <div class="parameter bg-purple cell-content">max_depth:&nbsp;&nbsp;
                <el-slider
                  v-model="XGB_max_depth"
                  style="width: 90%;margin-left: 5px"
                  :max="10"
                  :min="5"
                  :step="1"
                  input-size="small"
                  show-input>
                </el-slider>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="4"><div class="cell-content bg-purple" >KNN</div></el-col>
            <el-col :span="20" :gutter="5" title="请输入5-10以内的值">
              <div class="parameter bg-purple cell-content">n_neighbors:
                <el-slider
                  v-model="n_neighbors"
                  style="width: 90%;margin-left: 5px"
                  :max="10"
                  :min="5"
                  :step="1"
                  input-size="small"
                  show-input>
                </el-slider>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="4"><div class="cell-content bg-purple">集成模型</div></el-col>
            <el-col :span="20" title="x,y,z总和为1">
              <el-col :span="8">
                <div class="parameter bg-purple cell-content">x:
                  <el-input
                    size="small"
                    style="width: 70%"
                    v-model="x">
                  </el-input>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="parameter bg-purple cell-content">y:
                  <el-input
                    size="small"
                    style="width: 70%"
                    v-model="y">
                  </el-input>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="parameter bg-purple cell-content">z:
                  <el-input
                    size="small"
                    style="width: 70%"
                    v-model="z">
                  </el-input>
                </div>
              </el-col>
            </el-col>
          </el-row>

        </div>
      </div>
      <div class="train">
        <el-button type="primary" @click="train()" :loading="waiting">训练模型</el-button>
        <span class="loading" v-loading="waiting"></span>
      </div>
      <div class="train_result">
        <div class="part_header">模型结果</div>
        <div class="train_set_result mt10" style="display: -webkit-box;">
          <div style="position: relative;top: 250px">训练集结果</div>
          <img class="picture ml20" id="train_set_result_table" >
          <img class="picture ml20" id="train_set_result_hot_page" >
        </div>
        <div class="test_set_result mt10" style="display: -webkit-box;">
          <div style="position: relative;top: 250px">测试集结果</div>
          <img class="picture ml20" id="test_set_result_table">
          <img class="picture ml20" id="test_set_result_hot_page" >
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import axios from "_axios@0.18.1@axios";
import util from "../../common/util";
export default {
  name: "faultDetectModel",
  data(){
    return{
      n_estimators:250,
      RF_max_depth:58,
      XGB_max_depth:6,
      n_neighbors:6,
      x:0.5,
      y:0.4,
      z:0.1,
      waiting:false,
    }
  },
  methods:{
    train(){
      this.waiting=true;
      if(parseFloat(this.x)+parseFloat(this.y)+parseFloat(this.z)!==1.0){
        this.$message.error('x,y,z之和不等于1!');
      }
      else{
        var url=util.faultDetectModelTrainUrl;
        axios.post(url,{
          n_estimators:this.n_estimators,
          RF_max_depth:this.RF_max_depth,
          XGB_max_depth:this.XGB_max_depth,
          n_neighbors:this.n_neighbors,
          x:this.x,
          y:this.y,
          z:this.z,
        }).then(function (res) {

          var train_set_result_table=document.getElementById('train_set_result_table');
          var train_set_result_hot_page=document.getElementById('train_set_result_hot_page');
          var test_set_result_table=document.getElementById('test_set_result_table');
          var test_set_result_hot_page=document.getElementById('test_set_result_hot_page');

          train_set_result_table.src=res.result.data;
          train_set_result_hot_page.src=res.result.data;
          test_set_result_table.src=res.result.data;
          test_set_result_hot_page.src=res.result.data;
        })
      }
      this.waiting=false;
    },
  }
}
</script>

<style scoped>

</style>
