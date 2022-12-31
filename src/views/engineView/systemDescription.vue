<template>
  <div class="box">
    <el-header>
      <div class="page_header">
        系统说明
      </div>
    </el-header>
    <el-main>
      <div id="system_description">
        <div class="text"><span style="font-weight: bolder">系统整体功能：</span>监测发动机的实时运行状态数据，对可能发生的故障进行提前预警。</div>
        <div class="text mt20"><span style="font-weight: bolder">登陆界面：</span>输入用户名和密码后，即可使用本软件。</div>
        <div class="text mt20"><span style="font-weight: bolder">汽车监控数据界面：</span>按特定格式导入发动机历史故障数据，输入特征字段需包含：
          发动机特征数据（“DPF压差”、“ECU里程”、“Engine Speed”、“PTO开关”、“SCR上游温度”、“SCR下游温度”、“T4”、“T5”、“内部扭矩”、“再生请求”、“发动机累计运行时间”、“喷油量”、“大气压力”、“大气温度”、“实际轨压”、“尿素喷嘴占空比”、“尿素液位”、“尿素箱温度”、“怠速扭矩”、“总尿素消耗量”、“总油耗”、“扭矩百分比”、“排气流量”、“排气露点信息”、“摩擦扭矩”、“机油压力”、“氮氧值”、“水温”、“电瓶电压”、“瞬时油耗”、“累计碳氢喷射量”、“绝对增压压力”、“计量阀流量控制”、“车速”、“进气流量”、“进气温度”）及包含正常和故障类型的故障标签。
          软件会将上传数据转到后端用于后续模型的训练。
        </div>
        <div class="text mt20"><span style="font-weight: bolder">故障检测模型界面：</span>调用汽车监控数据界面所传数据进行训练。用户可根据需求分别调节模型训练的参数及各模型的权重，可调参数包括随机森林模型中的n_estimators=[200~300]，默认250，max_depth=[10~100]，默认58；XGB模型中的max_depth=[5~10]，默认6；K近邻模型中的n_neighbors=[5~10]，默认6以及集成模型的权重，需要注意的是，集成模型的权重和需为1。点击模型后，会输出模型训练集和测试集的结果，以方便用户进行调参。
        </div>
        <div class="text mt20"><span style="font-weight: bolder">预警阈值选择界面：</span>选择不同的故障类型，可以得到不同阈值下，包含故障准确度、召回率、预警时间差和误报率4个评价维度的图标信息，用户可根据自身需求选择合适的预警阈值，也可直接使用根据现有数据得到的各个故障的最优预警阈值。</div>
        <div class="text mt20"><span style="font-weight: bolder">故障预警模型：</span>用户导入包含训练模型时所需的发动机状态实时数据，并根据在预警阈值选择界面所选阈值对阈值进行修改，点击模型训练，即开始实时输出该时刻是否将会出现故障，如果将会发生故障，会输出发生故障的实时概率。模型运行时可通过暂停键来控制模型暂停及继续，以方便用户查看结果及实时调整故障阈值。</div>
        <div class="text mt20"><span style="font-weight: bolder">声明：</span>本软件模型基于BOSCH公司从2020年1月到2021年4月，共16个月对于华菱星马汽车(集团)股份有限公司旗下的货运车队的实时运行采集数据进行开发研究，最优效果对该车型较为适用，若其他车型使用该软件，应输入符合字段要求的数据，预测效能可能不及此车型，使用者可通过调试参数获得较优效果。</div>
        <div class="text mt20"><span style="font-weight: bolder">开发团队：</span>同济大学汽车学院（博世）汽车大数据联合实验室</div>
      </div>
    </el-main>

  </div>
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true
    next(0)
  },
}
</script>

<style scoped>

</style>
