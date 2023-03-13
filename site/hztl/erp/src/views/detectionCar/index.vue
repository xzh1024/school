<template>
  <div id="app">
    <div class="detection-car-box">
      <!-- <div class="header">
        云诊车
      </div> -->
      <div class="content" v-loading="loading">
        <div class="template-change">
          选择检测模板
          <el-select
            v-model="templateCheckCodeId"
            placeholder="请选择"
            size="small"
            style="width:200px"
            :disabled="detectionId == 0"
            @change="templateChange"
          >
            <el-option
              v-for="item in templateList"
              :key="item.codeId"
              :label="item.name"
              :value="item.codeId"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 模板信息 -->
        <div
          class="template-box"
          v-if="templateCheckCodeId != '' && templateDetail"
        >
          <div class="template-list">
            <div v-for="(list, ind) in templateDetail" :key="ind">
              <!-- 环车检测 -->
              <div v-if="list.categoryCode == 'CheckAllCar'">
                <div class="template-tit">环车检测</div>
                <div class="car-box">
                  <div
                    class="car-bg"
                    id="carImg"
                    ref="carImg"
                    @click="getMouseXY($event)"
                  >
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
                  <div style="padding: 0 10px">
                    <div class="left-label">检测结果</div>
                    <div>
                      <div class="check-box">
                        <div
                          @click="tagChange('Line')"
                          :class="
                            tagCheck == 'Line'
                              ? 'check-list active'
                              : 'check-list'
                          "
                        >
                          <span class="icon-img">
                            <i class="el-icon-caret-top"></i>
                          </span>
                          划痕
                        </div>
                        <div
                          @click="tagChange('Crack')"
                          :class="
                            tagCheck == 'Crack'
                              ? 'check-list active'
                              : 'check-list'
                          "
                        >
                          <span class="icon-img">
                            <i class="icon-cracks"></i>
                          </span>
                          裂痕
                        </div>
                        <div
                          @click="tagChange('Uneven')"
                          :class="
                            tagCheck == 'Uneven'
                              ? 'check-list active'
                              : 'check-list'
                          "
                        >
                          <span class="icon-img">
                            <i class="icon-radius"></i>
                          </span>
                          凹凸
                        </div>
                        <div
                          @click="tagChange('Bad')"
                          :class="
                            tagCheck == 'Bad'
                              ? 'check-list active'
                              : 'check-list'
                          "
                        >
                          <span class="icon-img">
                            <i class="el-icon-error"></i>
                          </span>
                          破损
                        </div>
                      </div>
                      <span>选择画笔，在车身上标记检测结果。</span>
                      <el-button
                        type="primary"
                        style="float:right;"
                        size="small"
                        :disabled="tagList.length == 0"
                        @click="resetTag"
                        plain
                      >
                        清理全部
                      </el-button>
                      <el-button
                        type="primary"
                        style="float:right;margin-right: 10px"
                        size="small"
                        :disabled="tagList.length == 0"
                        @click="withdrawTag"
                        plain
                      >
                        撤回
                      </el-button>
                    </div>
                  </div>
                  <div style="margin:10px 0;padding: 0 10px">
                    <div class="left-label">检测备注</div>
                    <div style="margin-left: 65px;padding-top: 5px">
                      <el-input
                        size="small"
                        v-model="list.itemList[0].checkRemark"
                        placeholder="请输入检测备注"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 仪表盘警示灯 -->
              <div v-if="list.categoryCode == 'DashboardWarningLight'">
                <div class="template-tit">
                  仪表盘警示灯 <span>点击可标记存在异常情况的选项</span>
                </div>
                <div class="light-check-box">
                  <div class="list-box">
                    <div
                      v-for="(item, ind) in list.itemList[0].options"
                      :class="
                        list.itemList[0].result.optionResult[item]
                          ? 'active'
                          : ''
                      "
                      :key="ind"
                      @click="checkLight(list.itemList[0], item)"
                    >
                      <i
                        :class="'light-img ' + dashboardWarningLightImgs[item]"
                      >
                      </i>
                      <p>{{ item }}</p>
                    </div>
                  </div>
                  <div style="margin: 0 0 10px;padding: 0 10px">
                    <div class="left-label">检测备注</div>
                    <div style="margin-left: 65px;padding-top: 5px">
                      <el-input
                        v-model="list.itemList[0].checkRemark"
                        size="small"
                        placeholder="请输入检测备注"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 灯光检查 -->
              <div v-if="list.categoryCode == 'LightCheck'">
                <div class="template-tit">
                  灯光检查 <span>点击可标记存在异常情况的选项</span>
                </div>
                <div class="light-check-box">
                  <div class="list-box">
                    <div
                      v-for="(item, ind) in list.itemList[0].options"
                      :class="
                        list.itemList[0].result.optionResult[item]
                          ? 'active'
                          : ''
                      "
                      :key="ind"
                      @click="checkLight(list.itemList[0], item)"
                    >
                      <i :class="'light-img ' + lightCheckImgs[item]"></i>
                      <p>{{ item }}</p>
                    </div>
                  </div>
                  <div style="margin: 0 0 10px;padding: 0 10px">
                    <div class="left-label">检测备注</div>
                    <div style="margin-left: 65px;padding-top: 5px">
                      <el-input
                        v-model="list.itemList[0].checkRemark"
                        size="small"
                        placeholder="请输入检测备注"
                      ></el-input>
                    </div>
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
                  :key="ind1"
                >
                  <tr v-for="(item2, ind2) in item1.itemList" :key="ind2">
                    <td
                      :rowspan="ind2 == 0 ? item1.itemList.length : ''"
                      class="td-tit"
                      v-if="ind2 == 0"
                    >
                      {{ item1.name }}
                    </td>
                    <td style="width:20%">
                      <p style="margin-bottom: 0px">{{ item2.name }}</p>
                      <span style="color: #909399">{{
                        item2.description
                      }}</span>
                    </td>
                    <td>
                      <div style="float:left;width: 100%">
                        <label style="float:left;line-height: 30px;">
                          检测结果：
                        </label>
                        <div style="margin-left: 80px">
                          <div
                            class="btn-box"
                            v-if="item2.flags.clickInput != 2"
                          >
                            <el-button
                              size="small"
                              :class="
                                item2.result.optionResult[item3] ? 'active' : ''
                              "
                              v-for="(item3, ind3) in item2.options"
                              :key="ind3"
                              @click="
                                optionsCheck(item2.result.optionResult, item3)
                              "
                            >
                              {{ item3 }}
                            </el-button>
                          </div>
                          <el-input
                            v-if="item2.flags.clickInput != 1"
                            size="small"
                            class="input-txt"
                            v-model="item2.value"
                            :placeholder="
                              '正常值在' +
                                item2.minValue +
                                '-' +
                                item2.maxValue +
                                '之间'
                            "
                          >
                            <template slot="append">{{ item2.unit }}</template>
                          </el-input>
                        </div>
                      </div>
                      <div
                        v-if="item2.flags.enableRemark"
                        style="float:left;width: 100%;margin-top: 5px;"
                      >
                        <label style="float:left;line-height: 30px;">
                          检测备注：
                        </label>
                        <div style="margin-left: 80px">
                          <el-input
                            v-model="item2.checkRemark"
                            size="small"
                            placeholder="请输入检测备注"
                          ></el-input>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <div
                  style="margin: 0 0 10px;padding: 0 10px"
                  v-if="list.categoryCode == 'CheckAirConditioning'"
                >
                  <div class="left-label">修理建议</div>
                  <div style="margin-left: 65px;padding-top: 5px">
                    <el-input
                      v-model="list.remark"
                      size="small"
                      placeholder="请输入修理建议"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <!-- 检查照片 -->
            <div v-if="templateDetail && templateDetail.length > 0">
              <div class="template-tit">
                检查照片
                <span style="position:absolute;right:0">最多支持6张</span>
              </div>
              <div class="img-upload">
                <srimg-upload
                  :file-list="imgFileList"
                  :limit="6"
                  :max-size="6"
                  type="shard"
                  class="payment-voucher-img"
                  @get-file-list="getFileList"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 空项目提示 -->
        <div
          class="null-box"
          v-if="detectionId != 0 && templateCheckCodeId == ''"
        >
          <span>还没有检测项目哦，请选择检测模板。</span>
        </div>
        <!-- 空模板提示 -->
        <div
          class="null-box"
          v-if="
            detectionId != 0 && templateCheckCodeId != '' && !templateDetail
          "
        >
          <span>该模板下没有检测项目哦，请重新选择检测模板。</span>
        </div>
        <div class="null-box" v-if="detectionStatus">
          <span>
            <div style="padding: 10px 0">加载失败！</div>
            <el-button
              type="danger"
              size="small"
              @click="checkReportCreates"
              style="padding: 9px 40px"
            >
              重新加载
            </el-button>
          </span>
        </div>
      </div>
      <div class="bottom">
        <el-button
          type="danger"
          size="small"
          v-if="detectionId != 0"
          @click="savaDetection('Complete')"
          style="padding: 9px 40px"
        >
          保 存
        </el-button>
      </div>
    </div>
    <!-- 切换提示 -->
    <ht-dialog
      title="提示"
      :visible.sync="changeDialogVisible"
      custom-class="transfer-dialog"
      width="460px"
      top="30%"
      @close="cancelChange"
    >
      <div style="text-align:center;padding:30px 0">
        切换模板将丢失当前内容，确认切换？
      </div>
      <div slot="footer" style="text-align:center">
        <el-button size="small" type="primary" @click="submitChange"
          >确 定（F3）</el-button
        >
        <el-button size="small" @click="cancelChange">取 消（Esc）</el-button>
      </div>
    </ht-dialog>
  </div>
</template>
<script>
import qs from "qs";
import SrImgUpload from "@/components/base/SrImgUpload"; // 云诊车嵌套页面-图片上传
import {
  templateLists,
  vehicleReportDetail,
  vehicleReportCreate,
  vehicleReportUpdate,
  setDetectionToken
} from "@/api/repairs/checkReports";

export default {
  name: "detection-car",
  components: {
    "srimg-upload": SrImgUpload
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      changeDialogVisible: false,
      changeStatus: true,
      detectionId: 0, // 车辆检测id
      detectionStatus: false,
      templateList: [], // 模板列表
      templateCheckCodeId: "", // 选中的模板codeId
      templateItem: {}, // 选中的模板模板信息
      detectionDetail: {}, // 车辆检测详情
      templateDetail: [], // 选中的模板模板项目详情
      tagCheck: "", // 环车检测-画笔
      tagList: [], // 环车检测-坐标数据聚合
      tagNum: {
        Line: 0,
        Crack: 0,
        Uneven: 0,
        Bad: 0
      }, // 环车检测-检测计数
      imgFileList: [], // 图片列表
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
      billNo: ""
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.templateCheckCodeId = "";
      const token = qs.parse(location.search.substring(1)).token;
      setDetectionToken({
        token: token,
        platformKey: "denso"
      }).then(() => {
        // 模板列表
        templateLists().then(res => {
          res.Rows.forEach(item => {
            item.codeId = item.code + item.id;
          });
          this.templateList = res.Rows || [];
          this.checkReportCreates();
        });
      });
    },
    // 创建检测
    checkReportCreates() {
      this.detectionDetail = {};
      this.loading = true;
      const query = qs.parse(location.search.substring(1));
      const data = {
        code: "DZ", // 三方平台编码 电装：DZ
        billType: "DeviceCheck", // 检测报告单类型
        snNumber: query.snNumber, // 设备sn
        uid: query.uid, // 三方平台用户ID
        plateNumber: query.plateNumber, // 车牌号
        vin: query.vin // 车架号
      };
      vehicleReportCreate(data)
        .then(res => {
          console.log(res);
          this.detectionId = res.id;
          this.billNo = res.billNo;
          if (res.id == 0) {
            this.detectionStatus = true;
          } else {
            this.detectionStatus = false;
          }
          this.loading = false;
        })
        .catch(() => {
          this.detectionStatus = true;
        });
    },
    // 切换模板
    templateChange() {
      if (this.templateDetail.length > 0) {
        this.changeStatus = true;
        this.changeDialogVisible = true;
      } else {
        this.getTemplateReportDetail(this.templateCheckCodeId);
      }
    },
    // 确认切换
    submitChange() {
      this.changeStatus = false;
      this.getTemplateReportDetail(this.templateCheckCodeId);
      this.changeDialogVisible = false;
    },
    // 取消切换
    cancelChange() {
      if (this.changeStatus && this.templateDetail.length > 0) {
        this.templateCheckCodeId =
          this.detectionDetail.checkTemplateCode +
          this.detectionDetail.checkTemplateId;
      }
      this.changeDialogVisible = false;
    },
    // 下拉查询模板详情
    getTemplateReportDetail(codeId) {
      this.loading = true;
      this.templateList.forEach(item => {
        if (item.codeId == codeId) {
          this.templateItem = item;
        }
      });
      const params = {
        tplId: this.templateItem.id,
        tplCode: this.templateItem.code
      };
      vehicleReportDetail(params)
        .then(res => {
          this.detectionDetail = res;
          this.detectionDetail.status = "Checking";
          this.templateDetail = res.contents;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 环车检测-计算坐标
    getMouseXY(e) {
      if (this.tagCheck == "") {
        return false;
      }
      const imgWidth = 1300;
      // const imgHieght = 650;
      // console.log("图片原始尺寸：" + imgWidth + "----" + imgHieght);
      const offsetLeft = e.offsetX;
      const offsetTop = e.offsetY;
      // const carImgWidth = this.$refs.carImg.clientWidth;
      // const carImgHeight = this.$refs.carImg.clientHeight;
      const carImgWidth = document.getElementById("carImg").clientWidth;
      const carImgHeight = document.getElementById("carImg").clientHeight;
      // 因为需要和APP定位同步： 所以 X = carImgHeight - offsetTop，Y = offsetLeft
      // console.log("图片当前尺寸：" + carImgWidth + "----" + carImgHeight);
      // console.log("位置：" + offsetLeft + "----" + offsetTop);
      // 计算原始尺寸对应坐标位置 图片固定尺寸： 1300 * 700
      const x = carImgHeight - offsetTop; // 等同于 定位left距离左边的位置
      const y = offsetLeft; // 等同于 定位bottom距离底部的位置
      // 计算百分比显示
      const left = (y / carImgWidth) * 100;
      const bottom = (x / carImgHeight) * 100;
      // console.log(left);
      // console.log(bottom);
      // 比例
      const proportion = carImgWidth / imgWidth;
      if (offsetLeft < 30 && offsetTop < 30) {
        return false;
      }
      this.tagList.push({
        x: Number(x / proportion).toFixed(2),
        y: Number(y / proportion).toFixed(2),
        left: left,
        bottom: bottom,
        type: this.tagCheck
      });
      this.tagCount();
    },
    // 环车检测-撤回标记
    withdrawTag() {
      this.tagList.splice(this.tagList.length - 1, 1);
      this.tagCount();
    },
    // 环车检测-清空标记
    resetTag() {
      this.tagList = [];
      this.tagNum = {
        Line: 0,
        Crack: 0,
        Uneven: 0,
        Bad: 0
      };
    },
    // 环车检测-选中某标记
    tagChange(type) {
      this.tagCheck = this.tagCheck == type ? "" : type;
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
    // 坐标回显
    tagRepetition(list) {
      this.tagList = [];
      const imgWidth = 1300;
      const imgHieght = 650;
      list.forEach(item => {
        const left = (item.m / imgWidth) * 100;
        const bottom = (item.n / imgHieght) * 100;
        this.tagList.push({
          x: item.n,
          y: item.m,
          left: left,
          bottom: bottom,
          type: item.type
        });
      });
      this.tagCount();
    },
    // 灯光点选标记
    checkLight(list, item) {
      list.result.optionResult[item] = list.result.optionResult[item]
        ? false
        : true;
    },
    // 点选切换选中
    optionsCheck(item, key) {
      if (!item[key]) {
        for (const k in item) {
          if (k != key) {
            item[k] = false;
          }
        }
        item[key] = true;
      }
    },
    // 保存/完成
    savaDetection(status) {
      // 报告状态 Complete 完成 Checking 进行中
      this.loading = true;
      this.templateDetail.forEach(item => {
        if (item.categoryCode == "CheckAllCar") {
          const tagArr = [];
          this.tagList.forEach(list => {
            tagArr.push({
              type: list.type,
              n: list.x,
              m: list.y
            });
          });
          item.itemList[0].result.checkAllCarResult = tagArr;
        }
      });
      const imgArr = [];
      this.imgFileList.forEach(item => {
        imgArr.push(item.origin);
      });
      const data = {
        id: this.detectionId,
        contents: this.templateDetail,
        checkTemplateId: this.templateItem.id,
        checkTemplateCode: this.templateItem.code,
        checkTemplateName: this.templateItem.name,
        images: imgArr,
        status: status
      };
      vehicleReportUpdate(data)
        .then(() => {
          this.loading = false;
          if (status == "Complete") {
            this.$message.success("完成检测！");
            const url = decodeURIComponent(
              qs.parse(location.search.substring(1)).url
            );
            window.location.href = url + "&billNo=" + this.billNo;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 照片
    getFileList(fileList) {
      this.imgFileList = fileList;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/var";
#app {
  width: 100%;
  height: 100vh;
}
.browser-tips {
  display: none !important;
}
#chatBtn {
  display: none !important;
}
.detection-car-box {
  position: relative;
  width: 100%;
  height: 100%;
  // .header {
  //   width: 100%;
  //   height: 60px;
  //   line-height: 60px;
  //   background: #d9001b;
  //   color: #fff;
  //   font-size: 24px;
  //   padding: 0 20px;
  // }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    height: 50px;
    text-align: center;
    .el-button {
      background: #d9001b;
      margin-top: 10px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .el-button--danger {
    background: #d9001b;
    margin-top: 10px;
    &:hover {
      opacity: 0.8;
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    .template-change {
      padding-bottom: 10px;
      color: #999;
      border-bottom: 1px dotted #ccc;
    }
    .template-box {
      width: 100%;
      margin-top: 5px;
      .template-list {
        min-width: 900px;
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
            background: #d9001b;
            height: 14px;
            margin-right: 5px;
            border-radius: 100px;
          }
          > span {
            color: #909399;
            font-size: 12px;
            padding: 0 10px;
          }
        }
        .car-box {
          position: relative;
          min-width: 900px;
          .car-bg {
            position: relative;
            width: 70%;
            min-width: 650px;
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
        .left-label {
          float: left;
          width: 60px;
          height: 41px;
          line-height: 45px;
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
            cursor: pointer;
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
          width: calc(100% - 5px);
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
            button {
              min-width: 60px;
              margin-bottom: 5px;
            }
            .el-button:focus,
            .el-button:hover {
              color: #606266;
              border-color: #dcdfe6;
              background-color: #fff;
            }
            .el-button.active {
              color: #f7742d;
              border-color: #f7742d;
              background-color: rgba($color: #f7742d, $alpha: 0.2);
            }
          }
        }
        .img-upload {
          margin: 10px 0;
        }
      }
    }
    .null-box {
      width: 100%;
      height: calc(100% - 45px);
      text-align: center;
      color: #999;
      display: table;
      user-select: none;
      span {
        display: table-cell;
        vertical-align: middle;
      }
    }
    .img-medium {
      .el-upload-list--picture-card .el-upload-list__item {
        width: 180px;
        height: 180px;
      }
      .el-upload--picture-card {
        width: 180px;
        height: 180px;
        line-height: 180px;
      }
    }
    .el-date-editor .el-range-separator {
      width: 20px;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .el-card__body {
      padding: 10px;
    }
  }
}
</style>
