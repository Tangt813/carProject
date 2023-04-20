<template>
  <div class="box">
    <el-header>
      <div class="page_header">故障检测模型</div>
<!--      <el-button @click="test"></el-button>-->
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
          <div style="position: relative;top: 250px;font-weight: bold">训练集结果</div>
          <table class="picture ml20" id="train_set_result_table" cellspacing="10" >
          </table>
          <img class="picture ml20" id="train_set_result_hot_page" >
        </div>
        <div class="test_set_result mt20" style="display: -webkit-box;">
          <div style="position: relative;top: 250px;font-weight: bold">测试集结果</div>
          <table class="picture ml20" id="test_set_result_table" cellspacing="10">
          </table>
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
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive = true
    next(0)
  },
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
    test()
    {
      var string= "               precision    recall  f1-score   support\n\n        157|4       0.87      0.67      0.76       286\n       2123|2       0.85      0.46      0.60       108\n       3826|0       0.96      0.63      0.76       492\n      4339|11       0.85      0.60      0.70       688\n     520243|1       0.77      0.60      0.68       446\n     520243|4       0.93      0.51      0.66       193\n     520266|4       0.82      0.46      0.59       249\n     520268|4       0.84      0.79      0.81       661\n     520462|0       0.80      0.45      0.57       141\n     520557|2       0.76      0.69      0.72       301\n     523010|1       0.85      0.61      0.71       294\n    523017|20       0.88      0.73      0.80       454\n      5393|22       0.81      0.30      0.44       225\n         98|0       0.83      0.61      0.70       157\nNormal|Normal       0.72      0.93      0.81      4305\n\n     accuracy                           0.77      9000\n    macro avg       0.84      0.60      0.69      9000\n weighted avg       0.79      0.77      0.76      9000\n";
      var list=string.split('\n');
      console.log(list);
      for(let i =0; i<list.length; i++)
      {
        var charList =list[i].split(' ');
        console.log(charList);
      }

    },
    train(){
      if(parseFloat(this.x)+parseFloat(this.y)+parseFloat(this.z)!==1.0){
        this.$message.error('x,y,z之和不等于1!');
      }
      else{
        this.$prompt('请输入模型名称', '模型名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '请输入名称'
        }).then(({ value }) => {
          // console.log(value)
          this.waiting=true;
          let that=this;
          var url=util.faultDetectModelTrainUrl;
          axios.get(url,{
            params:{
              n_estimators:this.n_estimators,
              RF_max_depth:this.RF_max_depth,
              XGB_max_depth:this.XGB_max_depth,
              n_neighbors:this.n_neighbors,
              x:this.x,
              y:this.y,
              z:this.z,
              model_name :value
            }
          }).then(function (res) {

            var train_set_result_hot_page=document.getElementById('train_set_result_hot_page');
            var test_set_result_hot_page=document.getElementById('test_set_result_hot_page');

            var train_set_result_table_string=res.data.result.test_data;
            train_set_result_hot_page.src=res.data.result.test_image;
            var test_set_result_table_string=res.data.result.train_data;
            test_set_result_hot_page.src=res.data.result.train_image;
            var train_set_result_table_string_list=train_set_result_table_string.split('\n');
            var test_set_result_table_string_list=test_set_result_table_string.split('\n');
            var train_set_result_table=document.getElementById('train_set_result_table');
            var test_set_result_table=document.getElementById('test_set_result_table');
            train_set_result_table.innerHTML='';
            test_set_result_table.innerText='';
            for(let i =0; i<train_set_result_table_string_list.length; i++)
            {
              var tr=document.createElement('tr');
              var charList =train_set_result_table_string_list[i].split(' ');
              if(i===0)
              {
                var td=document.createElement('td');
                tr.appendChild(td);
              }
              for(let j=0;j<charList.length;j++)
              {
                if(charList[j].replace(' ','').length!=0)
                {
                  if(charList[j]==='macro'||charList[j]==='weighted')
                  {
                    var td=document.createElement('td');
                    td.innerText=charList[j]+' '+charList[j+1];
                    j++;
                    tr.appendChild(td);
                  }
                  else
                  {
                    var td=document.createElement('td');
                    td.innerText=charList[j];
                    tr.appendChild(td);
                    if(charList[j]==='accuracy')
                    {
                      var td=document.createElement('td');
                      tr.appendChild(td);
                      td=document.createElement('td');
                      tr.appendChild(td);
                    }
                  }
                }

              }
              train_set_result_table.appendChild(tr);
            }

            for(let i =0; i<test_set_result_table_string_list.length; i++)
            {
              var tr=document.createElement('tr');
              var charList =test_set_result_table_string_list[i].split(' ');
              for(let j=0;j<charList.length;j++)
              {
                if(charList[j].replace(' ','').length!=0)
                {
                  if(charList[j]==='macro'||charList[j]==='weighted')
                  {
                    var td=document.createElement('td');
                    td.innerText=charList[j]+' '+charList[j+1];
                    j++;
                    tr.appendChild(td);
                  }
                  else{
                    var td=document.createElement('td');
                    td.innerText=charList[j];
                    tr.appendChild(td);
                    if(charList[j]==='accuracy')
                    {
                      var td=document.createElement('td');
                      tr.appendChild(td);
                      td=document.createElement('td');
                      tr.appendChild(td);
                    }
                  }
                }
              }
              test_set_result_table.appendChild(tr);
            }
            that.waiting=false;
          })
            .catch(()=>{
              this.$message.error('请先上传数据');
              that.waiting=false;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });

      }

    },
  }
}
</script>

<style scoped>

</style>
