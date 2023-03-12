<template>
  <div class="vehicle-detection" v-loading="loading">
    <div class="btns">
      <el-button
        type="primary"
        :disabled="templateDetail.length == 0 || !editAble"
        size="small"
        @click="savaDetection('Checking')"
        v-if="detectionDetail.status != 'Complete'"
      >
        保存（F3）
      </el-button>
      <el-button
        :disabled="templateDetail.length == 0 || !editAble"
        type="primary"
        size="small"
        @click="savaDetections()"
        v-if="detectionDetail.status != 'Complete'"
      >
        完成
      </el-button>
      <el-button type="primary" size="small" @click="dialogVisible = true">
        预览（F11）
      </el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="detectionDetail.status != 'Complete'"
        @click="shareDetectionCar"
      >
        分享
      </el-button>
      <!-- <el-button type="primary" size="small" @click="openDetectionCar">
        云诊车嵌套页面
      </el-button> -->
      <span style="float:right">
        选择检测模板
        <!-- :disabled="!checkStatus" -->
        <!-- :disabled="detectionDetail.status == 'Complete'" -->
        <el-select
          v-model="templateCheckCodeId"
          placeholder="请选择"
          size="small"
          style="width:200px"
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
      </span>
    </div>
    <!-- 模板信息 -->
    <div
      class="template-box"
      v-if="templateCheckCodeId != '' && templateDetail"
    >
      <div class="template-list">
        <div v-for="(list, inds) in templateDetail" :key="inds">
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
                        tagCheck == 'Line' ? 'check-list active' : 'check-list'
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
                        tagCheck == 'Crack' ? 'check-list active' : 'check-list'
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
                        tagCheck == 'Bad' ? 'check-list active' : 'check-list'
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
                    list.itemList[0].result.optionResult[item] ? 'active' : ''
                  "
                  :key="ind"
                  @click="checkLight(list.itemList[0], item)"
                >
                  <i :class="'light-img ' + dashboardWarningLightImgs[item]">
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
                    list.itemList[0].result.optionResult[item] ? 'active' : ''
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
          <!-- 云诊车健康诊断 -->
          <div v-if="list.categoryCode == 'VehicleHealth'">
            <div class="template-tit" style="height: 35px">
              云诊车健康诊断数据导入:
              <el-button
                type="primary"
                plain
                size="mini"
                @click="openVehicleHealth"
              >
                <span v-if="!detectionDetail.healthInfo">
                  选择诊断仪已生成的诊断报告
                </span>
                <span v-if="detectionDetail.healthInfo">
                  {{
                    detectionDetail.healthInfo.id == 0
                      ? "选择诊断仪已生成的诊断报告"
                      : "诊断报告：" + detectionDetail.healthInfo.report_code
                  }}
                </span>
                <i class="el-icon-caret-right"></i>
              </el-button>
            </div>
            <p style="color: #909399">
              若已绑定了云诊车外部设备并使用设备已完成了健康诊断可在此选择已完成的健康诊断报告，若您未绑定云诊车外部设备或未使用诊断仪对该车辆进行过健康诊断可忽略此项
            </p>
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
                  <span style="color: #909399">{{ item2.description }}</span>
                </td>
                <td>
                  <div style="float:left;width: 100%">
                    <label style="float:left;line-height: 30px;">
                      检测结果：
                    </label>
                    <div style="margin-left: 80px">
                      <div class="btn-box" v-if="item2.flags.clickInput != 2">
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
                    style="float:left;width: 100%;margin-top: 5px"
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
    <div class="null-box" v-if="templateCheckCodeId == ''">
      <span>还没有检测项目哦，请从右上角下拉选择检测模板~</span>
    </div>
    <!-- 空模板提示 -->
    <div class="null-box" v-if="templateCheckCodeId != '' && !templateDetail">
      <span>该模板下没有检测项目哦，请重新拉选择检测模板~</span>
    </div>
    <!-- 预览弹窗 -->
    <ht-dialog
      v-bind="$attrs"
      title="检测报告预览"
      width="1200px"
      :visible.sync="dialogVisible"
      v-on="$listeners"
    >
      <vehicleDetectionRreview
        v-if="dialogVisible"
        :isCompated="detectionDetail.status == 'Complete'"
        :orderInfo="orderInfo"
        @close="dialogVisible = false"
      />
    </ht-dialog>
    <!-- 云诊车弹窗 -->
    <ht-dialog
      v-bind="$attrs"
      title="云诊车——车辆健康诊断报告列表"
      width="1260px"
      :visible.sync="dialogVehicleHealthVisible"
      v-on="$listeners"
    >
      <el-card style="padding: 10px 0;margin-bottom:10px;">
        <el-form ref="searchForm" :model="searchForm" inline>
          <el-form-item label="检测日期" size="mini" label-width="70px">
            <div style="width: 250px">
              <el-date-picker
                v-model="otherRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="车牌号" size="mini" label-width="50px">
            <ht-input
              v-model="searchForm.plateNumber"
              size="mini"
              placeholder="请输入车牌号"
              style="width: 120px"
            />
          </el-form-item>
          <el-form-item label="车架号" size="mini" label-width="50px">
            <ht-input
              v-model="searchForm.vinCode"
              size="mini"
              placeholder="请输入车架号"
              style="width: 120px"
            />
          </el-form-item>
          <el-form-item label="诊断设备编码" size="mini" label-width="90px">
            <ht-input
              v-model="searchForm.deviceId"
              size="mini"
              placeholder="请输入诊断设备编码/SN"
              style="width: 190px"
            />
          </el-form-item>
          <el-button type="primary" size="mini" @click="searchSubmit">
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click="resetSubmit">
            重置（F6）
          </el-button>
        </el-form>
      </el-card>
      <el-card style="height: 400px" v-loading="loading2">
        <ht-setting-table
          class="maintenance-list"
          table-name="maintenance-list"
          :data="tableData"
          selectionType="single"
          :selected-rows.sync="selectedRows"
          :columns="tableColumns"
          pagination
          :total="totalSize"
          :current-page.sync="currentPage"
          @pageChange="handlePageChange"
          style="height: 380px"
        />
      </el-card>
      <div style="margin: 10px 0 5px 0; text-align: center;">
        <el-button
          type="primary"
          size="mini"
          :disabled="selectedRows.length == 0"
          @click="addHealth"
        >
          添加（F3）
        </el-button>
        <el-button
          type="primary"
          size="mini"
          plain
          @click="dialogVehicleHealthVisible = false"
        >
          取消（Esc）
        </el-button>
      </div>
    </ht-dialog>
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
    <ht-dialog
      title="报告分享"
      :visible.sync="shareDialogVisible"
      custom-class="share-dialog"
      width="560px"
      top="30%"
      @close="shareDialogVisible = false"
    >
      <div style="text-align:center;padding:30px 15px 0">
        <el-input
          placeholder="请输入内容"
          v-model="codeUrl"
          class="share-link"
          size="small"
        >
          <el-button
            slot="append"
            type="primary"
            class="copy-link"
            :data-clipboard-text="codeUrl"
            @click="copyCode"
          >
            复制链接
          </el-button>
        </el-input>
        <CustomQrcode
          :value="codeUrl"
          :configure="{
            width: 140,
            height: 140
          }"
        />
        <p>扫码查看检测报告</p>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button size="small" @click="shareDialogVisible = false">
          关 闭（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import SrImgUpload from "@/components/base/SrImgUpload"; // 车辆检测-图片上传
import { templateList } from "@/api/basis/detect/index";
import { healthsList } from "@/api/repairs/maintenance";
import {
  checkReportDetail,
  templateReportDetail,
  checkReportCreate,
  checkReportUpdate,
  importHealth
} from "@/api/repairs/checkReports";
import { mapState } from "vuex";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
import { dateFormat } from "@/utils/date";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// import vehicleDetectionRreview from "./vehicleDetectionPreview";
import vehicleDetectionRreview from "@/components/repair/BillInfo/vehicleDetection/vehicleDetectionPreview";
import { openNewWindow } from "@/utils/tool";
import { createShares } from "@/api/base";
import CustomQrcode from "@/components/CustomQrcode/index";
import Clipboard from "clipboard";

export default {
  name: "vehicle-detection-preview",
  components: {
    "srimg-upload": SrImgUpload,
    vehicleDetectionRreview,
    CustomQrcode
  },
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    editAble: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  data() {
    return {
      loading: false,
      loading2: false,
      dialogVisible: false,
      dialogVehicleHealthVisible: false,
      changeDialogVisible: false,
      shareDialogVisible: false,
      changeStatus: true,
      detectionId: 0, // 车辆检测id
      checkStatus: true,
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
      searchForm: {},
      otherRange: [],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "radio",
          label: "选择",
          type: "multiple",
          width: CELL_WIDTH.multiple,
          cantExport: true
        },
        {
          prop: "billNo",
          label: "报告单号",
          width: CELL_WIDTH.no
        },
        {
          prop: "checkTime",
          label: "诊断时间",
          width: CELL_WIDTH.no
        },
        {
          prop: "plateNumber",
          label: "车牌号",
          width: CELL_WIDTH.date
        },
        {
          prop: "vin",
          label: "车架号",
          width: CELL_WIDTH.no
        },
        {
          prop: "snNumber",
          label: "诊断设备编码/SN",
          width: CELL_WIDTH.no
        },
        {
          prop: "deviceBinder",
          label: "设备绑定人",
          width: CELL_WIDTH.date
        }
      ],
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      selectedRows: [],
      healthId: "",
      codeUrl: ""
    };
  },
  watch: {
    orderInfo: {
      handler() {
        this.load();
      },
      deep: true
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.templateCheckCodeId = "";
      // 模板列表
      templateList().then(res => {
        res.Rows.forEach(item => {
          item.codeId = item.code + item.id;
        });
        this.templateList = res.Rows || [];
        this.getCheckReportDetail();
      });
    },
    //获取模板保存的详情
    getCheckReportDetail() {
      this.loading = true;
      const params = {
        orderId: this.orderInfo.id
      };
      checkReportDetail(params).then(res => {
        // console.log(res);
        if (res.id) {
          this.detectionDetail = res || {};
          // console.log(this.detectionDetail);
          if (res.contents) {
            this.checkStatus = false;
            this.templateCheckCodeId =
              res.checkTemplateCode + res.checkTemplateId;
            this.templateList.forEach(item => {
              if (item.codeId == this.templateCheckCodeId) {
                this.templateItem = item;
              }
            });
          } else {
            this.checkStatus = true;
            this.templateCheckCodeId = "";
            this.templateItem = {};
          }
          this.templateDetail = res.contents || [];
          this.detectionId = res.id;
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
          // 坐标回显
          if (this.templateDetail) {
            this.templateDetail.forEach(item => {
              if (
                item.categoryCode == "CheckAllCar" &&
                item.itemList[0].result.checkAllCarResult
              ) {
                this.tagRepetition(item.itemList[0].result.checkAllCarResult);
              }
            });
          }
        } else {
          const data = {
            sourceNo: this.orderInfo.billNo, // 来源单号
            sourceType: this.orderInfo.billType, // 来源类型
            sourceId: this.orderInfo.id, // 来源ID
            cooperatorId: this.orderInfo.cooperatorId, // 客户信息
            companyId: this.orderInfo.companyId, // 工单所属分公司ID
            vehicleId: this.orderInfo.vehicle.vehicleId, // 车辆档案ID
            plateNumber: this.orderInfo.vehicle.plateNumber, // 车牌号
            vin: this.orderInfo.vehicle.vin // 车架号
          };
          checkReportCreate(data).then(res => {
            // console.log(res);
            this.detectionId = res.id;
            this.checkStatus = true;
          });
        }
        this.loading = false;
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
      // this.getTemplateReportDetail(this.templateCheckCodeId);
      this.loading = true;
      this.templateList.forEach(item => {
        if (item.codeId == this.templateCheckCodeId) {
          this.templateItem = item;
        }
      });
      const params = {
        tplId: this.templateItem.id,
        tplCode: this.templateItem.code
      };
      templateReportDetail(params)
        .then(res => {
          this.detectionDetail = res;
          this.detectionDetail.status = "Checking";
          this.templateDetail = res.contents;
          // this.loading = false;
          this.savaDetection("Checking");
        })
        .catch(() => {
          this.loading = false;
        });
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
      templateReportDetail(params)
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
    // 保存
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
      console.log(this.imgFileList);
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
      checkReportUpdate(data)
        .then(() => {
          this.loading = false;
          if (status == "Checking") {
            this.$message.success("保存成功！");
          } else {
            this.$message.success("已完成检测！");
          }
          this.load();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 完成
    savaDetections() {
      const msg = "完成后不可更改，是否继续？";
      this.$confirm(msg)
        .then(() => {
          this.savaDetection("Complete");
        })
        .catch(() => {});
    },
    // 照片
    getFileList(fileList) {
      this.imgFileList = fileList;
    },
    // 搜索数据处理
    resList(searchData, pagination) {
      this.loading2 = true;
      searchData.start = null;
      searchData.end = null;
      if (this.otherRange && this.otherRange[0]) {
        searchData.start = this.otherRange
          ? dateFormat(this.otherRange[0])
          : null;
      }
      if (this.otherRange && this.otherRange[1]) {
        searchData.end = this.otherRange
          ? dateFormat(this.otherRange[1])
          : null;
      }
      healthsList({ ...searchData, ...pagination })
        .then(res => {
          this.tableData = res.rows || [];
          this.selectedRows = [];
          if (this.detectionDetail && this.detectionDetail.healthInfo.id) {
            this.tableData.forEach(item => {
              if (item.id == this.detectionDetail.healthInfo.id) {
                this.selectedRows.push(item);
              }
            });
          }
          this.loading2 = false;
        })
        .catch(() => {
          this.loading2 = false;
        });
    },
    openVehicleHealth() {
      this.dialogVehicleHealthVisible = true;
      this.resetSubmit();
    },
    // 云诊车搜索
    searchSubmit() {
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 云诊车重置
    resetSubmit() {
      this.searchForm = {};
      this.otherRange = [];
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 云诊车页码变化
    handlePageChange(page) {
      this.currentPage = page;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 云诊车添加报告
    addHealth() {
      const data = {
        id: this.detectionId,
        checkHealthId: this.selectedRows[0].id
      };
      importHealth(data).then(() => {
        // console.log(res);
        this.savaDetection("Checking");
        this.dialogVehicleHealthVisible = false;
      });
    },
    // 云诊车嵌套页面
    openDetectionCar() {
      const url = encodeURIComponent(
        "http://www.wenming.cn/specials/100/jj_52318/202106/t20210628_6095543.shtml?id=111"
      );
      const token = encodeURIComponent(
        "token-qa2=MTYyNDQ0MzE3OHx7IlVzZXJJZCI6NTA2OSwiQ29tcGFueUlkIjoxNzk4LCJTdGFmZklkIjo2NjAwLCJBY2NvdW50U2V0SWQiOjM1NCwiUGxhdGZvcm1LZXkiOiIiLCJUeXBlIjoxLCJEZXZpY2UiOiI1NjIzMjA4OTVkOTNlMDQ3OWFiYzgzMjk5NjAyN2MwNSJ9fIuHiR4uD5y7LpQgxx5CfIesWx6QQUk43RTmA0-zjldb"
      );
      openNewWindow(
        this.$router.resolve({
          path:
            `/detectionCar/index?snNumber=123212e22e&uid=1&plateNumber=京666666&vin=1231232323&url=` +
            url +
            "&token=" +
            token
        }).href,
        "detection"
      );
    },
    // 分享云诊车
    shareDetectionCar() {
      this.shareDialogVisible = true;
      createShares({
        type: "bill",
        value: {
          billType: "JC",
          billId: this.detectionId
        }
      }).then(res => {
        this.codeUrl = res.url || "";
        // console.log(this.codeUrl);
      });
    },
    copyCode() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this;
      const clipboard = new Clipboard(".copy-link");
      clipboard.on("success", function() {
        _this.$message.success({ message: "复制成功" });
        clipboard.destroy();
      });
      clipboard.on("error", function() {
        _this.$message.error({ message: "复制失败，请手动复制" });
        clipboard.destroy();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.vehicle-detection {
  ::v-deep {
    overflow: auto;
    height: calc(100% - 50px);
    padding: 5px 10px;
    .btns {
      padding-bottom: 5px;
      border-bottom: 1px solid #ccc;
    }
    .template-box {
      width: 100%;
      height: calc(100% - 45px);
      margin-top: 5px;
      overflow-y: auto;
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
            background: #3aa7ff;
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
            min-width: 550px;
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
    .has-gutter {
      .el-checkbox {
        display: none;
      }
    }
    .share-link {
      padding-bottom: 30px;
    }
  }
}
</style>
