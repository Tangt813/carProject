<template>
<div class="box">
  <el-header>
    <div class="page_header">故障预警模型</div>
  </el-header>
  <el-main>
    <div>
      <div class="part_header">模型输入</div>
      <div style="text-align: center;font-weight: bold">导入汽车运行状态数据</div>
      <el-upload
        :on-success="handleSuccess"
        action="http://124.71.131.138:5000/upload123123"
        class="upload-demo"
        drag
        multiple
        style="text-align: center">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" style="align-content: center">将文件拖到此处，或<em>点击上传</em></div>
        <!--    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
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
        <el-col :span="4"><div class="cell-content bg-purple" >4339|11</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold433911"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >157|4</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold1574"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >2123|2</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold21232"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >3826|0</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold38260"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >520243|1</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold5202431"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >520243|4</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold5202434"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >520266|4</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold5202664"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >520268|4</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold5202684"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >520462|0</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold5204620"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >520557|2</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold5205572"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >523010|1</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold5230101"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >523017|20</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold52301720"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >5393|22</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold539322"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="4"><div class="cell-content bg-purple" >98|0</div></el-col>
        <el-col :span="20" title="请输入0-1以内的值">
          <div class="parameter bg-purple cell-content">
            <el-slider
              v-model="threshold980"
              style="width: 98%;margin-left: 5px"
              :max="1"
              :min=0
              :step="0.01"
              input-size="small"
              show-input>
            </el-slider>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="mt10">
      <div class="part_header">模型输出</div>
      <div class="mt10">
        <el-table>

        </el-table>
      </div>
    </div>
  </el-main>
</div>
</template>

<script>
export default {
  name: "faultAlarmModel",
  data(){
    return{
      threshold433911:0.35,
      threshold1574:0.45,
      threshold21232:0.25,
      threshold38260:0.75,
      threshold5202431:0.5,
      threshold5202434:0.3,
      threshold5202664:0.25,
      threshold5202684:0.4,
      threshold5204620:0.3,
      threshold5205572:0.5,
      threshold5230101:0.4,
      threshold52301720:0.3,
      threshold539322:0.3,
      threshold980:0.3
    }
  }
}
</script>

<style scoped>

</style>
