<template>
  <div class="diagnostic_report">
    <van-nav-bar
      title="诊断报告"
      left-arrow
      @click-left="goBackFn"
    />
    <div :class="['page-body-container',isShare?'page_body_h2':'page_body_h1']">
      <!-- 车辆 -->
      <div class="vehicle flex_r" v-if="templateItem.id">
        <img :src="templateItem.brandsPhoto?templateItem.brandsPhoto:require('@/assets/maintenance/default-img.png')" alt="品牌照片">
        <div class="color_1 v_content">
          <div class="size_15 margin_t_b" >
            <span class="font_w">{{`【${renderVehBand()}】${templateItem.plateNumber}`}}</span>
          </div>
          <div 
            v-if="!$route.query.share"
            class="flex_r size_14 margin_t_b" 
            @click="toPastDiagnosis">
            <span>既往诊断履历</span>
            <i class="iconfont icon-direction_right size_14"></i>
          </div>
        </div>
        <van-button 
          v-if="vehiclesColumns && vehiclesColumns.length>1 && !$route.query.share"
          round
          class="v_button"
          @click="switchVeh">切换车辆</van-button>
      </div>
      <!-- 车辆信息 -->
      <div class="card">
        <van-cell title="报告名称" :value="templateItem.checkTemplateName || '-'" />
        <van-cell title="检测日期" :value="renderDate() || '-'" />
        <van-cell title="车型" :value="renderModels() || '-'" />
        <van-cell title="车架号" :value="renderVin() || '-'" />
        <van-cell title="行驶里程" :value="renderMileage() || '-'" />
      </div>
      <!-- 模板信息 -->
      <div v-if="templateDetail && templateDetail.length ">
        <!-- 检查结论 -->
        <div class="card2">
          <div class="title">
            <span>检查结论</span>
          </div>
          <div class="content">
            <template v-if="templateItem.checkResultList">
              <div class="part " 
                v-for="(item,index) in templateItem.checkResultList"
                :key="index">
                  <span class="dot"></span>
                  <span >{{item.split('：')[0]}}：</span>
                  <span class="color_red">{{item.split('：')[1]}}</span>
              </div>
            </template>
          </div>
        </div>
        <template v-if="templateDetail.length">
          <div v-for="(list, ind) in templateDetail" :key="ind">
            <!-- 环车检查 -->
            <div class="card2" v-if="list.categoryCode == 'CheckAllCar'">
              <div class="title flex_r">
                <span>环车检查</span>
                <!-- <span class="num">（共4项）</span> -->
                <i :class="['iconfont', 'size_14',
                  ringCarShow?'icon-direction_up' :'icon-direction_down']"
                  @click="openProFn('ringCarShow')"></i>
              </div>
              <div class="content" v-show="ringCarShow">
                <div class="c_box">
                    <div class="c_img ">
                      <img src="@/assets/maintenance/image_check_car.png" alt="">
                      <template v-if="tagList">
                        <div class="tag_img"
                          v-for="(tag,i) in tagList" :key="i"
                          :style="{width: '4.3077%',
                            margin:'-4.231% 0px 0px -2.231%',
                            left:tag.left+'%',top:tag.top+'%'}"> 
                          <img v-if="tag.type == 'Line'" src="@/assets/light/Line@3x.png" alt="">
                          <img v-if="tag.type == 'Crack'" src="@/assets/light/Crack@3x.png" alt="">
                          <img v-if="tag.type == 'Uneven'" src="@/assets/light/Uneven@3x.png" alt="">
                          <img v-if="tag.type == 'Bad'" src="@/assets/light/Bad@3x.png" alt="">
                        </div>
                      </template>
                    </div>
                  
                  <div class="flex_r" style="flex-wrap:wrap;">
                    <div class="ring_car_i flex_r" >
                      <img src="@/assets/light/Line@3x.png" alt="">

                      <span>划痕</span>
                      <span>————</span>
                      <span>{{tagNum.Line}}</span>
                    </div>
                    <div class="ring_car_i flex_r" >
                      <img src="@/assets/light/Uneven@3x.png" alt="">
                      <span>凹陷</span>
                      <span>————</span>
                      <span>{{tagNum.Uneven}}</span>
                    </div>
                    <div class="ring_car_i flex_r" >
                      <img src="@/assets/light/Crack@3x.png" alt="">
                      <span>裂痕</span>
                      <span>————</span>
                      <span>{{tagNum.Crack}}</span>
                    </div>
                    <div class="ring_car_i flex_r" >
                      <img src="@/assets/light/Bad@3x.png" alt="">
                      <span>破损</span>
                      <span>————</span>
                      <span>{{tagNum.Bad}}</span>
                    </div>
                  </div>
                </div>
                <div class="c_box">
                  <div class="margin_t_b_4 color_9">
                    <span>检测备注：</span>
                  </div>
                  <div class="color_3">
                    <span>{{ringCarCheckRemark}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 仪表盘警示灯 -->
            <div class="card2" v-if="list.categoryCode == 'DashboardWarningLight'">
              <div class="title flex_r">
                <span>仪表盘警示灯</span>
                <i :class="['iconfont', 'size_14',
                  warningLightShow?'icon-direction_up' :'icon-direction_down']"
                  @click="openProFn('warningLightShow')"></i>
              </div>
              <div class="content" v-show="warningLightShow">
                <div class="light_box" >
                  <div 
                    :class="['light_div',list.itemList[0].result.optionResult[item] ? 'active' : '']"
                    v-for="(item, index) in list.itemList[0].options"
                    :key="index">
                    <i :class="['light_img',dashboardWarningLightImgs[item]]">
                    </i>
                    <div>
                      {{item}}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="margin_t_b_4 color_9">
                    <span>检测备注：</span>
                  </div>
                  <div class="color_3">
                    <span>{{ list.itemList[0].checkRemark  || '-'}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 灯光检查 -->
            <div class="card2" v-if="list.categoryCode == 'LightCheck'">
              <div class="title flex_r">
                <span>灯光检查</span>
                <i :class="['iconfont', 'size_14',
                  checkLightShow?'icon-direction_up' :'icon-direction_down']"
                  @click="openProFn('checkLightShow')"></i>
              </div>
              <div class="content" v-show="checkLightShow">
                <div class="light_box" >
                  <div 
                    :class="['light_div',list.itemList[0].result.optionResult[item] ? 'active' : '']"
                    v-for="(item, index) in list.itemList[0].options"
                    :key="index">
                    <i :class="['light_img',lightCheckImgs[item]]">
                    </i>
                    <div>
                      {{item}}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="margin_t_b_4 color_9">
                    <span>检测备注：</span>
                  </div>
                  <div class="color_3">
                    <span>{{ list.itemList[0].checkRemark || '-'}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 其他 -->
            <div v-if="!codeArr.includes(list.categoryCode)">
              <!-- 轮胎检查 -->
              <Inspection :listObj="list" />
              <!-- 检测报告图 -->
              <div class="card2" v-if="list.categoryCode == 'CheckAirConditioning'">
                <div class="title flex_r">
                  <span>检测报告图</span>
                  <i :class="['iconfont', 'size_14',
                    reportShow?'icon-direction_up' :'icon-direction_down']"
                    @click="openProFn('reportShow')"></i>
                </div>
                <div class="content" v-show="reportShow">
                  <div class="c_box">
                    <div class="c_img_box">
                      <img src="@/assets/maintenance/kt.png" alt="">
                    </div>
                    <div class="flex_r" style="flex-wrap:wrap;">
                      <div class="flex_r flex_item">
                        <span class="dot2"></span>
                        <span>
                          进气温度：
                          <span style="color:#00A5FF;"> 
                            {{
                              airConditioner.inletTemperature != 0
                              ? airConditioner.inletTemperature + "℃"
                              : "--"
                            }}
                          </span>
                        </span>
                      </div>
                      <div class="flex_r flex_item">
                        <span class="dot2"></span>

                        <span >
                          回风口温度：
                          <span style="color:#00A5FF;"> 
                            {{
                              airConditioner.returnOutletTemperature != 0
                              ? airConditioner.returnOutletTemperature + "℃"
                              : "--"
                            }}
                          </span>
                        </span>
                      </div>
                      <div class="flex_r flex_item">
                        <span class="dot2"></span>
                        <span>
                          出风口温度：
                          <span style="color:#00A5FF;"> 
                            {{
                              airConditioner.outletTemperature != 0
                              ? airConditioner.outletTemperature + "℃"
                              : "--"
                            }}
                          </span>
                        </span>
                      </div>
                      <div class="flex_r flex_item">
                        <span class="dot2"></span>
                        <span >
                          相对湿度：
                          <span style="color:#00A5FF;"> 
                            {{
                              airConditioner.relativeHumidity != 0
                              ? airConditioner.relativeHumidity + "%"
                              : "--"
                            }}  
                          </span>
                        </span>
                      </div>
                    </div>

                  </div>
                  <div class="c_box">
                    <div id="myChart"></div>
                    <div class="c_result flex_r">
                      <span>检测结果</span>
                      <span class="c_radio">
                        <van-radio-group v-model="radio"  direction="horizontal" >
                          <van-radio 
                            name="1" 
                            shape="square" 
                            :disabled='radio!=1' 
                            checked-color="#009622">良</van-radio>
                          <van-radio 
                            name="2" 
                            shape="square" 
                            :disabled='radio!=2' 
                            checked-color="#009622">不良</van-radio>
                        </van-radio-group>
                      </span>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 云诊车健康诊断 -->
            <div class="card2" v-if="list.categoryCode == 'VehicleHealth'&&healthMsg.id">
              <div class="title flex_r">
                <span>车辆健康诊断-云诊车</span>
                <i :class="['iconfont', 'size_14',
                  cloudCheckShow?'icon-direction_up' :'icon-direction_down']"
                  @click="openProFn('cloudCheckShow')"></i>
              </div>
              <div class="diagnosis-box" v-show="cloudCheckShow">
                <div class="diagnosis-tit">
                  系统故障码诊断结果汇总
                  <span style="float: right">
                    总体状态：
                    <span class="good"
                      v-if="
                          healthMsg.dtc_code01 == '良好' &&
                          healthMsg.dtc_code02 == '良好' &&
                          healthMsg.dtc_code03 == '良好' &&
                          healthMsg.dtc_code04 == '良好'
                      "
                    >良好</span>
                    <span
                      class="abnormal"
                      v-else
                    >异常</span>
                  </span>
                </div>
                <table class="diagnosis-table" cellspacing="0">
                  <tr>
                    <td class="td_w_1" align="center">1</td>
                    <td class="td_w_2">动力传动系统（发动机、变速箱等）</td>
                    <td>
                      <span
                        :class="
                          healthMsg.dtc_code01 == '良好' ? 'good' : 'abnormal'
                        "
                      >
                        {{ healthMsg.dtc_code01 }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="td_w_1" align="center">2</td>
                    <td class="td_w_2">底盘系统（ABS、防滑系统等）</td>
                    <td>
                      <span
                        :class="
                          healthMsg.dtc_code02 == '良好' ? 'good' : 'abnormal'
                        "
                      >
                        {{ healthMsg.dtc_code02 }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="td_w_1" align="center">3</td>
                    <td class="td_w_2">车身系统（车灯、车门锁、电动座椅等）</td>
                    <td>
                      <span
                        :class="
                          healthMsg.dtc_code03 == '良好' ? 'good' : 'abnormal'
                        "
                      >
                        {{ healthMsg.dtc_code03 }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="td_w_1" align="center">4</td>
                    <td class="td_w_2">网络系统（车载ECU之间的通信状况）</td>
                    <td>
                      <span
                        :class="
                          healthMsg.dtc_code04 == '良好' ? 'good' : 'abnormal'
                        "
                      >
                        {{ healthMsg.dtc_code04 }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" >
                      <span style="float: left;">
                        维修建议：
                      </span>
                      <div class="abnormal p_left" >
                        {{
                          healthMsg.suggestion_1
                            ? healthMsg.suggestion_1 + ";"
                            : ""
                        }}
                        {{
                          healthMsg.suggestion_2
                            ? healthMsg.suggestion_2 + ";"
                            : ""
                        }}
                        {{
                          healthMsg.suggestion_3
                            ? healthMsg.suggestion_3 + ";"
                            : ""
                        }}
                      </div>
                    </td>
                  </tr>
                </table>
                

                <div class="diagnosis-tit">
                  发动机动态诊断结果汇总
                  <span 
                    style="float: right"
                    v-if="healthMsg.health_diag_abnormal"
                  >
                    总体状态：
                    <span
                      class="abnormal"
                      v-if="
                        healthMsg.health_diag_abnormal.发动机动态检测汇总
                          .发动机动态检测建议图片 == 'check'
                      "
                    >异常</span>
                    <span
                      class="good"
                      v-if="
                        healthMsg.health_diag_abnormal.发动机动态检测汇总
                          .发动机动态检测建议图片 != 'check'
                      "
                    >
                      良好
                    </span>
                  </span>
                </div>
                <div class="diagnosis-list">
                  <div class="p_bottom">
                    <span style="float: left;">
                      诊断结果：
                    </span>
                    <div class="abnormal p_left" >
                      <span v-if="!healthMsg.health_diag_abnormal">-</span>
                      <span v-if="healthMsg.health_diag_abnormal">
                        {{
                          healthMsg.health_diag_abnormal.发动机动态检测汇总
                            .发动机动态检测结论
                            ? healthMsg.health_diag_abnormal.发动机动态检测汇总
                                .发动机动态检测结论
                            : "-"
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="p_bottom">
                    <span style="float: left;">
                      修理建议：
                    </span>
                    <div class="abnormal p_left" >
                      {{
                        healthMsg.suggestion_1 ? healthMsg.suggestion_1 + ";" : ""
                      }}
                      {{
                        healthMsg.suggestion_2 ? healthMsg.suggestion_2 + ";" : ""
                      }}
                      {{
                        healthMsg.suggestion_3 ? healthMsg.suggestion_3 + ";" : ""
                      }}
                      <span
                        v-if="
                          healthMsg.suggestion_1 == '' &&
                            healthMsg.suggestion_2 == '' &&
                            healthMsg.suggestion_3 == ''
                        "
                      >
                        -
                      </span>
                    </div>
                  </div>
                  <div class="p_bottom">
                    <span style="float: left;">
                      诊断方式：
                    </span>
                    <div class="p_left">
                      通过模拟启动、怠速、定速、油门全开等车辆行驶状态，检查发动机的健康状况。
                      可以与上次诊断结果（数值）相比较 进行确认。
                    </div>
                  </div>
                </div>
                <div class="diagnosis-tit">
                  系统故障码诊断详情信息
                  <!-- <span style="float: right">
                    总体状态：
                    <span class="abnormal">异常</span>
                  </span> -->
                </div>
                <div class="diagnosis-list">
                  <p>检测结果良好的系统：</p>
                  <!-- <ul class="good-ul">
                    <li>
                      ·ABS（防抱死制动系统）/VSC（车辆稳定性控制）/TRC（牵引力控制）
                    </li>
                  </ul> -->
                  <p
                    class="good"
                    v-if="healthMsg.system_fault_code_detail_good != ''"
                  >
                    {{ healthMsg.system_fault_code_detail_good || "" }}
                  </p>
                  <p
                    class="abnormal"
                    v-if="healthMsg.system_fault_code_detail_good == ''"
                  >
                    无
                  </p>
                  <p>系统故障码诊断结果：<span class="color_9">（水平滚动查看更多）</span></p>
                  <!-- <table class="diagnosis-table2" cellspacing="0">
                    <tr class="bg">
                      <td rowspan="2">系统名</td>
                      <td rowspan="2">故障码</td>
                      <td colspan="3" align="center">故障码状态</td>
                      <td rowspan="2">内容</td>
                    </tr>
                    <tr class="bg">
                      <td>现在</td>
                      <td>过去</td>
                      <td>待定</td>
                    </tr>
                    <tr>
                      <td colspan="6" align="center">无故障码</td>
                    </tr>
                  </table> -->
                  <div class="scroll_table">
                    <table class="diagnosis-table2" cellspacing="0">
                      <tr class="bg">
                        <td rowspan="2">系统名</td>
                        <td rowspan="2">故障码</td>
                        <td colspan="3" align="center">故障码状态</td>
                        <td rowspan="2">内容</td>
                      </tr>
                      <tr class="bg">
                        <td align="center">现在</td>
                        <td align="center">过去</td>
                        <td align="center">待定</td>
                      </tr>
                      <tr
                        v-if="!healthMsg.system_fault_code_detail_result"
                      >
                        <td colspan="6" align="center">无故障码</td>
                      </tr>
                      <tr
                        v-for="(list,
                        ind) in healthMsg.system_fault_code_detail_result"
                        :key="ind"
                      >
                        <td>{{ list.系统名 }}</td>
                        <td>{{ list.故障码 }}</td>
                        <td align="center">
                          <i
                            class="el-icon-success"
                            style="font-size: 16px"
                            v-if="list.故障码状态 == '现在'"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            class="el-icon-success"
                            style="font-size: 16px"
                            v-if="list.故障码状态 == '过去'"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            class="el-icon-success"
                            style="font-size: 16px"
                            v-if="list.故障码状态 == '待定'"
                          ></i>
                        </td>
                        <td>{{ list.内容 }}</td>
                      </tr>
                    </table>
                  </div>
                  
                </div>
                <div class="diagnosis-tit">
                  发动机动态诊断详情信息<span class="color_9">（水平滚动查看更多）</span>
                </div>
                <div class="diagnosis-list">
                  <p>发动机控制诊断结果：</p>
                  <div class="scroll_table">
                    <table class="diagnosis-table2" cellspacing="0">
                      <tr class="bg">
                        <td colspan="2">项目</td>
                        <td width="180">检测条件</td>
                        <td width="200">
                          本次（{{
                            healthMsg.health_diag_abnormal.本次诊断结果的日期
                          }}）
                        </td>
                        <td width="200">
                          上次（{{
                            healthMsg.health_diag_abnormal.上次诊断结果的日期
                          }}）
                        </td>
                        <td width="180">参考值</td>
                      </tr>
                      <!-- 启动 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果.启动
                        "
                      >
                        <td colspan="2">启动</td>
                        <td>启动</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .启动.启动
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .启动.启动
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果.启动
                              .启动.参考值
                          }}
                        </td>
                      </tr>
                      <!-- 发动机转速 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .发动机转速
                        "
                      >
                        <td colspan="2">发动机转速</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .发动机转速['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .发动机转速['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .发动机转速["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 空燃比气缸列1 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列1
                        "
                      >
                        <td rowspan="6">空燃比气缸列1</td>
                        <td rowspan="2">燃料系统1 状态</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1['燃料系统1 状态']['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1['燃料系统1 状态']['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列1["燃料系统1 状态"]["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列1
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1['燃料系统1 状态']['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1['燃料系统1 状态']['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列1["燃料系统1 状态"]["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列1
                        "
                      >
                        <td rowspan="2">短期燃料补正B1</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.短期燃料补正B1['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.短期燃料补正B1['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列1.短期燃料补正B1["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列1
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.短期燃料补正B1['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.短期燃料补正B1['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列1.短期燃料补正B1["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列1
                        "
                      >
                        <td rowspan="2">长期燃料补正B1</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.长期燃料补正B1['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.长期燃料补正B1['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列1.长期燃料补正B1["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列1
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.长期燃料补正B1['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列1.长期燃料补正B1['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列1.长期燃料补正B1["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 空燃比气缸列2 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列2
                        "
                      >
                        <td rowspan="6">空燃比气缸列2</td>
                        <td rowspan="2">燃料系统2 状态</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2['燃料系统2 状态']['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2['燃料系统2 状态']['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列2["燃料系统2 状态"]["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列2
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2['燃料系统2 状态']['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2['燃料系统2 状态']['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列2["燃料系统2 状态"]["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列2
                        "
                      >
                        <td rowspan="2">短期燃料补正B2</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.短期燃料补正B2['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.短期燃料补正B2['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列2.短期燃料补正B2["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列2
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.短期燃料补正B2['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.短期燃料补正B2['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列2.短期燃料补正B2["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列2
                        "
                      >
                        <td rowspan="2">长期燃料补正B2</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.长期燃料补正B2['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.长期燃料补正B2['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列2.长期燃料补正B2["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .空燃比气缸列2
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.长期燃料补正B2['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .空燃比气缸列2.长期燃料补正B2['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .空燃比气缸列2.长期燃料补正B2["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 发动机冷却水温 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .发动机冷却水温
                        "
                      >
                        <td colspan="2">发动机冷却水温</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .发动机冷却水温['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .发动机冷却水温['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .发动机冷却水温["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 燃料压力 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果.燃料压力
                        "
                      >
                        <td colspan="2" rowspan="2">燃料压力</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .燃料压力['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .燃料压力['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .燃料压力["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果.燃料压力
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .燃料压力['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .燃料压力['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .燃料压力["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 蓄电池电压 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机控制诊断结果
                            .蓄电池电压
                        "
                      >
                        <td colspan="2">蓄电池电压</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .蓄电池电压['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机控制诊断结果
                                  .蓄电池电压['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机控制诊断结果
                              .蓄电池电压["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <p style="padding-top:10px">发动机传感器诊断结果：</p>
                  <div class="scroll_table">
                    <table class="diagnosis-table2" cellspacing="0">
                      <tr class="bg">
                        <td>项目</td>
                        <td width="180">检测条件</td>
                        <td width="200">
                          本次（{{
                            healthMsg.health_diag_abnormal.本次诊断结果的日期
                          }}）
                        </td>
                        <td width="200">
                          上次（{{
                            healthMsg.health_diag_abnormal.上次诊断结果的日期
                          }}）
                        </td>
                        <td width="180">参考值</td>
                      </tr>
                      <!-- 节气门位置 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .节气门位置
                        "
                      >
                        <td rowspan="2">节气门位置</td>
                        <td>油门全开</td>
                        <td>
                          <!-- {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .节气门位置.油门全开.本次
                          }} -->
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .节气门位置.油门全开
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .节气门位置.油门全开
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .节气门位置.油门全开.参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .节气门位置
                        "
                      >
                        <td>油门全关</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .节气门位置.油门全关
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .节气门位置.油门全关
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .节气门位置.油门全关.参考值
                          }}
                        </td>
                      </tr>
                      <!-- 绝对节气门位置2 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .绝对节气门位置2
                        "
                      >
                        <td rowspan="2">绝对节气门位置2</td>
                        <td>油门全开</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .绝对节气门位置2.油门全开
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .绝对节气门位置2.油门全开
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .绝对节气门位置2.油门全开.参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .绝对节气门位置2
                        "
                      >
                        <td>油门全关</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .绝对节气门位置2.油门全关
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .绝对节气门位置2.油门全关
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .绝对节气门位置2.油门全关.参考值
                          }}
                        </td>
                      </tr>
                      <!-- 进气管绝对压力 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .进气管绝对压力
                        "
                      >
                        <td rowspan="3">进气管绝对压力</td>
                        <td>启动</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .进气管绝对压力.启动
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .进气管绝对压力.启动
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .进气管绝对压力.启动.参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .进气管绝对压力
                        "
                      >
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .进气管绝对压力['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .进气管绝对压力['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .进气管绝对压力["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .进气管绝对压力
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .进气管绝对压力['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .进气管绝对压力['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .进气管绝对压力["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 空气流量计 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .空气流量计
                        "
                      >
                        <td rowspan="2">空气流量计</td>
                        <td>怠速（空档）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空气流量计['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空气流量计['怠速(空挡)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .空气流量计["怠速(空挡)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .空气流量计
                        "
                      >
                        <td>2000rpm</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空气流量计['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空气流量计['2000rpm']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .空气流量计["2000rpm"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 空燃比B1S1 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .空燃比B1S1
                        "
                      >
                        <td rowspan="2">空燃比B1S1</td>
                        <td>油门全关（稀）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B1S1['油门全关(稀)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B1S1['油门全关(稀)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .空燃比B1S1["油门全关(稀)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .空燃比B1S1
                        "
                      >
                        <td>油门全开（浓）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B1S1['油门全开(浓)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B1S1['油门全开(浓)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .空燃比B1S1["油门全开(浓)"].参考值
                          }}
                        </td>
                      </tr>
                      <!-- 空燃比B2S1 -->
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .空燃比B2S1
                        "
                      >
                        <td rowspan="2">空燃比B2S1</td>
                        <td>油门全关（稀）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B2S1['油门全关(稀)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B2S1['油门全关(稀)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .空燃比B2S1["油门全关(稀)"].参考值
                          }}
                        </td>
                      </tr>
                      <tr
                        v-if="
                          healthMsg.health_diag_abnormal.发动机传感器诊断结果
                            .空燃比B2S1
                        "
                      >
                        <td>油门全开（浓）</td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '本次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B2S1['油门全开(浓)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          <span
                            v-html="
                              htmlMsg(
                                '上次',
                                healthMsg.health_diag_abnormal.发动机传感器诊断结果
                                  .空燃比B2S1['油门全开(浓)']
                              )
                            "
                          >
                          </span>
                        </td>
                        <td>
                          {{
                            healthMsg.health_diag_abnormal.发动机传感器诊断结果
                              .空燃比B2S1["油门全开(浓)"].参考值
                          }}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <p style="padding-top:10px">
                    注意：根据车型不同，部分项目参考值暂未设定，标记为--
                  </p>
                </div>
                <div class="diagnosis-tit">
                  发动机动态诊断异常项目说明
                </div>
                <div class="diagnosis-list">
                  <div class="scroll_table">
                    <table class="diagnosis-table2" cellspacing="0">
                      <tr class="bg">
                        <td>项目</td>
                        <td>说明</td>
                      </tr>
                      <tr>
                        <td>传感器诊断（氧传感器）</td>
                        <td>
                          诊断测量排气浓稀状况的传感器<br />
                          当偏离标准值时，需要检修氧传感器，汽车线束等设备。
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 检查照片 -->
        <PhotosCheck v-if="imgFileList.length" :imgFileList="imgFileList"/>
        <!-- 免责声明 -->
        <div class="disclaimer">
          <div class="dis_title">「免责声明」</div>
          <div class="dis_desc">诊断报告的内容仅供参考，我们不保证本健康诊断报告对待定车辆的适用性或满足用户或车主的待定需求或特定期望，也不为此承担任何责任，对车辆进行检修的结果由用户或者车主自行承担责任。</div>
        </div>
      </div>
      <!-- 为空 -->
      <div class="card2 null-box" v-else>
        <span>车辆检测未完成，无检测报告！</span>
      </div>
    </div>
    <!-- 分享 -->
    <div class="page_foot" v-if="!isShare">
      <van-button class="button" @click="shareReport">晒出你爱车的诊断简报</van-button>
    </div>
    <!-- 分享弹框 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <!-- 选择车辆 -->
    <van-action-sheet v-model="vehicleVisible">
      <van-picker
        show-toolbar
        title="选择车辆"
        :columns="vehiclesColumns"
        :default-index="0"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-action-sheet>
    <!-- 签字确认弹框 -->
    <SignaturePopup  @setSign="setSign" ref="sign"/>
  </div>
</template>

<script>
import Vue from "vue";
import SignaturePopup from "./components/maintenance_detail/signature_popup.vue";
import Inspection from "./components/diagn_report/inspection.vue";
import PhotosCheck from "./components/diagn_report/photos_check.vue";
import * as echarts from "echarts";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { CustomChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import Clipboard from "clipboard";
import NativeShare from 'nativeshare';
import dateFormat from "@/utils/date";
import request from "@/request";
import { wxSign } from "@/api/wx";
import wx from "weixin-js-sdk";
import { NavBar, Button, Toast, Popup, Cell, ActionSheet, Picker, ImagePreview,  RadioGroup, Radio, ShareSheet } from "vant";
Vue.use(NavBar)
  .use(Button)
  .use(Toast)
  .use(Popup)
  .use(Cell)
  .use(Picker)
  .use(ActionSheet)
  .use(ImagePreview)
  .use(Radio)
  .use(RadioGroup)
  .use(ShareSheet);
export default {
  name:"diagnosticReport",
  components:{
    SignaturePopup,
    Inspection,
    PhotosCheck
  },
  data(){
    return{
      codeArr: [
        "CheckAllCar",
        "DashboardWarningLight",
        "LightCheck",
        "VehicleHealth",
        "CopilotPosition"
      ], // 特殊code
      lightCheckImgs: {//外部灯具
        左前灯: "leftfrontheadlights",
        右前灯: "rightfrontheadlights",
        左后灯: "leftrearheadlights",
        右后灯: "rightrearheadlights",
        左转向灯: "leftturnsignal",
        右转向灯: "rightturnsignal",
        前雾灯: "frontfoglamps",
        后雾灯: "rearfoglamps",
        前示廓灯: "frontprofilelight",
        后示廓灯: "rearprofilelight",
        刹车灯: "brakelight",
        其他灯: "otherlight"
      },
      dashboardWarningLightImgs: {
        安全气囊: "srs",
        玻璃水: "bathofglass",
        刹车: "brake",
        发动机故障灯: "enginefailurelight",
        机油报警灯: "oilalarmlamp",
        水温: "watertemperature",
        胎压报警灯: "tirepressurealarmlamp",
        蓄电池: "storagebattery",
        ABS: "abs",
        其他: "other"
      },
      templateDetail: [], // 模板详情
      // lightCheckErr: [],
      // dashboardWarningLightErr: [],
      imgFileList:[],//检测照片
      tagList: [], // 环车检测-坐标数据聚合
      tagNum: {
        Line: 0,
        Crack: 0,
        Uneven: 0,
        Bad: 0
      }, // 环车检测-检测计数
      templateItem:{
        "id": 0,	 //# ID
        "billNo": "ZD-JC-20210607-0001",	// # 检测报告单号
        "billType": "",	// # 检测报告单类型 工单点检 设备点检,
        "brandsPhoto": require('@/assets/maintenance/银联支付@3x.png'), //# 品牌照片
        "plateNumber": "京121212",	 //# 车牌号
        "vin": "LSJZ14C34CS066429",	 //# 车架号
        "checkHealthId": 0,	 //# 健康档案ID
        "checkTemplateId": "", //# 模板ID
        "checkTemplateCode": "", //# 模板code
        "checkTemplateName": "", //# 模板名称
        "status": "Checking",	 //# 状态： Complete 完成 Checking 进行中
        "signImage": {
          "QiNiuImage": "",
          "httpImage": ""
        },	 //# 签名图片
        "healthInfo": {}, //# 健康档案信息
        "createdBy": 6628,	 //# 创建者员工ID
        "createdAt": "2021-06-07 09:46:46",	 //# 创建时间
        "updatedBy": 6628,	 //# 更新者员工ID
        "updatedAt": "2021-06-07 09:46:46",	// # 更新时间
        "imageUrls": [	 //# 拍照url列表
          "https://test.qiniu.hztl3.com/qa2/img/user/5110/064ec9a5f7ba435626aaada4cc37d32fa0004b88.jpg?e=1624255675&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:Kw-PcTClLP7Clfvn4ziWfMDy3V4="
        ],
        "images": [	 //# 拍照列表
          "https://test.qiniu.hztl3.com/qa2/img/user/5110/064ec9a5f7ba435626aaada4cc37d32fa0004b88.jpg?e=1624255675&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:Kw-PcTClLP7Clfvn4ziWfMDy3V4="
        ],
        "checkResultList": [	 //# 检查总结
          "环车检查：划痕（3）裂痕（3）凹凸（1）破损（3）", "轮胎检查：外观（1）前轮（2）后轮（2）"
        ],
        contents: [
          {
            categoryId: 0, categoryCode: "CheckAllCar", name: "环车点检",
            itemList:[
              {
                checkRemark: "dafasfasfasd阿凡达上的",
                result:{
                  checkAllCarResult:[
                    {type: "Uneven",m: "483.20",n: "71.49",},
                    {type: "Bad",m: "1011.41",n: "259.47",},
                    {type: "Crack",m: "395.82",n: "76.78",},
                    {type: "Line",m: "601.02",n: "93.99",},
                  ]
                }
              }
            ]
          },
          {
            categoryCode: "DashboardWarningLight",
            categoryId: 0,
            children: null,
            itemList: [
              {
                checkRemark: "",
                code: "DashboardWarningLight",
                description: "",
                flags: {enableRemark: false, clickInput: 0},
                id: 0,
                maxValue: "0",
                minValue: "0",
                name: "仪表盘警示灯",
                operationDescription: "",
                options: ["安全气囊", "玻璃水", "刹车", "发动机故障灯", "机油报警灯", "水温", "胎压报警灯", "蓄电池", "ABS", "其他"],
                remark: "",
                result: {
                  optionResult: {ABS: false, 其他: true, 刹车: true, 发动机故障灯: false, 安全气囊: true, 机油报警灯: false, 水温: false, 玻璃水: false,胎压报警灯: false,蓄电池: false}
                },
                sort: 0,
                suggestDescription: "",
                unit: "",
                value: "0",
              }
            ],
            name: "仪表盘警示灯",
            remark: "",
          },
          {
            categoryCode: "LightCheck",
            categoryId: 0,
            children: null,
            itemList: [
              {
                id: 0, 
                code: "LightCheck", 
                name: "外部灯具", 
                description: "", 
                remark: "",
                options: ["左前灯", "右前灯", "左后灯", "右后灯", "左转向灯", "右转向灯", "前雾灯", "后雾灯", "前示廓灯", "后示廓灯", "刹车灯", "其他灯"],
                result:{
                  optionResult: {
                    其他灯: false, 刹车灯: false, 前示廓灯: false, 前雾灯: false, 右前灯: false, 右后灯: false, 右转向灯: false, 后示廓灯: false,
                    后雾灯: true,
                    左前灯: false,
                    左后灯: false,
                    左转向灯: false,
                  }
                }
              }
            ],
            name: "灯光检查",
            remark: "",
          },
          {
            categoryCode: "Tire",
            categoryId: 0,
            children: [
              {
                categoryId: 0, 
                categoryCode: "RightFrontWheel", 
                name: "右前轮",
                itemList: [
                  {
                    affect: "",
                    checkRemark: "",
                    code: "RightFrontWheelTireDepth",
                    description: "≥2mm",
                    flags: {enableRemark: true, clickInput: 3},
                    name: "胎纹深度",
                    options: ["良", "换"],
                    result: {optionResult: {换: true, 良: false}, checkAllCarResult: null},
                    unit: "mm",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelTireDepth",
                    description: "车辆厂家标准调整",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "胎压",
                    options: ["良", "调"],
                    result: {optionResult: {调: true, 良: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelAppearance",
                    description: "破损，龟裂，鼓包",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "外观",
                    options: ["良", "换", "修", "调"],
                    remark: "",
                    result: {optionResult: {修: false, 换: true, 良: false, 调: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  }
                ],
              },
              {
                categoryId: 0, 
                categoryCode: "RightFrontWheel", 
                name: "左前轮",
                itemList: [
                  {
                    affect: "",
                    checkRemark: "",
                    code: "RightFrontWheelTireDepth",
                    description: "≥2mm",
                    flags: {enableRemark: true, clickInput: 3},
                    name: "胎纹深度",
                    options: ["良", "换"],
                    result: {optionResult: {换: true, 良: false}, checkAllCarResult: null},
                    unit: "mm",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelTireDepth",
                    description: "车辆厂家标准调整",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "胎压",
                    options: ["良", "调"],
                    result: {optionResult: {调: true, 良: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelAppearance",
                    description: "破损，龟裂，鼓包",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "外观",
                    options: ["良", "换", "修", "调"],
                    remark: "",
                    result: {optionResult: {修: false, 换: true, 良: false, 调: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  }
                ],
              },
              {
                categoryId: 0, 
                categoryCode: "LeftFrontWheel", 
                name: "右后轮",
                itemList: [
                  {
                    affect: "",
                    checkRemark: "",
                    code: "RightFrontWheelTireDepth",
                    description: "≥2mm",
                    flags: {enableRemark: true, clickInput: 3},
                    name: "胎纹深度",
                    options: ["良", "换"],
                    result: {optionResult: {换: true, 良: false}, checkAllCarResult: null},
                    unit: "mm",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelTireDepth",
                    description: "车辆厂家标准调整",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "胎压",
                    options: ["良", "调"],
                    result: {optionResult: {调: true, 良: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelAppearance",
                    description: "破损，龟裂，鼓包",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "外观",
                    options: ["良", "换", "修", "调"],
                    remark: "",
                    result: {optionResult: {修: false, 换: true, 良: false, 调: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  }
                ],
              },
              {
                categoryId: 0, 
                categoryCode: "LeftFrontWheel", 
                name: "左后轮",
                itemList: [
                  {
                    affect: "",
                    checkRemark: "",
                    code: "RightFrontWheelTireDepth",
                    description: "≥2mm",
                    flags: {enableRemark: true, clickInput: 3},
                    name: "胎纹深度",
                    options: ["良", "换"],
                    result: {optionResult: {换: true, 良: false}, checkAllCarResult: null},
                    unit: "mm",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelTireDepth",
                    description: "车辆厂家标准调整",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "胎压",
                    options: ["良", "调"],
                    result: {optionResult: {调: true, 良: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "正常",
                    code: "RightFrontWheelAppearance",
                    description: "破损，龟裂，鼓包",
                    flags: {enableRemark: true, clickInput: 1},
                    name: "外观",
                    options: ["良", "换", "修", "调"],
                    remark: "",
                    result: {optionResult: {修: false, 换: true, 良: false, 调: false}, checkAllCarResult: null},
                    unit: "",
                    value: "0",
                  }
                ],
              },
            ],
            itemList: null,
            name: "轮胎",
            remark: "",
          },
          {
            categoryCode: "CheckAirConditioning",
            categoryId: 0,
            children: [
              {
                categoryId: 0, 
                categoryCode: "DrivingPosition", 
                name: "驾驶位", 
                itemList: [
                  {
                    affect: "",
                    checkRemark: "",
                    code: "DrivingPositionRelativeHumidity",
                    description: "相对湿度%",
                    flags: {enableRemark: false, clickInput: 2},
                    id: 0,
                    maxValue: "100",
                    minValue: "0",
                    name: "性能测试（相对湿度）",
                    operationDescription: "",
                    options: [],
                    remark: "",
                    result: {optionResult: null, checkAllCarResult: null},
                    sort: 0,
                    suggestDescription: "",
                    unit: "%",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "",
                    code: "DrivingPositionReturnOutletTemperature",
                    description: "回风口温度℃",
                    flags: {enableRemark: false, clickInput: 2},
                    id: 0,
                    maxValue: "100",
                    minValue: "-100",
                    name: "性能测试（回风口温度）",
                    operationDescription: "",
                    options: [],
                    remark: "",
                    result: {optionResult: null, checkAllCarResult: null},
                    sort: 0,
                    suggestDescription: "",
                    unit: "℃",
                    value: "0",
                  },
                  {
                    affect: "",
                    checkRemark: "",
                    code: "DrivingPositionOutletState",
                    description: "出风口状态",
                    flags: {enableRemark: false, clickInput: 1},
                    id: 0,
                    maxValue: "0",
                    minValue: "0",
                    name: "性能测试（出风口状态）",
                    operationDescription: "",
                    options: ["良", "修"],
                    remark: "",
                    result: {optionResult: {修: false, 良: false}, checkAllCarResult: null},
                    sort: 0,
                    suggestDescription: "",
                    unit: "",
                    value: "0",
                  }
                ], 
                children: null
              },
              {
                categoryCode: "EngineRunning",
                categoryId: 0,
                children: null,
                itemList: [
                  {
                    affect: "",
                    checkRemark: "",
                    code: "EngineRunningLowPressureState",
                    description: "低压 _ kgf/cm²",
                    flags: {enableRemark: false, clickInput: 1},
                    id: 0,
                    maxValue: "0",
                    minValue: "0",
                    name: "冷媒压力（低压状态）",
                    operationDescription: "",
                    options: ["良", "修"],
                    remark: "",
                    result: {optionResult: {修: false, 良: false}, checkAllCarResult: null},
                    sort: 0,
                    suggestDescription: "",
                    unit: "",
                    value: "0"
                  },
                    
                ],
                name: "发动机舱（发动机运转）",
                remark: "",
              },
              {
                categoryCode: "EngineRest",
                categoryId: 0,
                children: null,
                itemList: [
                  {
                    affect: "",
                    checkRemark: "",
                    code: "EngineRestBeltTightness",
                    description: "涨紧度",
                    flags: {enableRemark: false, clickInput: 1},
                    id: 0,
                    maxValue: "0",
                    minValue: "0",
                    name: "皮带涨紧度",
                    operationDescription: "",
                    options: ["良", "调"],
                    remark: "",
                    result: {optionResult: {良: false, 调: false}, checkAllCarResult: null},
                    sort: 0,
                    suggestDescription: "",
                    unit: "",
                    value: "0"
                  }
                ],
                name: "发动机舱（发动机静止）",
                remark: "",
              }
            ],
            itemList: null,
            name: "空调标准化检测",
            remark: "",
          },
          {
            categoryCode: "VehicleHealth",
            categoryId: 0,
            children: null,
            itemList: null,
            name: "车辆健康检测",
            remark: "",
          }
          
        ],
      },
      ringCarCheckRemark:'',//环车检查备注
      ringCarShow:true,//环车检查展开/隐藏
      reportShow:true,//检测报告展开/隐藏
      warningLightShow:true,//仪表盘警示灯
      checkLightShow:true,//灯光检查
      cloudCheckShow:true,//云诊车健康诊断
      vehicleVisible: false,
      vehiclesList: [
        {
          "plateNumber": "京121212",        //  # 车牌号
          "vehBrand": "奥迪",            // # 汽车品牌
          "logo": "http://"           //# 品牌logo
        },
        {
          "plateNumber": "川A·66688",        //  # 车牌号
          "vehBrand": "宝马",            // # 汽车品牌
          "logo": "http://"           //# 品牌logo
        },
        {
          "plateNumber": "川A·66688",        //  # 车牌号
          "vehBrand": "奥迪",            // # 汽车品牌
          "logo": "http://"           //# 品牌logo
        },
      ],
      vehiclesColumns: [
        // {
        //   text:'【奔驰】川A·66688',
        //   "plateNumber": "川A·66688",        //  # 车牌号
        //   "vehBrand": "奔驰",            // # 汽车品牌
        //   "logo": "http://"           //# 品牌logo
        // },
       
      ],
      cheartData: [
        [0, 20],
        [0, 25],
        [70, 17],
        [70, 12]
      ],
      pointData: [],
      radio: "1",
      airConditioner: {
        inletTemperature: "进气温度",
        outletTemperature: "出风口温度",
        returnOutletTemperature: "回风口温度",
        relativeHumidity: "相对湿度"
      }, // 空调
      healthMsg:{	 //# 健康档案信息
        // "id": 1,	 //# 唯一ID
        // "accountSetId": 354,	// # 帐套ID
        // "companyId": 0,	 //# 公司ID
        // "deviceId": 0,	 //# 设备ID
        // "diag_id": "100000000010-20200723151411",	 //# 诊断报告id
        // "report_code": "",	// # 健康档案号
        // "u_shop_name": "",	 //# 店铺名
        // "u_shop_telephone": "",	// # 修理店电话
        // "tester": "",	 //# 检测员姓名
        // "diag_date": "0001-01-01T00:00:00Z",	// # 诊断日期
        // "vin_code": "LSJZ14C34CS066429",	 //# VIN码
        // "vehicle_brand": "奥迪",	// # 品牌
        // "models": "大众 一汽大众 迈腾  2020款 P 25R-DYNAMIC S",	 //# 车型（目前报告中显示于车辆品牌一栏）
        // "production_year": "",	// # 车辆年份
        // "license_plate": "京121212",	 //# 车牌号
        // "mileage": "3198",	 //# 行驶里程
        // "diag_date_last_time": "0001-01-01T00:00:00Z",	 //# 上次诊断日期
        // "mileage_last_time": "-",	 //# 上次行驶里程
        // "next_time": "0001-01-01T00:00:00Z",	// # 下次点检时间
        // pdf_show_last_engine_result_status: "显示",
        // "health_diag_abnormal": {
        //   本次诊断结果的日期: "2021-05-20",
        //   上次诊断结果的日期: "2020-07-23",
        //   发动机控制诊断结果: {
        //     蓄电池电压: {
        //       "怠速(空挡)": {
        //         本次: "10.19V",
        //         参考值: "12~14.9V",
        //         上次: "24.19V"
        //       }
        //     },
        //     空燃比气缸列2: {
        //       长期燃料补正B2: {
        //         "2000rpm": {
        //           本次: "0",
        //           参考值: "-20~20%",
        //           上次: "-"
        //         },
        //         "怠速(空挡)": {
        //           本次: "0",
        //           参考值: "-20~20%",
        //           上次: "-"
        //         }
        //       },
        //       短期燃料补正B2: {
        //         "2000rpm": {
        //           本次: "0",
        //           参考值: "-20~20%",
        //           上次: "-"
        //         },
        //         "怠速(空挡)": {
        //           本次: "0",
        //           参考值: "-20~20%",
        //           上次: "-"
        //         }
        //       },
        //       "燃料系统2 状态": {
        //         "2000rpm": {
        //           本次: "0",
        //           参考值: "未使用",
        //           上次: "-"
        //         },
        //         "怠速(空挡)": {
        //           本次: "0",
        //           参考值: "未使用",
        //           上次: "-"
        //         }
        //       }
        //     },
        //     空燃比气缸列1: {
        //       "燃料系统1 状态": {
        //         "2000rpm": {
        //           本次: "闭环运转",
        //           参考值: "闭环运转",
        //           上次: "闭环运转"
        //         },
        //         "怠速(空挡)": {
        //           本次: "闭环运转",
        //           参考值: "闭环运转",
        //           上次: "闭环运转"
        //         }
        //       },
        //       短期燃料补正B1: {
        //         "2000rpm": {
        //           本次: "-66.18%",
        //           参考值: "-20~20%",
        //           上次: "66.18%"
        //         },
        //         "怠速(空挡)": {
        //           本次: "33.61%",
        //           参考值: "-15~15%",
        //           上次: "-18.61%"
        //         }
        //       },
        //       长期燃料补正B1: {
        //         "2000rpm": {
        //           本次: "-55.47%",
        //           参考值: "-20~20%",
        //           上次: "55.47%"
        //         },
        //         "怠速(空挡)": {
        //           本次: "30.78%",
        //           参考值: "-15~15%",
        //           上次: "-30.78%"
        //         }
        //       }
        //     },
        //     启动: {
        //       启动: {
        //         本次: "0.7sec",
        //         参考值: "1",
        //         上次: "0.7sec"
        //       }
        //     },
        //     燃料压力: {
        //       "2000rpm": {
        //         本次: "0",
        //         参考值: "0",
        //         上次: "-"
        //       },
        //       "怠速(空挡)": {
        //         本次: "0",
        //         参考值: "0",
        //         上次: "-"
        //       }
        //     },
        //     发动机冷却水温: {
        //       "怠速(空挡)": {
        //         本次: "64℃",
        //         参考值: "75~100℃",
        //         上次: "60℃"
        //       }
        //     },
        //     发动机转速: {
        //       "怠速(空挡)": {
        //         本次: "600rpm",
        //         参考值: "610~710rpm",
        //         上次: "800rpm"
        //       }
        //     }
        //   },
        //   发动机传感器诊断结果: {
        //     空燃比B2S1: {
        //       "油门全开(浓)": {
        //         本次: "0",
        //         参考值: "0.9以下",
        //         上次: "-"
        //       },
        //       "油门全关(稀)": {
        //         本次: "0",
        //         参考值: "1.2以上",
        //         上次: "-"
        //       }
        //     },
        //     空气流量计: {
        //       "2000rpm": {
        //         本次: "55.72g/s",
        //         参考值: "4.1~8.1g/s",
        //         上次: "-5.72g/s"
        //       },
        //       "怠速(空挡)": {
        //         本次: "-2.04g/s",
        //         参考值: "1.0~3.0g/s",
        //         上次: "22.04g/s"
        //       }
        //     },
        //     空燃比B1S1: {
        //       "油门全开(浓)": {
        //         本次: "0.85",
        //         参考值: "0.8以下",
        //         上次: "0.85"
        //       },
        //       "油门全关(稀)": {
        //         本次: "1.23",
        //         参考值: "1.2以上",
        //         上次: "1.11"
        //       }
        //     },
        //     节气门位置: {
        //       油门全开: {
        //         本次: "5.10%",
        //         参考值: "64~96%",
        //         上次: "99.10%"
        //       },
        //       油门全关: {
        //         本次: "36.08%",
        //         参考值: "10~22%",
        //         上次: "6.08%"
        //       }
        //     },
        //     进气管绝对压力: {
        //       "2000rpm": {
        //         本次: "0",
        //         参考值: "0",
        //         上次: "-"
        //       },
        //       启动: {
        //         本次: "0",
        //         参考值: "90~105kPa",
        //         上次: "-"
        //       },
        //       "怠速(空挡)": {
        //         本次: "0",
        //         参考值: "0",
        //         上次: "-"
        //       }
        //     },
        //     绝对节气门位置2: {
        //       油门全开: {
        //         本次: "0",
        //         参考值: "0",
        //         上次: "-"
        //       },
        //       油门全关: {
        //         本次: "0",
        //         参考值: "0",
        //         上次: "-"
        //       }
        //     }
        //   }
        // },	 //# 健康诊断详细数据
        // "suggestion_1": "发动机动态诊断详细信息建议1",	 //# 健康诊断建议1
        // "suggestion_2": "发动机动态诊断详细信息建议2",	 //# 健康诊断建议2
        // "suggestion_3": "发动机动态诊断详细信息建议3",	 //# 健康诊断建议3
        // "dtc_suggestion_1": "系统故障码诊断详细信息建议1",	// # 系统故障码修理建议1，由用户手动输入
        // "dtc_suggestion_2": "系统故障码诊断详细信息建议2",	 //# 系统故障码修理建议2，由用户手动输入
        // "dtc_suggestion_3": "系统故障码诊断详细信息建议3",	 //# 系统故障码修理建议3，由用户手动输入
        // "dtc_code01": "良好",	 //# 对应PDF上故障码诊断结果 01动力传动系统
        // "dtc_code02": "良好",	 //# 对应PDF上故障码诊断结果 02底盘系统
        // "dtc_code03": "B2343,B1421,B1424",	// # 对应PDF上故障码诊断结果 03动力传动系统
        // "dtc_code04": "良好",	 //# 对应PDF上故障码诊断结果 04网络系统
        // "system_fault_code_detail_good": "ABS(防抱死制动系统)/VSC(车辆稳定性控制)/TRC(牵引力控制),BCM (车身控制系统,主车身),CCS (巡航控制系统),IC (仪表),SRS (安全气囊),停机器(防盗),发动机和自动变速箱,司机车门马达,电子辅助动力转向系统,防盗系统 (Theft Deterrent)",	// # 对应PDF上故障码诊断详细信息 检测结果良好的系统
        // "system_fault_code_detail_result": [	 //# 对应PDF上故障码诊断详细信息 系统故障码诊断结果
        //   {
        //     故障码: "B1424",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（驾驶员侧）"
        //   },
        //   {
        //     故障码: "B1424",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（驾驶员侧）"
        //   },
        //   {
        //     故障码: "B1421",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（乘客侧）"
        //   },
        //   {
        //     故障码: "B1424",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（驾驶员侧）"
        //   },
        //   {
        //     故障码: "B1424",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（驾驶员侧）"
        //   },
        //   {
        //     故障码: "B1421",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（乘客侧）"
        //   },
        //   {
        //     故障码: "B1421",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（乘客侧）"
        //   },
        //   {
        //     故障码: "B1421",
        //     故障码状态: "现在",
        //     系统名: "AC(空调系统)",
        //     内容: "太阳能传感器电路（乘客侧）"
        //   },
        //   {
        //     故障码: "B2343",
        //     故障码状态: "现在",
        //     系统名: "滑动天窗",
        //     内容: "位置初始化未完成"
        //   },
        //   {
        //     故障码: "B2343",
        //     故障码状态: "现在",
        //     系统名: "滑动天窗",
        //     内容: "位置初始化未完成"
        //   },
        //   {
        //     故障码: "B2343",
        //     故障码状态: "现在",
        //     系统名: "滑动天窗",
        //     内容: "位置初始化未完成"
        //   },
        //   {
        //     故障码: "B2343",
        //     故障码状态: "现在",
        //     系统名: "滑动天窗",
        //     内容: "位置初始化未完成"
        //   }
        // ],
        // "createdBy": 0,	 //# 创建者员工ID
        // "createdAt": "2021-06-07 09:46:46",// # 创建时间     
      },
      isShare:null,//是否是分享进入该页面
      showShare:false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
      // nativeShare:null,
    }
  },
  created(){
    this.getVehiclesList();//获取车辆信息
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
      // this.injectAuth();
    } else {
      this.isShare = '1';
    }
  },
  mounted(){
    if(this.$route.query.isShare){
      this.isShare = this.$route.query.isShare;
    }
    this.load();
  },
  methods:{
    goBackFn(){
      if(this.$route.query.from == 'maintenanceDetail' || this.$route.query.from == 'past_diagnosis'){
        this.$router.go(!this.$route.query.share? -2 : -1);
      }else{
        this.$router.push('/home');
      }
     
    },
    async injectAuth(){
      let params = {
        url: window.location.href
      }
      const res = await wxSign(params);
     
      if (res) {
        wx.config({
          debug: false, // 开启调试模式,
          appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList:['updateAppMessageShareData','updateTimelineShareData']
        })
        
        let share = {
          title: '诊断报告', // 分享标题
          desc: '',// 分享描述
          link: `${process.env.VUE_APP_FRONT_URL}home/aaa/cccc?code=${this.code}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
        }
        // 分享给朋友、分享到QQ
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            ...share,
          })
        })
        // 分享到朋友圈、分享到QQ空间
        wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
          wx.updateTimelineShareData({
            ...share,
          })
        });
      }
    },
    getVehiclesList(){
      this.vehiclesColumns = [];
      let url = '/customers/vehicles/my';
      request({url}).then(res =>{
        if(res){
          let arr = res;
          arr.forEach(p =>{
            this.vehiclesColumns.push({
              ...p,
              text:`【${p.vehBrand}】${p.plateNumber}`
            })
          })
        }
      }).catch(err =>{
        if(err && err.message) {
          Toast.fail(err.message);
        }
      })
    },
    renderVehBand(){
      if(!this.templateItem.id)return false;
      let str = '';
      if(this.templateItem.vehicleInfo.vehBrand){
        str = this.templateItem.vehicleInfo.vehBrand;
      }else{
        str = this.templateItem.healthInfo.vehicle_brand?this.templateItem.healthInfo.vehicle_brand:'';
      }
      return str;
    },
    renderModels(){
      if(!this.templateItem.id)return false;
      let str = '';
      if(this.templateItem.vehicleInfo){
        str = this.templateItem.vehicleInfo.vehBrand + " "
            + this.templateItem.vehicleInfo.facBrand + " "
            + this.templateItem.vehicleInfo.vehicleGroup ;
        str=str.replace(/^\s+|\s+$/g,"")?str:'';//js去掉两头空格
      }else{
        str = this.templateItem.healthInfo.models?this.templateItem.healthInfo.models:'-';
      }
      return str;
    },
    renderVin(){
      if(!this.templateItem.id)return false;
      let str = '';
      if(this.templateItem.vin){
        str = this.templateItem.vin;
      }else if(this.templateItem.vehicleInfo.vin){
        str = this.templateItem.vehicleInfo.vin;
      } else{
        str = this.templateItem.healthInfo.vin_code?this.templateItem.healthInfo.vin_code:'-';
      }
      return str;
    },
    renderMileage(){
      if(this.templateItem.id){
        let str = '';
        if(this.templateItem.vehicleInfo.mileage){
          str = this.templateItem.vehicleInfo.mileage;
        }else{
          str = this.templateItem.healthInfo.mileage?this.templateItem.healthInfo.mileage:'-';
        }
        return str + 'KM';
      }
      
    },
    renderDate(){
      if(!this.templateItem.id)return '-';
      let str = dateFormat.dateYmd(this.templateItem.updatedAt,'YYYY年MM月DD日');
      return str;
    },
    load() {
      if(this.$route.query.share){
        this.getCheckReportShare();//获取模板分享的详情
      }else{
        this.getCheckReportDetail();
      }
      
    },
    getCheckReportShare(){
      let url = '/repair-center/check-reports/share';
      let params = {
        share:this.$route.query.share
      }
      this.getRequest(url,params);
    },
    //获取模板保存的详情
    getCheckReportDetail(plateNumbers) {
      const params = {
        orderId: this.$route.query.orderId?this.$route.query.orderId:0,	 //# 工单ID
        reportId: this.$route.query.reportId?this.$route.query.reportId:0,	 //# 报告ID
        healthId: this.$route.query.healthId?this.$route.query.healthId:0,	 //# 报告ID
        plateNumbers: this.$route.query.plateNumbers?JSON.parse(this.$route.query.plateNumbers):[]	 //# 车牌号
      };
      if(plateNumbers){
        params.plateNumbers = plateNumbers;
        params.orderId = 0;
      }
      let url = "/repair-center/check-reports/detail";
      this.getRequest(url,params);
      
    },
    getRequest(url,params){
      request({
        url,
        params
      }).then(res => {
        if (res) {
          this.templateItem = res;
          this.templateDetail = res.contents;
          this.healthMsg = res.healthInfo || {};
          // 图片回显
          if (res.imageUrls) {
            this.imgFileList = [];
            res.imageUrls.forEach((item, ind) => {
              // this.imgFileList.push(item);
              this.imgFileList.push({
                name: "",
                url: item,
                origin: res.images[ind]
              });
            });
          }
          
            let shareUrl = location.origin + location.pathname + '?plateNumbers=' +
                JSON.stringify([res.plateNumber]) + '&share=' + res.share;
            
            history.pushState(null,'诊断报告',shareUrl);
          if (this.templateDetail) {
            this.templateDetail.forEach(item => {
              if (item.categoryCode == "CheckAllCar") {
                this.tagRepetition(item.itemList[0].result.checkAllCarResult);
                this.ringCarCheckRemark = item.itemList[0].checkRemark;
              }
              if (item.categoryCode == "CheckAirConditioning") {
                this.airConditioner = {
                  inletTemperature: "",
                  outletTemperature: "",
                  returnOutletTemperature: "",
                  relativeHumidity: ""
                };
                setTimeout(() => {
                  this.drawLine();
                }, 2000);
                item.children.forEach(item2 => {
                  if (item2.categoryCode == "DrivingPosition") {
                    item2.itemList.forEach(item3 => {
                      if (item3.code == "DrivingPositionInletTemperature") {
                        this.airConditioner.inletTemperature = item3.value; // 进气温度
                      }
                      if (item3.code == "DrivingPositionOutletTemperature") {
                        this.airConditioner.outletTemperature = item3.value; // 出风口温度
                      }
                      if (
                        item3.code == "DrivingPositionReturnOutletTemperature"
                      ) {
                        this.airConditioner.returnOutletTemperature = item3.value; // 回风口温度
                      }
                      if (item3.code == "DrivingPositionRelativeHumidity") {
                        this.airConditioner.relativeHumidity = item3.value; // 相对湿度
                      }
                    });
                    const pointX = this.airConditioner.relativeHumidity || 0;
                    const pointY =
                      this.airConditioner.returnOutletTemperature -
                      this.airConditioner.outletTemperature;
                    this.pointData = [
                      [0, pointY],
                      [pointX, pointY],
                      [pointX, 0]
                    ];
                    // 计算交叉点 直线方程：y=-(4/35)x + 20
                    const y = 20 - Number((pointX * 4) / 35).toFixed(2);
                    if (pointY > y && pointY < y + 5) {
                      // 良
                      this.radio = "1";
                    } else {
                      // 不良
                      this.radio = "2";
                    }
                  }
                });
              }
            });
            // this.drawLine();//echarts
          }
        }else{
          Toast.fail('该车暂无检测报告！');
        }
      }).catch(err =>{
        if(err && err.message) {
          Toast.fail(err.message);
        } else {
          Toast.fail('服务器错误！');
        }
      });
    },
    // 获取详情-健康诊断
    getCheckHealthDetail() {
      this.templateItem = {
        vehicleInfo: {}
      };
      this.templateDetail = [];
      const params = {
        orderId: this.$route.query.orderId?this.$route.query.orderId:0,	 //# 工单ID
        reportId: this.$route.query.reportId?this.$route.query.reportId:0,	 //# 报告ID
        healthId: this.$route.query.healthId?this.$route.query.healthId:0,	 //# 报告ID
        plateNumbers: this.$route.query.plateNumbers?JSON.parse(this.$route.query.plateNumbers):[]	 //# 车牌号
      };
      if(plateNumbers){
        params.plateNumbers = plateNumbers;
        params.orderId = 0;
      }
      let url = "/repair-center/check-healths/detail";
      request({
        url,
        params
      }).then(res => {
        this.healthMsg = res || {};
        const data = {
          categoryCode: "VehicleHealth",
          categoryId: 0,
          children: null,
          itemList: null,
          name: "车辆健康检测"
        };
        this.templateDetail.push(data);
        this.templateItem = {
          companyName: res.u_shop_name,
          companyPhone: res.u_shop_telephone,
          updatedAt: res.diag_date,
          vehicleInfo: {
            plateNumber: res.license_plate,
            facBrand: res.models,
            vehicleGroup: "",
            vin: res.vin_code,
            mileage: res.mileage
          }
        };
      });
    },
    // 获取状态
    htmlMsg(type, val) {
      let html = val[type] || "";
      if (val && val[type + "结果"]) {
        if (val[type + "结果"] == "正常") {
          html = val[type];
        }
        if (val[type + "结果"] == "异常") {
          html = `<span class="abnormal">${val[type]}</span>`;
        }
        if (val[type + "结果"] == "↑") {
          html = `<span class="abnormal">${val[type]}<i class="el-icon-caret-top"></i></span>`;
        }
        if (val[type + "结果"] == "↓") {
          html = `<span class="abnormal">${val[type]}<i class="el-icon-caret-bottom"></i></span>`;
        }
      }
      return html;
    },
    // 坐标回显
    tagRepetition(list) {
      if(!list)return;
      this.tagList = [];
      const imgWidth = 1300;
      const imgHieght = 650;
      list.forEach(item => {
        const left = (Number(item.m) / imgWidth) * 100;
        const bottom = (Number(item.n) / imgHieght) * 100;
        this.tagList.push({
          x: item.m,
          y: item.n,
          left: bottom,
          top: left,
          type: item.type
        });
      });
      this.tagCount();
    },
    // 环车检测-计算各类型标记数
    tagCount() {
      this.tagNum = {
        Line: 0,
        Crack: 0,
        Uneven: 0,
        Bad: 0
      };
      this.tagList.forEach(item => {
        this.tagNum[item.type]++;
      });
    },
    // 图表配置
    renderItem(params, api) {
      if (params.context.rendered) {
        return;
      }
      params.context.rendered = true;
      const points = [];
      for (let i = 0; i < this.cheartData.length; i++) {
        points.push(api.coord(this.cheartData[i]));
      }
      return {
        type: "polygon",
        transition: ["shape"],
        shape: {
          points: points
        },
        style: api.style({
          fill: "rgba(51, 255, 153,.5)",
          stroke: "rgba(0, 112, 0,.5)"
        })
      };
    },
    // 图表
    drawLine() {
      //2.初始化
      const chartDom = document.getElementById("myChart");
      const myChart = echarts.init(chartDom);
      //3.配置数据
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["bar"]
        },
        grid: {
          top: "4%",
          left: "5%",
          right: "4%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          name: "相对湿度（%）",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            width: 20,
            padding: [0, 0, 0, 0]
          }
        },
        yAxis: {
          name: "回风口/出风口温度差（℃）",
          nameLocation: "center",
          nameRotate: 270,
          nameGap: 35,
          nameTextStyle: {
            width: 20,
            padding: [-10, 0, 0, 0]
          }
        },
        series: [
          {
            type: "custom",
            renderItem: this.renderItem,
            clip: true,
            data: this.cheartData
          },
          {
            type: "line",
            renderItem: this.renderItem,
            data:this.pointData,
            labelLine: {
              lineStyle: {
                type: [5, 6],
                dashOffset: 5
              }
            },
            lineStyle: {
              color: "#9ACD32",
              type: [5, 7],
              dashOffset: 5
            }
          }
        ]
      };
      // 4.传入数据
      myChart.setOption(option);
    },
    toPastDiagnosis(){
      let obj = {
        path:'/pastDiagnosis',
        query:{
          // reportId:this.templateItem.id,
          from:'diagnostic_report'
        }
      };
      this.$router.push(obj);
    },
    switchVeh(){
      this.vehicleVisible = true;
      
    },
    onConfirm(value) {
      // this.templateItem.vehicle = value;
      this.vehicleVisible = false;
      let plateNumbers = [value.plateNumber];
      this.getCheckReportDetail(plateNumbers);
    },
    onCancel() {
      this.vehicleVisible = false;
    },
    sign(){
      this.$refs.sign.show();
    },
    setSign(data){
      this.$refs.sign.close();
      let signImageUrl = data;
      //调用保存接口
      let url='/repair-center/check-reports/sign';
      let params = {
        id:this.templateItem.id,
        signImage:{
          httpImage:signImageUrl
        }
      }
      request({
        method: "post",
        url,
        data: params
      }).then(() =>{
        this.$refs.sign.close();
        Toast.success('提交成功');
        this.init();
      })
    },
    openProFn(name){//展开/隐藏
      this[name] = !this[name];
    },
    shareReport(){
      Toast('请点击微信右上角【...】分享');
      let shareLink = location.href+'&isShare=1';
      // this.copyActiveCode(event,shareLink);
      // this.showShare = true;
      // this.cshare(shareLink);
    },
    cshare(shareLink) {
      if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
        Toast('图文分享请打开QQ浏览器');
        // 设置分享文案
        this.nativeShare.setShareData({
            icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
            link: 'https://github.com/fa-ge/NativeShare',
            title: 'NativeShare',
            desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
            from: '@fa-ge',
        })
      } else {
        try {
          this.nativeShare.setShareData({
            link: shareLink,
            title: '诊断报告',
            desc: 'desc11',
            // icon: 'https://t12.baidu.com/it/u=751929707,172094732&fm=76',
          })
          // this.nativeShare.call('default')
          this.nativeShare.call('wechatFriend')
        } catch (err) {
          // console.log(err)
          Toast('此浏览器不支持跳转')
        }
      }
    },
    copyActiveCode(e, text) {
      e = e || {};
      const clipboard = new Clipboard(e.target, { text: () => text });
      clipboard.on("success", e => {
        Toast.success("链接已复制到剪切板");
        // 释放内存
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast.fail("该浏览器不支持自动复制");
        // 释放内存
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      clipboard.onClick(e);
    },
  }
}
</script>

<style lang="less" scoped>
.color_1{
  color: #ffffff;
}
.color_3{
  color: #333333;
}
.color_6{
  color: #666666;
}
.color_9{
  color: #999999;
}
.color_red{
  color: #FF6E4C;
}
.size_15{
  font-size: 15px;
}
.size_14{
  font-size: 14px;
}
.size_13{
  font-size: 13px;
}
.margin_t_b{
  margin:8px 0;
}
.margin_t_b_4{
  margin:4px 0;
}
.margin_l_r{
  margin:0 8px;
}

.diagnostic_report{
  /deep/.van-nav-bar .van-icon {
    color: #333;
  }
  /deep/.van-nav-bar__title{
    font-size: 16px;
    font-weight: 500;
    color:#333;
  }
  /deep/.van-nav-bar__content{
    height:44px;
  }
  img[src=""], img:not([src]) {
    opacity: 0.8;
  }
  .page_body_h1{
    height: calc(100vh - 94px);
  }
  .page_body_h2{
    height: calc(100vh - 44px);
  }
  .page-body-container {
    overflow-y: auto;
    background: url(~@/assets/maintenance/bgImg@3x.png) no-repeat;
    background-size: 100% 120px;
    background-color: #F8F8F8;
    font-size: 13px;
    text-align: left;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .vehicle{
      margin:8px 12px;
      justify-content: space-between;
      img{
        width: 52px;
        height: 52px;
        background: #fff;
        border-radius: 4px;
      }
      .v_content{
        flex:1;
        margin:0 8px;
        .font_w{
          font-weight: 500;
        }
      }
      .v_button{
        height:24px;
        padding: 3px 11px;
        background: #FFFFFF;
        border-radius: 18px;
        color: #FF6E4C;
        box-sizing: border-box;
        /deep/.van-button__text{
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
    
    .card{
      margin: 8px 12px;
      border-radius: 8px;
      overflow: hidden;
      background-color: #ffffff;
      /deep/.van-cell{
        padding: 8px 12px;
        font-size:13px;
        // margin: 8px 0;
        line-height: 18px;
        &::after{
          border:none;
        }
        &:first-child{
          padding-top:12px;
        }
        &:last-child{
          padding-bottom:12px;
        }
      }
      /deep/.van-cell__title{
        color:#999999;
        flex:none;
      }
      /deep/.van-cell__value{
        color:#333333;
      }
    }
    .card2{
      margin: 8px 12px;
      border-radius: 8px;
      background-color: #ffffff;
      padding:12px;
      color:#333333;
      text-align: left;
      font-size: 14px;
      .title{
        height: 22px;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
        font-weight: 500;
        i{
          margin-left: 4px;
        }
        .num{
          font-size: 14px;
          font-weight: 400;
        }
      }
      .content{
        .part{
          margin:12px 0;

        }
        .c_box{
          margin:12px 0;
          .c_img{
            margin: 0 auto;
            width: 217px;
            height: 434px;
            position: relative;
            img{
              width: 100%;
              height: 100%;
            }
            .tag_img{
              position: absolute;
              // width:12px;
              // height:12px;
              z-index: 99;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          .ring_car_i{
            flex:1;
            margin:4px 0;
            img{
              width: 20px;
              height:20px;
            }
            span{
              color:#FF6E4C;
              margin-left:8px;
            }
          }
        }
        .c_img_box{
          margin: 8px 0;
          width: 100%;
          height: 226px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .c_title{
          font-weight: 500;
          margin-bottom:12px;
          
        }
        
        .c_content{
          font-weight: 400;
          div{
            margin-bottom: 2px;
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
        .c_result{
          margin-top:8px;
          font-weight: 500;
          .c_radio{
            margin-left:4px;
          }
        }
        .light_box{
          margin:12px 0;
          display:flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .light_div{
            width:65.4px;
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 6px 0;
            .light_img{
              width:40px;
              height:40px;
              padding:4px;
              border:1px solid #e6e6e6;
              border-radius: 4px;
              box-sizing: border-box;
            }
            .other{
              background: #fff url("~@/assets/light/other.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .otherlight {
              background: #fff url("~@/assets/light/otherlight.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .abs {
              background: #fff url("~@/assets/light/abs.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .storagebattery {
              background: #fff url("~@/assets/light/storagebattery.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .tirepressurealarmlamp {
              background: #fff
                url("~@/assets/light/tirepressurealarmlamp.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .watertemperature {
              background: #fff
                url("~@/assets/light/watertemperature.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .oilalarmlamp {
              background: #fff url("~@/assets/light/oilalarmlamp.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .enginefailurelight {
              background: #fff
                url("~@/assets/light/enginefailurelight.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .brake {
              background: #fff url("~@/assets/light/brake.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .bathofglass {
              background: #fff url("~@/assets/light/bathofglass.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .srs {
              background: #fff url("~@/assets/light/srs.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            // 分界线 上面是警示灯  下面是常规灯光
            .brakelight {
              background: #fff url("~@/assets/light/brakelight.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rearprofilelight {
              background: #fff
                url("~@/assets/light/rearprofilelight.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .frontprofilelight {
              background: #fff
                url("~@/assets/light/frontprofilelight.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rearfoglamps {
              background: #fff url("~@/assets/light/rearfoglamps.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .frontfoglamps {
              background: #fff url("~@/assets/light/frontfoglamps.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rightturnsignal {
              background: #fff url("~@/assets/light/rightturnsignal.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftturnsignal {
              background: #fff url("~@/assets/light/leftturnsignal.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rightrearheadlights {
              background: #fff
                url("~@/assets/light/rightrearheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .leftrearheadlights {
              background: #fff
                url("~@/assets/light/leftrearheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rightfrontheadlights {
              background: #fff
                url("~@/assets/light/rightfrontheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .leftfrontheadlights {
              background: #fff
                url("~@/assets/light/leftfrontheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            div{
              font-size: 10px;
              color: #333333;
              line-height: 16px;
              font-weight: 400;
              margin:4px 0;
            }
          }
          .active{
            .light_img{
              width:40px;
              height:40px;
              padding:4px;
              border:1px solid #f39453;
              border-radius: 4px;
              box-sizing: border-box;
            }
            .other {
              background: #fff url("~@/assets/light/other_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .otherlight {
              background: #fff url("~@/assets/light/otherlight_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .abs {
              background: #fff url("~@/assets/light/abs_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .storagebattery {
              background: #fff
                url("~@/assets/light/storagebattery_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .tirepressurealarmlamp {
              background: #fff
                url("~@/assets/light/tirepressurealarmlamp_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .watertemperature {
              background: #fff
                url("~@/assets/light/watertemperature_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .oilalarmlamp {
              background: #fff
                url("~@/assets/light/oilalarmlamp_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .enginefailurelight {
              background: #fff
                url("~@/assets/light/enginefailurelight_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .brake {
              background: #fff url("~@/assets/light/brake_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .bathofglass {
              background: #fff
                url("~@/assets/light/bathofglass_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .srs {
              background: #fff url("~@/assets/light/srs_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            // 分界线 上面是警示灯  下面是常规灯光
            .brakelight {
              background: #fff
                url("~@/assets/light/brakelight_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rearprofilelight {
              background: #fff
                url("~@/assets/light/rearprofilelight_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .frontprofilelight {
              background: #fff
                url("~@/assets/light/frontprofilelight_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rearfoglamps {
              background: #fff
                url("~@/assets/light/rearfoglamps_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .frontfoglamps {
              background: #fff
                url("~@/assets/light/frontfoglamps_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rightturnsignal {
              background: #fff
                url("~@/assets/light/rightturnsignal_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftturnsignal {
              background: #fff
                url("~@/assets/light/leftturnsignal_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rightrearheadlights {
              background: #fff
                url("~@/assets/light/rightrearheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftrearheadlights {
              background: #fff
                url("~@/assets/light/leftrearheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rightfrontheadlights {
              background: #fff
                url("~@/assets/light/rightfrontheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftfrontheadlights {
              background: #fff
                url("~@/assets/light/leftfrontheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            div{
              color: #f39453;
            }
          }
        }
      }
      .border_btm{
        border-bottom: 1px solid  #E6E6E6;
      }
      .foot{
        margin-top: 12px;
        justify-content: space-between;
        .c_btn{
          width: auto;
        }
      }
    }
    
    .dot{
      width: 6px;
      height:6px;
      line-height: 32px;
      vertical-align: middle;
      margin-right: 4px;
      border-radius: 50%;
      background: #FF6E4C;
      display: inline-block;
    }
    .dot2{
      width: 6px;
      height:6px;
      margin-right: 4px;
      border-radius: 50%;
      background: #00A5FF;
      display: inline-block;
    }
    .flex_r{
      display: flex;
      align-items: center;
    }
    .flex_item{
      flex:50%;
      margin: 2px 0;
    }

    .disclaimer{
      margin:12px 12px 62px;
      padding:0 12px;
      color: #999999;
      .dis_title{
        text-align: center;
        font-weight: 500;
        font-size: 14px;
      }
      .dis_desc{
        font-size: 13px;
      }
    }
    .null-box{
      text-align: center;
      color: #999999;
    }
    
    .jc-table {
      width: 100%;
      margin: 5px 0;
      border: 1px solid #ccc;
      border-width: 1px 0 0 0;
      border-radius: 5px;
      td {
        padding: 10px;
        border: 1px solid #ccc;
        border-width: 0 1px 1px 0;
      }
      tr {
        &:first-child {
          td {
            &:last-child {
              border-radius: 0 5px 0 0;
            }
          }
        }
        &:last-child {
          td {
            &:last-child {
              border-radius: 0 0 5px 0;
            }
          }
        }
      }
      .td-tit {
        background: #ccc;
        width: 15%;
        border-radius: 5px 0 0 5px;
        text-align: center;
      }
      .input-txt {
        width: 320px;
      }
      .btn-box {
        margin-bottom: 10px;
        button {
          min-width: 100px;
        }
        .el-button.active,
        .el-button:focus,
        .el-button:hover {
          color: #f7742d;
          border-color: #f7742d;
          // background-color: rgba($color: #f7742d, $alpha: 0.2);
        }
      }
    }
    
  }
  .button{
    width: 100%;
    height: 36px;
    background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
    border-radius: 18px;
    font-family: PingFangSC-Medium;
    font-size: 15px;
    color: #FFFFFF;
    text-align: center;
    font-weight: 500;
    line-height: 36px;
  }
  .page_foot{
    position: fixed;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    padding: 7px 12px;
    background: #FFFFFF;
    box-shadow: 0px -3px 16px -9px rgba(43,43,43,0.2);
    
  }
  .diagnosis-box {
    font-size: 10px;
    margin:12px 0;
    border: 1px solid #dee1e7;
    .good {
      color: #009622;
    }
    .abnormal {
      color: #f7742d;
      .el-icon-caret-top,
      .el-icon-caret-bottom {
        position: relative;
        top: 3px;
        font-size: 14px;
      }
    }
    .diagnosis-tit {
      padding: 6px 10px;
      background-color: #dee1e7;
    }
    .diagnosis-list {
      padding: 10px;
      p {
        margin: 0 0 10px;
      }
    }
    .p_bottom{
      padding-bottom: 4px;
    }
    .p_left{
      padding-left:50px;
    }
    .good-ul {
      overflow: hidden;
      margin: 0;
      padding: 0 0 10px;
      li {
        float: left;
        margin-right: 20px;
        color: #f7742d;
      }
    }
    .scroll_table{
      width:307px;
      overflow-x:scroll; 
    }
    .diagnosis-table {
      width: 100%;
      border: 1px solid #dee1e7;
      border-width: 1px 0 0 0;
      .td_w_1{
        width:22px;
      }
      .td_w_2{
        width:250px;
      }
      td {
        padding: 3px 5px;
        border: 1px solid #dee1e7;
        border-width: 0 1px 1px 0;
        box-sizing: border-box;
        &:first-child {
          background: #f9f9f9;
        }
        &:last-child {
          border-right: 0;
          background: #fff;
        }
      }
    }
    .diagnosis-table2 {
      width: 185%;
      border: 1px solid #dee1e7;
      border-width: 1px 0 0 1px;
      tr.bg {
        td {
          text-align: center;
          background: #f9f9f9;
        }
      }
      td {
        padding: 6px 10px;
        border: 1px solid #dee1e7;
        border-width: 0 1px 1px 0;
      }
    }
  }
  #myChart{
    width:327px;
    height:335px;
  }
  
}
/deep/.van-radio__icon .van-icon {
  font-size:14px;
}
/deep/.van-radio__label{
  color: #009622;
}
/deep/.van-radio__label--disabled{
  color:#c8c9cc;
}


</style>