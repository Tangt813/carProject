<template>
  <div class="box">
    <el-header>
      <div class="page_header">故障预警模型</div>
    </el-header>
    <el-main>
      <div>
        <div class="part_header">数据输入</div>
        <div style="text-align: center;font-weight: bold">导入汽车运行状态数据</div>
        <el-upload
          :action=this.faultAlarmModelUploadUrl
          :multiple="false"
          :on-success="handleSuccess"
          class="upload-demo"
          drag
          style="text-align: center">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text" style="align-content: center">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>

      <div class="mt10">
        <span class="part_header">模型选择</span>
        <span class="ml20">
          <el-select v-model="modelSelectValue" placeholder="请选择" style="width: 90%">
            <el-option
              v-for="item in modelList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </span>

      </div>


      <div class="mt10">
        <div class="part_header">模型参数</div>
        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">故障类型</div>
          </el-col>
          <el-col :span="20">
            <div class="cell-content bg-purple">预警阈值</div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">4339|11</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index4339_11"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">157|4</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index157_4"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">2123|2</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index2123_2"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">3826|0</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index3826_0"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">520243|1</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index520243_1"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">520243|4</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index520243_4"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">520266|4</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index520266_4"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">520268|4</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index520268_4"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">520462|0</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index520462_0"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">520557|2</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index520557_2"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">523010|1</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index523010_1"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">523017|20</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index523017_20"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">5393|22</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index5393_22"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="4">
            <div class="cell-content bg-purple">98|0</div>
          </el-col>
          <el-col :span="20" title="请输入0-1以内的值">
            <div class="parameter bg-purple cell-content">
              <el-slider
                v-model="index98_0"
                :max="1"
                :min=0
                :step="0.01"
                input-size="small"
                show-input
                style="width: 98%;margin-left: 5px">
              </el-slider>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="train">
        <el-button  type="primary" @click="train()">数据输出</el-button>
        <el-button id="stop-button" type="primary" @click="stopTrain()">暂停</el-button>
        <el-button id="kill-button" type="primary" @click="killTrain()" :disabled="killFlag">终止</el-button>
      </div>

      <div class="mt10">
        <div class="part_header">模型输出</div>
        <div class="mt10">
          <el-table
            :data="this.tableData"
            height="700px"
            width="100%">
            <el-table-column
              label="时间"
              prop="time"
            >
            </el-table-column>

            <el-table-column
              label="故障类型"
              prop="type"
              :filters="[{text: 'Alert1', value: 'Alert1'}, {text: 'Alert2', value: 'Alert2'}, {text: 'All is Well', value: 'All is well'}]"
              :filter-method="filterHandler"
            >
            </el-table-column>

            <el-table-column
              label="概率值"
              prop="probability">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import util from "../../common/util";
import axios from "axios";
import VueSocketio from 'vue-socket.io';
export default {
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive = true
    next(0)
  },
  data() {
    return {
      index4339_11: 0.35,
      index157_4: 0.45,
      index2123_2: 0.25,
      index3826_0: 0.75,
      index520243_1: 0.5,
      index520243_4: 0.3,
      index520266_4: 0.25,
      index520268_4: 0.4,
      index520462_0: 0.3,
      index520557_2: 0.5,
      index523010_1: 0.4,
      index523017_20: 0.3,
      index5393_22: 0.3,
      index98_0: 0.3,
      faultAlarmModelUploadUrl: util.faultAlarmModelUploadUrl,
      faultAlarmModelDataUrl: util.faultAlarmModelDataUrl,
      tableData: [],
      stopFlag:false,
      modelList:[],
      modelSelectValue:'',
      timer:'',
      killFlag:false,
    }
  },
  created() {
    this.timer = setInterval(this.updateModelList,5000);
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    updateModelList(){
      const url = util.modelListUrl;
      let that = this;
      axios.get(url).then(function (res) {
        that.modelList = res.data.result;
      })
    },
    handleSuccess(res) {
      if (res.code === "200") {
      } else {
        this.$message.error('上传错误，请检查文件是否符合规定');
      }
    },
    stopTrain(){
      this.stopFlag=!this.stopFlag;
      document.getElementById('stop-button').innerText=!this.stopFlag?"暂停":"继续"
    },
    killTrain(){
      const killUrl = util.killUrl;
      let that = this;
      axios.get(killUrl).then(function (res) {
        if (res.status===200){
          that.killFlag=true;
        }
      });
    },
    train() {
      this.killFlag=false;
      var json ={
        index4339_11: this.index4339_11,
        index157_4: this.index157_4,
        index2123_2: this.index2123_2,
        index3826_0: this.index3826_0,
        index520243_1: this.index520243_1,
        index520243_4: this.index520243_4,
        index520266_4: this.index520266_4,
        index520268_4: this.index520268_4,
        index520462_0: this.index520462_0,
        index520557_2: this.index520557_2,
        index523010_1: this.index523010_1,
        index523017_20: this.index523017_20,
        index5393_22: this.index5393_22,
        index98_0: this.index98_0,
        model_name: this.modelSelectValue,
      }
      this.$socket.emit('faultAlarmModelSocket',json);
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property].indexOf(value) !== -1;
    }
  },
  sockets:{
    model_output(data){
      if(!this.stopFlag)
      {
        this.tableData.unshift(data.data)
        if(this.tableData.length>500)
        {
          this.tableData=this.tableData.slice(0,500)
        }
      }
    }

  },
}
</script>

<style scoped>

</style>
