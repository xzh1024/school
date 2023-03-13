<template>
  <div
    v-loading="exportLoading"
    class="vehicle-detection-preview"
    ref="vehicle-print-wrap"
  >
    <div style="overflow: hidden">
      <img
        class="logo"
        :src="uiConfig && uiConfig.logoUrl ? this[uiConfig.logoUrl] : logo"
        height="110"
      />
      <div class="logo-txt">
        车辆检测报告
      </div>
      <div class="company-msg">
        <div style="font-weight: bold;padding: 10px 0 0;">
          {{ templateItem.companyName }}
        </div>
        <!-- <div style="padding:5px 0;">成都</div> -->
        <div style="padding: 10px 0;">{{ templateItem.companyPhone }}</div>
      </div>
      <div class="er-code">
        <CustomQrcode
          v-if="templateItem.status == 'Complete'"
          :value="codeUrl"
          :configure="{
            width: 120,
            height: 120
          }"
        />
      </div>
    </div>
    <div class="car-msg">
      <div class="msg-li" style="width: 18%">
        <div>
          <img class="logo" src="~@/assets/images/date.png" height="24" />
          {{ dateFormat(templateItem.updatedAt) || "-" }}
        </div>
        <div class="msg-txt">检测日期</div>
      </div>
      <div class="msg-li" style="width: 17%">
        <div>
          <img class="logo" src="~@/assets/images/carNumber.png" height="24" />
          {{
            templateItem.vehicleInfo
              ? templateItem.vehicleInfo.plateNumber
              : "-"
          }}
        </div>
        <div class="msg-txt">车牌号</div>
      </div>
      <div class="msg-li" style="width: 25%">
        <div>
          <img class="logo" src="~@/assets/images/carType.png" height="24" />
          <span v-if="templateItem.vehicleInfo">
            {{
              templateItem.vehicleInfo.facBrand
                ? templateItem.vehicleInfo.facBrand + " "
                : templateItem.vehicleInfo.vehicleGroup
                ? ""
                : "-"
            }}
            {{
              templateItem.vehicleInfo.vehicleGroup
                ? templateItem.vehicleInfo.vehicleGroup
                : ""
            }}
          </span>
        </div>
        <div class="msg-txt">车型</div>
      </div>
      <div class="msg-li" style="width: 30%">
        <div>
          <img class="logo" src="~@/assets/images/vin.png" height="24" />
          {{ templateItem.vehicleInfo.vin || "-" }}
        </div>
        <div class="msg-txt">车架号（VIN码）</div>
      </div>
      <div class="msg-li" style="width: 10%">
        <div>
          <img class="logo" src="~@/assets/images/mileage.png" height="24" />
          {{
            templateItem.vehicleInfo
              ? templateItem.vehicleInfo.mileage
                ? templateItem.vehicleInfo.mileage + "km"
                : "-"
              : ""
          }}
        </div>
        <div class="msg-txt">行驶里程</div>
      </div>
    </div>
    <!-- 模板信息 -->
    <div class="template-box" v-if="templateDetail">
      <div class="template-list">
        <!-- 总结 -->
        <div v-if="!reportInfo || reportInfo.type != 'checkHealth'">
          <div class="template-tit">
            检查总结
          </div>
          <div class="conclusion-box">
            <div
              v-for="(list, ind) in templateItem.checkResultList"
              :key="'a' + ind"
            >
              <p v-if="list != ''">
                <i class="el-icon-warning"></i>
                {{ list }}
              </p>
            </div>
            <div
              class="good"
              v-if="!templateItem.checkResultList"
              style="padding: 10px 0"
            >
              无异常
            </div>
          </div>
        </div>
        <div v-for="(list, inds) in templateDetail" :key="inds">
          <!-- 环车检测 -->
          <div v-if="list.categoryCode == 'CheckAllCar'">
            <div class="template-tit">环车检测</div>
            <div class="car-box">
              <div class="car-bg" id="carImg" ref="carImg">
                <img src="~@/assets/images/car.png" width="100%" />
                <div
                  class="tag-icon-box"
                  :style="
                    'width:1.5385%;margin: 0 0 -0.769% -0.769%;left:' +
                      tag.left +
                      '%;bottom:' +
                      tag.bottom +
                      '%'
                  "
                  v-for="(tag, ind) in tagList"
                  :key="ind"
                >
                  <i v-if="tag.type == 'Line'" class="icon-triangle2"></i>
                  <i v-if="tag.type == 'Crack'" class="icon-cracks2"></i>
                  <i v-if="tag.type == 'Uneven'" class="icon-radius2"></i>
                  <i v-if="tag.type == 'Bad'" class="icon-close2"></i>
                </div>
              </div>
              <div class="tag-list">
                <p :class="tagNum.Line > 0 ? 'active' : ''">
                  <span class="icon-img">
                    <i class="el-icon-caret-top"></i>
                  </span>
                  <span class="tag-txt">划痕</span>
                  <span>——</span>
                  <span class="tag-number">{{ tagNum.Line }}</span>
                </p>
                <p :class="tagNum.Crack > 0 ? 'active' : ''">
                  <span class="icon-img">
                    <i class="icon-cracks"></i>
                  </span>
                  <span class="tag-txt">裂痕</span>
                  <span>——</span>
                  <span class="tag-number">{{ tagNum.Crack }}</span>
                </p>
                <p :class="tagNum.Uneven > 0 ? 'active' : ''">
                  <span class="icon-img">
                    <i class="icon-radius"></i>
                  </span>
                  <span class="tag-txt">凹凸</span>
                  <span>——</span>
                  <span class="tag-number">{{ tagNum.Uneven }}</span>
                </p>
                <p :class="tagNum.Bad > 0 ? 'active' : ''">
                  <span class="icon-img">
                    <i class="el-icon-error"></i>
                  </span>
                  <span class="tag-txt">破损</span>
                  <span>——</span>
                  <span class="tag-number">{{ tagNum.Bad }}</span>
                </p>
              </div>
            </div>
          </div>
          <!-- 仪表盘警示灯 -->
          <div v-if="list.categoryCode == 'DashboardWarningLight'">
            <div class="template-tit">
              仪表盘警示灯
            </div>
            <div class="light-check-box">
              <div class="list-box">
                <div
                  v-for="(item, ind) in list.itemList[0].options"
                  :class="
                    list.itemList[0].result.optionResult[item] ? 'active' : ''
                  "
                  :key="ind"
                >
                  <i :class="'light-img ' + dashboardWarningLightImgs[item]">
                  </i>
                  <p>{{ item }}</p>
                </div>
              </div>
              <div style="overflow: hidden;margin: 0 0 10px;padding: 0 10px">
                <div class="left-label2">检测备注：</div>
                <div class="remrk-txt">
                  {{ list.itemList[0].checkRemark }}
                </div>
              </div>
            </div>
          </div>
          <!-- 灯光检查 -->
          <div v-if="list.categoryCode == 'LightCheck'">
            <div class="template-tit">
              灯光检查
            </div>
            <div class="light-check-box">
              <div class="list-box">
                <div
                  v-for="(item, ind) in list.itemList[0].options"
                  :class="
                    list.itemList[0].result.optionResult[item] ? 'active' : ''
                  "
                  :key="ind"
                >
                  <i :class="'light-img ' + lightCheckImgs[item]"></i>
                  <p>{{ item }}</p>
                </div>
              </div>
              <div style="overflow: hidden;margin: 0 0 10px;padding: 0 10px">
                <div class="left-label2">检测备注</div>
                <div class="remrk-txt">
                  {{ list.itemList[0].checkRemark }}
                </div>
              </div>
            </div>
          </div>
          <!-- 云诊车健康诊断 -->
          <div v-if="list.categoryCode == 'VehicleHealth'">
            <div class="template-tit" style="height: 35px">
              车辆健康诊断-云诊车:
            </div>
            <div v-if="healthMsg.id == 0" style="padding: 10px 0">
              <span class="abnormal">暂无健康诊断报告</span>
            </div>
            <div class="diagnosis-box" v-if="healthMsg.id != 0">
              <div class="diagnosis-tit">
                系统故障码诊断结果汇总
                <span style="float: right">
                  总体状态：
                  <span
                    class="good"
                    v-if="
                      healthMsg.dtc_code01 == '良好' &&
                        healthMsg.dtc_code02 == '良好' &&
                        healthMsg.dtc_code03 == '良好' &&
                        healthMsg.dtc_code04 == '良好'
                    "
                    >良好</span
                  >
                  <span
                    class="abnormal"
                    v-if="
                      healthMsg.dtc_code01 != '良好' ||
                        healthMsg.dtc_code02 != '良好' ||
                        healthMsg.dtc_code03 != '良好' ||
                        healthMsg.dtc_code04 != '良好'
                    "
                    >异常</span
                  >
                </span>
              </div>
              <table class="diagnosis-table" cellspacing="0">
                <tr>
                  <td width="50" align="center">1</td>
                  <td width="500">动力传动系统（发动机、变速箱等）</td>
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
                  <td width="50" align="center">2</td>
                  <td width="500">底盘系统（ABS、防滑系统等）</td>
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
                  <td width="50" align="center">3</td>
                  <td width="500">车身系统（车灯、车门锁、电动座椅等）</td>
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
                  <td width="50" align="center">4</td>
                  <td width="500">网络系统（车载ECU之间的通信状况）</td>
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
                  <td colspan="3">
                    <span style="float: left;">
                      维修建议：
                    </span>
                    <div class="abnormal" style="padding-left: 70px">
                      {{
                        healthMsg.dtc_suggestion_1
                          ? healthMsg.dtc_suggestion_1 + ";"
                          : ""
                      }}
                      {{
                        healthMsg.dtc_suggestion_2
                          ? healthMsg.dtc_suggestion_2 + ";"
                          : ""
                      }}
                      {{
                        healthMsg.dtc_suggestion_3
                          ? healthMsg.dtc_suggestion_3 + ";"
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
                  >
                    异常
                  </span>
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
                <div style="padding-bottom: 10px">
                  <span style="float: left;">
                    诊断结果：
                  </span>
                  <div class="abnormal" style="padding-left: 70px">
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
                <div style="padding-bottom: 10px">
                  <span style="float: left;">
                    修理建议：
                  </span>
                  <div class="abnormal" style="padding-left: 70px">
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
                <div style="padding-bottom: 10px">
                  <span style="float: left;">
                    诊断方式：
                  </span>
                  <div style="padding-left: 70px">
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
                <p>系统故障码诊断结果：</p>
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
                  <tr v-if="!healthMsg.system_fault_code_detail_result">
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
              <div class="diagnosis-tit">
                发动机动态诊断详情信息
              </div>
              <div class="diagnosis-list" v-if="healthMsg.health_diag_abnormal">
                <p>
                  发动机控制诊断结果：
                </p>
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

                <p style="padding-top:10px">发动机传感器诊断结果：</p>
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

                <p style="padding-top:10px">
                  注意：根据车型不同，部分项目参考值暂未设定，标记为--
                </p>
              </div>
              <div class="diagnosis-tit">
                发动机动态诊断异常项目说明
              </div>
              <div class="diagnosis-list">
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
          <!-- 其他 -->
          <div v-if="!codeArr.includes(list.categoryCode)">
            <div class="template-tit" style="height: 35px">
              {{ list.name }}
            </div>
            <table
              class="jc-table"
              cellspacing="0"
              v-for="(item1, ind1) in list.children"
              :key="item1.name + ind1"
            >
              <tr
                v-for="(item2, ind2) in item1.itemList"
                :key="'s' + item2.name + ind2"
              >
                <td
                  style="width:20%"
                  :rowspan="ind2 == 0 ? item1.itemList.length : ''"
                  class="td-tit"
                  v-if="ind2 == 0"
                >
                  {{ item1.name }}
                </td>
                <td style="width:30%">
                  <p style="margin-bottom: 0px">{{ item2.name }}</p>
                  <span style="color: #909399">{{ item2.description }}</span>
                </td>
                <td>
                  <div style="float:left;width: 100%">
                    <label style="float:left;">
                      检测结果：
                    </label>
                    <div style="margin-left: 75px">
                      <span
                        v-for="(item3, ind3) in item2.options"
                        :key="'a' + item3 + ind3"
                        style="color:#f7742d"
                      >
                        <span v-if="item2.result.optionResult[item3]">
                          {{ item3 }}
                          <span
                            v-if="item2.flags.clickInput != 1 && item2.value"
                            style="color:#f7742d"
                          >
                            （
                          </span>
                        </span>
                      </span>
                      <span
                        v-if="item2.flags.clickInput != 1 && item2.value"
                        style="color:#f7742d"
                      >
                        {{ item2.value }}{{ item2.unit }}1
                      </span>
                      <span
                        v-for="(item3, ind3) in item2.options"
                        :key="'b' + item3 + ind3"
                        style="color:#f7742d"
                      >
                        <span v-if="item2.result.optionResult[item3]">
                          <span
                            v-if="item2.flags.clickInput != 1 && item2.value"
                            style="color:#f7742d"
                          >
                            ）
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div
                    v-if="item2.flags.enableRemark"
                    style="float:left;width: 100%;margin-top: 10px"
                  >
                    <label style="float:left;">
                      检测备注：
                    </label>
                    <div style="margin-left: 75px;color:#f7742d">
                      {{ item2.checkRemark }}
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <div
              style="overflow:hidden;"
              v-if="list.categoryCode == 'CheckAirConditioning'"
            >
              <div style="overflow: hidden;margin: 10px 0;padding: 0 10px">
                <div class="left-label2">修理建议</div>
                <div class="remrk-txt">
                  {{ list.remark }}
                </div>
              </div>
              <p style="background-color: #dee1e7;padding: 5px 10px">
                检测报告图
              </p>
              <div style="overflow: hidden;margin: 0 0 10px;">
                <div style="float:left;width:50%;padding:50px 3% 20px">
                  <img src="~@/assets/images/kt.png" width="100%" />
                  <div class="kt-bottom-box">
                    <div>
                      进气温度：
                      <span style="color:#00A5FF;">
                        {{
                          airConditioner.inletTemperature
                            ? airConditioner.inletTemperature + "℃"
                            : "--"
                        }}
                      </span>
                    </div>
                    <div>
                      回风口温度：
                      <span style="color:#00A5FF;">
                        {{
                          airConditioner.returnOutletTemperature
                            ? airConditioner.returnOutletTemperature + "℃"
                            : "--"
                        }}
                      </span>
                    </div>
                    <div>
                      相对湿度：
                      <span style="color:#00A5FF;">
                        {{
                          airConditioner.relativeHumidity
                            ? airConditioner.relativeHumidity + "%"
                            : "--"
                        }}
                      </span>
                    </div>
                    <div>
                      出风口温度：
                      <span style="color:#00A5FF;">
                        {{
                          airConditioner.outletTemperature
                            ? airConditioner.outletTemperature + "℃"
                            : "--"
                        }}
                      </span>
                    </div>
                  </div>
                </div>
                <div style="float: left;width: 50%;padding:0 3%">
                  <div style="width: 100%" class="myChart-box">
                    <div id="myChart"></div>
                  </div>
                  <div>
                    <span style="font-weight: bold;padding:0 20px 0 50px">
                      检测结果
                    </span>
                    <el-radio-group v-model="radio" size="small">
                      <el-radio label="1" :disabled="radio == 2">良</el-radio>
                      <el-radio label="2" :disabled="radio == 1">不良</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 检查照片 -->
        <div v-if="!reportInfo || reportInfo.type != 'checkHealth'">
          <div class="template-tit">
            检查照片
          </div>
          <div class="img-box" v-if="imgFileList">
            <el-image
              v-for="(img, ind) in imgFileList"
              :src="img.url"
              :key="ind"
              style="border:1px solid #ccc"
            ></el-image>
            <div v-if="imgFileList.length == 0" style="padding: 0">
              <span class="good">无照片</span>
            </div>
          </div>
        </div>
        <!-- <div style="overflow: hidden">
          <div style="padding: 10px 0">客户签字：___________________</div>
          <div>
            <div class="er-code2">二维码</div>
            <div style="padding-left: 85px; line-height: 85px">
              客户扫码签字
            </div>
          </div>
        </div> -->
        <!-- <div> -->
        <!-- <canvas class="canvasId" /> -->
        <!-- <button @click="save">保存</button>
          <button @click="clear">清除</button> -->
        <!-- </div> -->
        <div class="disclaimer">
          <span style="float: left;">「免责声明」</span>
          <div style="padding-left: 85px">
            诊断报告的内容仅供参考，我们不保证本健康诊断报告对待定车辆的适用性
            或满足用户或车主的待定需求或特定期望，也不为此承担任何责任，对车辆进行检修的结
            果由用户或者车主自行承担责任。
          </div>
        </div>
      </div>
    </div>
    <!-- 为空 -->
    <div class="null-box" v-if="!templateDetail">
      <span>车辆检测未完成，无检测报告！</span>
    </div>
    <div
      style="margin: 10px 0 5px 0; text-align: center;"
      v-show="!exportLoading"
    >
      <el-button
        :loading="this.exportLoading"
        :disabled="!templateDetail || this.exportLoading || !isCompated"
        type="primary"
        size="mini"
        @click="print"
      >
        打印（F10）
      </el-button>
      <el-button type="primary" size="mini" plain @click="$emit('close')">
        关 闭（Esc）
      </el-button>
    </div>
  </div>
</template>

<script>
import {
  checkReportDetail,
  checkHealthsDetail
} from "@/api/repairs/checkReports";
import { dateFormat } from "@/utils/date";
// import SignaturePad from "signature_pad";

import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { CustomChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import CustomQrcode from "@/components/CustomQrcode/index";
// import { getPlatformUrl } from "@/api/platform/index";
import { createShares } from "@/api/base";
import { getVehicleDectationUrl } from "@/api/repairs";
import { uiConfig } from "envConfigPath";
echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CustomChart,
  LineChart,
  CanvasRenderer
]);

export default {
  name: "vehicle-detection",
  components: { CustomQrcode },
  // eslint-disable-next-line vue/no-unused-components
  props: {
    reportInfo: {
      type: Object,
      default: () => {}
    },
    orderInfo: {
      type: Object,
      default: () => {}
    },
    isCompated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uiConfig,
      logo: require("../../../../assets/images/logo.png"),
      densoLogo: require("../../../../assets/images/logo-denso.png"),
      exportLoading: false,
      dateFormat,
      codeArr: [
        "CheckAllCar",
        "DashboardWarningLight",
        "LightCheck",
        "VehicleHealth",
        "CopilotPosition"
      ], // 特殊code
      lightCheckImgs: {
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
      templateItem: {
        vehicleInfo: {}
      },
      templateDetail: [], // 模板详情
      tagList: [], // 环车检测-坐标数据聚合
      tagNum: {
        Line: 0,
        Crack: 0,
        Uneven: 0,
        Bad: 0
      }, // 环车检测-检测计数
      imgFileList: [],
      SignaturePad: null,
      config: {
        penColor: "red", //笔刷颜色
        minWidth: 3 //最小宽度
      },
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
      healthMsg: {},
      codeUrl: ""
    };
  },
  created() {
    this.load();
  },
  mounted() {
    setTimeout(() => {
      if (this.templateDetail && this.templateDetail.length > 0) {
        this.templateDetail.forEach(item => {
          if (item.categoryCode == "CheckAirConditioning") {
            this.drawLine();
          }
        });
      }
    }, 2000);
  },
  methods: {
    print() {
      if (!this.templateDetail) {
        this.$$message.warning("车辆还未完成检测，无法打印报告！");
        return;
      }
      this.exportLoading = true;
      // 判断是否是电装环境
      const isDenso = this.uiConfig && this.uiConfig.uiTheme === "denso";
      if (isDenso) {
        getVehicleDectationUrl({
          id: this.templateItem.id
        })
          .then(res => {
            this.exportLoading = false;
            window.open(res.url);
          })
          .catch(() => {
            this.exportLoading = false;
          });
      } else {
        this.$html2canvas(this.$refs["vehicle-print-wrap"], {
          scale: 1260 / 1920,
          dpi: 144,
          useCORS: true
        })
          .then(canvas => {
            canvas.id = "mycanvas";
            //生成base64图片数据
            const dataUrl = canvas.toDataURL();
            const newImg = document.createElement("img");
            newImg.src = dataUrl;
            const printWindow = window.open(newImg.src);
            this.exportLoading = false;
            printWindow.document.write(
              '<img src="' +
                newImg.src +
                ' " style="display: block;margin:-8px auto"/>'
            );
            this.$nextTick(() => {
              setTimeout(() => {
                printWindow.print();
              }, 1000);
            });
          })
          .finally(() => {
            this.exportLoading = false;
          });
      }
    },
    load() {
      // type: checkHealth 健康诊断  checkReport 电子点检
      if (this.orderInfo) {
        console.log("工单");
        this.getCheckReportDetail();
      }
      // 电子点检
      if (this.reportInfo && this.reportInfo.type == "checkReport") {
        console.log("电子点检");
        this.getCheckReportDetail();
        this.getQrCode(this.reportInfo.id);
        console.log(this.reportInfo);
      }
      // 健康诊断
      if (this.reportInfo && this.reportInfo.type == "checkHealth") {
        console.log("健康诊断");
        this.getCheckHealthDetail();
        this.getQrCode(this.reportInfo.id);
        console.log(this.reportInfo);
      }
    },
    getQrCode(id) {
      if (!id) return;
      createShares({
        type: "bill",
        value: {
          billType: "JC",
          billId: id
        }
      }).then(res => {
        this.codeUrl = res.url || "";
      });
      // getPlatformUrl({
      //   type: type,
      //   id: id
      // }).then(res => {
      //   const { zysc } = res;
      //   this.codeUrl = zysc;
      //   console.log(this.codeUrl);
      // });
    },
    //获取模板保存的详情-电子点检
    getCheckReportDetail() {
      this.loading = true;
      const params = {};
      if (this.orderInfo) {
        params.orderId = this.orderInfo.id ? this.orderInfo.id : 0;
      }
      if (this.reportInfo) {
        params.id = this.reportInfo.id ? this.reportInfo.id : 0;
      }
      if (!params.id && !params.orderId) {
        return false;
      }
      checkReportDetail(params).then(res => {
        console.log("预览详情：", res);
        if (res.id) {
          this.templateItem = res;
          if (res.status == "Complete") {
            if (this.orderInfo) {
              this.getQrCode(res.id);
            }
          }
          this.templateDetail = res.contents;
          this.healthMsg = res.healthInfo || {};
          // 图片回显
          if (res.imageUrls) {
            this.imgFileList = [];
            res.imageUrls.forEach((item, ind) => {
              this.imgFileList.push({
                name: "",
                url: item,
                origin: res.images[ind]
              });
            });
          }
          if (this.templateDetail) {
            this.templateDetail.forEach(item => {
              if (item.categoryCode == "CheckAllCar") {
                if (item.itemList[0].result.checkAllCarResult) {
                  this.tagRepetition(item.itemList[0].result.checkAllCarResult);
                }
              }
              if (item.categoryCode == "CheckAirConditioning") {
                this.airConditioner = {
                  inletTemperature: "--",
                  outletTemperature: "--",
                  returnOutletTemperature: "--",
                  relativeHumidity: "--"
                };
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
                        // eslint-disable-next-line prettier/prettier
                        this.airConditioner.returnOutletTemperature =
                          item3.value; // 回风口温度
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
          }
        }
        this.loading = false;
      });
    },
    // 获取详情-健康诊断
    getCheckHealthDetail() {
      this.templateItem = {
        vehicleInfo: {}
      };
      this.templateDetail = [];
      const params = {
        id: this.reportInfo.id ? this.reportInfo.id : 0
      };
      checkHealthsDetail(params).then(res => {
        console.log(res);
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
      this.tagList = [];
      const imgWidth = 1300;
      const imgHieght = 650;
      if (list.length > 0) {
        list.forEach(item => {
          const left = (Number(item.m) / imgWidth) * 100;
          const bottom = (Number(item.n) / imgHieght) * 100;
          this.tagList.push({
            x: item.n,
            y: item.m,
            left: left,
            bottom: bottom,
            type: item.type
          });
        });
        this.tagCount();
      }
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
      // console.log(this.cheartData);
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
          left: "8%",
          right: "4%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          name: "相对湿度（%）",
          nameLocation: "center",
          nameGap: 40,
          nameTextStyle: {
            width: 20
          }
        },
        yAxis: {
          name: "回风口/出风口温度差（℃）",
          nameLocation: "center",
          nameRotate: 270,
          nameGap: 35,
          nameTextStyle: {
            width: 20
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
            data: this.pointData,
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
    }
  }
};
</script>

<style lang="scss" scoped>
@media print {
  html,
  body {
    //A4默认为210mm*287mm
    width: 210mm;
    height: 287mm;
  }
  #vehicle-print-wrap {
    font-size: 10pt;
    width: initial;
  }
  @page {
    size: A4;
    margin: 1cm; //设置打印出来的页面外边距
  }
}
.vehicle-detection-preview {
  ::v-deep {
    overflow: auto;
    height: calc(100% - 50px);
    padding: 5px 10px;
    .template-box {
      width: 100%;
      // height: calc(100% - 45px);
      margin-top: 5px;
      overflow-y: auto;
      .template-list {
        min-width: 1000px;
        .template-tit {
          position: relative;
          height: 30px;
          line-height: 30px;
          margin-top: 5px;
          padding: 0 10px;
          border-bottom: 1px dotted #ccc;
          &::before {
            position: absolute;
            left: 0;
            top: 8px;
            display: inline-block;
            content: "";
            width: 4px;
            background: #3aa7ff;
            height: 14px;
            margin-right: 5px;
            border-radius: 100px;
          }
          span {
            color: #909399;
            font-size: 12px;
            padding: 0 10px;
          }
        }
        .car-box {
          position: relative;
          min-width: 1000px;
          .car-bg {
            position: relative;
            width: 70%;
            min-width: 800px;
            margin: 10px 5%;
            // border: 1px dotted #ccc;
            // border-radius: 5px;
            .tag-icon-box {
              position: absolute;
              z-index: 99;
              display: inline-block;
              width: 20px;
              &::before {
                content: "";
                padding-top: 100%;
                display: block;
              }
              i {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: #f7742d;
              }
              .icon-triangle2 {
                bottom: 1px;
                left: -1px;
                background: url("~@/assets/images/icon-triangle.png") no-repeat
                  left top;
                background-size: 100% auto;
              }
              .icon-cracks2 {
                background: #f7742d;
              }
              .icon-radius2 {
                border-radius: 50%;
                background: #f7742d;
                text-align: center;
              }
              .icon-close2 {
                background: url("~@/assets/images/icon-close.png") no-repeat
                  left top;
                background-size: 100% auto;
              }
            }
          }
          .tag-list {
            position: absolute;
            right: 30px;
            top: 0px;
            color: #909399;
            user-select: none;
            .tag-txt {
              padding-right: 10px;
            }
            .tag-number {
              display: inline-block;
              width: 40px;
              margin-left: 10px;
              border: 1px solid #999;
              border-radius: 4px;
              text-align: center;
            }
          }
          .icon-img {
            position: relative;
            top: 3px;
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            i {
              position: absolute;
              right: 0;
              bottom: 0;
            }
            .el-icon-caret-top {
              right: -4px;
              bottom: -6px;
              font-size: 30px;
            }
            .icon-cracks {
              display: inline-block;
              right: 3px;
              bottom: 0px;
              width: 16px;
              height: 16px;
              background: #909399;
            }
            .icon-radius {
              display: inline-block;
              right: 2px;
              width: 18px;
              height: 18px;
              border-radius: 9px;
              background: #909399;
            }
            .el-icon-error {
              bottom: -2px;
              font-size: 22px;
            }
          }
          .active {
            .el-icon-caret-top,
            .el-icon-error {
              color: #f7742d;
            }
            .icon-cracks,
            .icon-radius {
              background: #f7742d;
            }
            .tag-txt {
              color: #f7742d;
            }
            .tag-number {
              border: 1px solid #f7742d;
              color: #f7742d;
            }
          }
          .check-box {
            display: inline-block;
            margin: 0;
            .check-list {
              position: relative;
              top: 2px;
              display: inline-block;
              border: 1px solid #909399;
              color: #909399;
              border-radius: 4px;
              margin: 5px;
              padding: 0 10px;
              height: 32px;
              line-height: 32px;
              cursor: pointer;
              user-select: none;
            }
            .active {
              border: 1px solid #f7742d;
              color: #f7742d;
            }
          }
        }
        .left-label2 {
          float: left;
          width: 70px;
        }
        .remrk-txt {
          margin-left: 70px;
          color: #f7742d;
        }
        .kt-bottom-box {
          overflow: hidden;
          div {
            float: left;
            width: 50%;
            padding: 5px;
          }
        }
        .list-box {
          overflow: hidden;
          padding: 10px 0 0;
          div {
            position: relative;
            float: left;
            margin: 0 10px 10px 0;
            background: #fff;
            text-align: center;
            .light-img {
              display: inline-block;
              width: 60px;
              height: 60px;
              padding: 5px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            p {
              height: 20px;
              line-height: 20px;
              margin: 0;
              text-align: center;
              user-select: none;
              font-size: 12px;
            }
            .other {
              background: #fff url("~@/assets/images/light/other.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .abs {
              background: #fff url("~@/assets/images/light/abs.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .storagebattery {
              background: #fff url("~@/assets/images/light/storagebattery.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .tirepressurealarmlamp {
              background: #fff
                url("~@/assets/images/light/tirepressurealarmlamp.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .watertemperature {
              background: #fff
                url("~@/assets/images/light/watertemperature.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .oilalarmlamp {
              background: #fff url("~@/assets/images/light/oilalarmlamp.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .enginefailurelight {
              background: #fff
                url("~@/assets/images/light/enginefailurelight.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .brake {
              background: #fff url("~@/assets/images/light/brake.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .bathofglass {
              background: #fff url("~@/assets/images/light/bathofglass.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .srs {
              background: #fff url("~@/assets/images/light/srs.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            // 分界线 上面是警示灯  下面是常规灯光
            .otherlight {
              background: #fff url("~@/assets/images/light/otherlight.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .brakelight {
              background: #fff url("~@/assets/images/light/brakelight.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rearprofilelight {
              background: #fff
                url("~@/assets/images/light/rearprofilelight.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .frontprofilelight {
              background: #fff
                url("~@/assets/images/light/frontprofilelight.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rearfoglamps {
              background: #fff url("~@/assets/images/light/rearfoglamps.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .frontfoglamps {
              background: #fff url("~@/assets/images/light/frontfoglamps.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rightturnsignal {
              background: #fff url("~@/assets/images/light/rightturnsignal.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftturnsignal {
              background: #fff url("~@/assets/images/light/leftturnsignal.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rightrearheadlights {
              background: #fff
                url("~@/assets/images/light/rightrearheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .leftrearheadlights {
              background: #fff
                url("~@/assets/images/light/leftrearheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rightfrontheadlights {
              background: #fff
                url("~@/assets/images/light/rightfrontheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .leftfrontheadlights {
              background: #fff
                url("~@/assets/images/light/leftfrontheadlights.png") no-repeat
                center center;
              background-size: auto 50%;
            }
          }
          .active {
            .light-img {
              border: 1px solid #f7742d;
            }
            p {
              color: #f7742d;
            }
            .other {
              background: #fff url("~@/assets/images/light/other_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .abs {
              background: #fff url("~@/assets/images/light/abs_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .storagebattery {
              background: #fff
                url("~@/assets/images/light/storagebattery_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .tirepressurealarmlamp {
              background: #fff
                url("~@/assets/images/light/tirepressurealarmlamp_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .watertemperature {
              background: #fff
                url("~@/assets/images/light/watertemperature_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .oilalarmlamp {
              background: #fff
                url("~@/assets/images/light/oilalarmlamp_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .enginefailurelight {
              background: #fff
                url("~@/assets/images/light/enginefailurelight_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .brake {
              background: #fff url("~@/assets/images/light/brake_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .bathofglass {
              background: #fff
                url("~@/assets/images/light/bathofglass_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .srs {
              background: #fff url("~@/assets/images/light/srs_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            // 分界线 上面是警示灯  下面是常规灯光
            .otherlight {
              background: #fff
                url("~@/assets/images/light/otherlight_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .brakelight {
              background: #fff
                url("~@/assets/images/light/brakelight_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rearprofilelight {
              background: #fff
                url("~@/assets/images/light/rearprofilelight_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .frontprofilelight {
              background: #fff
                url("~@/assets/images/light/frontprofilelight_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rearfoglamps {
              background: #fff
                url("~@/assets/images/light/rearfoglamps_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .frontfoglamps {
              background: #fff
                url("~@/assets/images/light/frontfoglamps_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rightturnsignal {
              background: #fff
                url("~@/assets/images/light/rightturnsignal_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftturnsignal {
              background: #fff
                url("~@/assets/images/light/leftturnsignal_hover.png") no-repeat
                center center;
              background-size: auto 50%;
            }
            .rightrearheadlights {
              background: #fff
                url("~@/assets/images/light/rightrearheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftrearheadlights {
              background: #fff
                url("~@/assets/images/light/leftrearheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .rightfrontheadlights {
              background: #fff
                url("~@/assets/images/light/rightfrontheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
            .leftfrontheadlights {
              background: #fff
                url("~@/assets/images/light/leftfrontheadlights_hover.png")
                no-repeat center center;
              background-size: auto 50%;
            }
          }
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
            margin-bottom: 5px;
            button {
              min-width: 100px;
            }
            .el-button.active,
            .el-button:focus,
            .el-button:hover {
              color: #f7742d;
              border-color: #f7742d;
              background-color: rgba($color: #f7742d, $alpha: 0.2);
            }
          }
        }
      }
    }
    .img-box {
      padding: 10px 0;
      .el-image {
        width: 200px;
        height: 200px;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 10px 10px 0;
      }
    }
    .conclusion-box {
      color: #f7742d;
    }
    .logo {
      float: left;
    }
    .logo-txt {
      float: left;
      height: 80px;
      padding: 30px 0 0 20px;
      font-size: 28px;
      color: #606266;
      font-weight: bold;
    }
    .el-radio-group {
      .el-radio:first-child {
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #009622;
          background: #009622;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #009622;
        }
      }
      .el-radio:last-child {
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #f7742d;
          background: #f7742d;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #f7742d;
        }
      }
    }
    .good {
      color: #009622 !important;
    }
    .abnormal {
      color: #f7742d !important;
      .el-icon-caret-top,
      .el-icon-caret-bottom {
        position: relative;
        top: 3px;
        font-size: 20px;
      }
    }
  }
  .company-msg {
    float: right;
    padding: 5px 20px 0 0;
  }
  .er-code {
    float: right;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    margin: 5px 10px;
    // border: 1px solid #333;
    box-sizing: border-box;
  }
  .er-code2 {
    float: left;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    margin: 10px 0;
    // border: 1px solid #333;
    box-sizing: border-box;
  }
  .car-msg {
    margin-bottom: 10px;
    padding: 30px 30px 15px;
    box-shadow: 0 6px 4px -4px #c0c4cc;
    .msg-li {
      display: inline-block;
      font-weight: bold;
      img {
        position: relative;
        top: -2px;
        margin-right: 5px;
      }
    }
    .msg-txt {
      color: #909399;
      padding: 5px 0 0 26px;
      font-weight: 400;
    }
  }
  .disclaimer {
    color: #909399;
  }
  .canvasId {
    width: 400px;
    height: 300px;
    border: 1px dotted #909399;
    border-radius: 4px;
  }
  .null-box {
    height: 300px;
    line-height: 300px;
    text-align: center;
    color: #909399;
  }
  .diagnosis-box {
    border: 1px solid #dee1e7;
    .good {
      color: #009622;
    }
    .abnormal {
      color: #f7742d;
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
    .diagnosis-table {
      width: 100%;
      border: 1px solid #dee1e7;
      border-width: 1px 0 0 0;
      td {
        padding: 6px 10px;
        border: 1px solid #dee1e7;
        border-width: 0 1px 1px 0;
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
      width: 100%;
      border: 1px solid #dee1e7;
      border-width: 1px 0 0 1px;
      tr.bg {
        td {
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
  .myChart-box {
    position: relative;
    &::before {
      content: "";
      padding-top: 100%;
      display: block;
    }
    #myChart {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      width: 100%;
      height: 100%;
    }
  }
  // #signature {
  //   border: double 3px transparent;
  //   border-radius: 5px;
  //   background-image: linear-gradient(white, white),
  //     radial-gradient(circle at top left, #4bc5e8, #9f6274);
  //   background-origin: border-box;
  //   background-clip: content-box, border-box;
  // }
}
</style>
