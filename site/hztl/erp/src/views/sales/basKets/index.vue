<template>
  <div class="quotationBasKet container-box">
    <el-row>
      <el-form :model="searchForm" label-width="75px" size="mini">
        <el-row>
          <el-col :span="4">
            <el-form-item label="客户名称" label-width="75px">
              <el-input
                size="mini"
                v-model="searchForm.cooperatorName"
                placeholder="客户名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="来源渠道">
              <el-select size="mini" v-model="searchForm.channel" clearable>
                <el-option label="快速报价" value="快速报价" />
                <el-option label="企鹅汽配" value="企鹅汽配" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="报价方式">
              <el-select size="mini" v-model="searchForm.quoteWays" clearable>
                <el-option label="手动报价" :value="0" />
                <el-option label="自动报价" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="添加人">
              <ht-autoselect
                v-model="searchForm.createdBy"
                :options="store().allStaffs()"
                :trigger-on-focus="false"
                placeholder="添加人"
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="添加日期">
              <el-date-picker
                size="mini"
                v-model="searchForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="配件编码">
              <el-input
                size="mini"
                v-model="searchForm.code"
                placeholder="配件编码"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="配件名称">
              <el-input
                size="mini"
                v-model="searchForm.name"
                placeholder="配件名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="配件品牌">
              <ht-autocomplete
                v-model="searchForm.brand"
                :fetch-suggestions="autocompleteSearchPartBrand"
                :trigger-on-focus="false"
                placeholder="配件品牌"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="text-left m-l-30">
            <el-button type="primary" size="mini" @click="toSearch">
              查询（F5）
            </el-button>
            <el-button type="primary" size="mini" @click="toReset">
              重置（F6）
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <ht-card no-padding>
      <el-row class="tag">
        <ht-auto-tabs v-model="activeTab" :tabs="Tabs"> </ht-auto-tabs>
        <!-- <ht-tabs
          v-model="activeTab"
          :tabs="Tabs"
          class="tabs-regular flex-block-bg"
        >
          <span slot="label"><i class="el-icon-date"></i> 报价成功</span>
        </ht-tabs> -->
      </el-row>
      <el-row :gutter="4" class="full-height" style="height:400px;">
        <el-col :span="6" class="full-height">
          <basket-group
            ref="refBasketGroup"
            :key-scope="keyScopes.basketGroup"
            :list="groupsData"
            :seletion-index.sync="seletionIndex"
            @hotkeysUp="e => handleKeyCode(e, keyScopes.basketGroup)"
            @seletionChange="handleGroupChange"
          />
        </el-col>
        <el-col :span="18" class="full-height">
          <ht-card title="配件列表" no-padding class="auto-card">
            <div v-switch-focus="focusData" class="flex-container column-flex">
              <p class="cooperator-info-box">
                <span>
                  <i class="el-icon-s-custom" />
                  {{ cooperatorInfo.contactName }}
                </span>
                <span>
                  <i class="el-icon-phone" />
                  {{ cooperatorInfo.phone }}
                </span>
                <span>
                  <i class="el-icon-location" />
                  {{ cooperatorInfo.address }}
                </span>
              </p>
              <ht-setting-table
                class="auto-block"
                :loading="loading"
                :data="tableData"
                :columns="columns"
                :table-name="tableName"
                :key-scope="keyScopes.basketTable"
                :selected-rows.sync="selectedTableRows"
                selection-type="multiple"
                @hotkeysUp="e => handleKeyCode(e, keyScopes.basketTable)"
                @rowOperation="editBasket"
                @rowDelete="row => remove([row])"
              />
            </div>
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
    <div class="footer m-t-12">
      <el-button
        :disabled="
          !selectedTableRows.length ||
            !hasOrdersPerm('create', selectedTableRows)
        "
        type="primary"
        size="mini"
        @click="createOrder"
      >
        生成客户订单
      </el-button>
      <el-button
        :disabled="
          !selectedTableRows.length ||
            !hasSalesPerm('create', selectedTableRows)
        "
        type="primary"
        size="mini"
        @click="createSaleOutOrder"
      >
        生成销售单
      </el-button>
      <el-button type="primary" size="mini" @click="loadData">
        刷新报价篮
      </el-button>
      <el-button
        :disabled="
          !selectedTableRows.length ||
            !hasCartsPerm('delete', selectedTableRows)
        "
        type="primary"
        size="mini"
        @click="remove(selectedTableRows, true)"
      >
        移除选择项
      </el-button>
      <div class="statistical-msg">
        <span>当前选中配件</span>
        <span class="warning">{{ statistical.category }}</span>
        <span>种(</span>
        <span class="warning">{{ statistical.qtr }}</span>
        <span>件) 共</span>
        <span class="warning">{{ statistical.amount }}</span>
        <span>元</span>
      </div>
    </div>

    <EditBasketDetailBox
      ref="editBasketDetail"
      :visible.sync="editSalesDialog"
      :partData="editData"
      isEdit
      @sure="partInfoChangeHandle"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
    <ht-dialog
      :visible.sync="bindDialog.visible"
      width="400px"
      top="20vh"
      class="edit-swap-group-parts ignore-top-hotkeys"
      title="绑定"
      append-to-body
    >
      <div class="dialog-content p-lr-8">
        <el-form>
          <el-form-item label="往来单位名称" label-width="90px">
            <ht-autoselect
              size="mini"
              remote
              v-model="bindCompany"
              :fetch-suggestions="getAllCustomerCooperators"
              :trigger-on-focus="false"
              placeholder="往来单位名称"
              filter-zero
              highlight-first-item
              clearable
            />
          </el-form-item>
          <div class="flex flex-center m-t-24 m-b-10">
            <el-button
              size="mini"
              @click="
                () => {
                  this.bindDialog.visible = false;
                }
              "
            >
              取消
            </el-button>
            <el-button type="primary" size="mini" @click="toBind">
              确定
            </el-button>
          </div>
        </el-form>
      </div>
    </ht-dialog>
    <ht-dialog
      :visible.sync="orderDialog.visible"
      width="600px"
      top="20vh"
      class="edit-swap-group-parts ignore-top-hotkeys"
      title="提示"
      append-to-body
    >
      <div class="order-wrap" v-if="orderData.rows && orderData.rows.length">
        <p class="m-t-0">
          {{ `当前客户【${cooperatorName}】有待提交的客户订单，订单如下：` }}
        </p>
        <ul class="p-a-0">
          <div class="flex head">
            <div style="width:80px">操作</div>
            <div style="width:400px;text-align:center">客户订单号</div>
            <div style="width:120px">提交时间</div>
          </div>
          <div style="max-height: 300px;overflow-y: auto;">
            <li
              class="flex flex-center text-center m-tb-6 font-12"
              v-for="(item, idx) in orderData.rows"
              :key="idx"
            >
              <div
                style="width:80px"
                class="text-link text-no-underline text-font-primary td"
                @click="
                  () => {
                    toAddOrder(item);
                  }
                "
              >
                合并到此单
              </div>
              <div
                class="text-link text-no-underline text-font-primary td"
                style="width:400px"
                @click="
                  () => {
                    showDetail(item);
                  }
                "
              >
                {{ item.billNo }}
              </div>
              <div class="td" style="width:120px">{{ item.billDate }}</div>
            </li>
          </div>
        </ul>
        <div class="flex flex-center">
          <el-button
            size="mini"
            @click="
              () => {
                orderDialog.visible = false;
              }
            "
            >取消(Esc)</el-button
          >
          <el-button type="primary" size="mini" @click="toCreateNewOrder"
            >创建新单(F3)</el-button
          >
        </div>
      </div>
    </ht-dialog>
    <SalesDetail :visible.sync="orderDetailShow" :billId="orderBillId" />
    <NewParts2erpParts
      :visible.sync="newParts2erpPartDialog.visible"
      :partsData="partData"
      @save="saveMapData"
    />
  </div>
</template>
<script>
import { sumBy } from "lodash";
import { EditBasketDetailBox } from "../components";
import { baseDataMixin, precisionsFixed, searchMixin } from "@/mixins";
import {
  createOrder,
  createSaleOutOrder,
  loadSalesBasket,
  removeSalesBasket,
  updateSalesBasket
} from "@/api/sales";
import hotkeys from "hotkeys-js";
import { CELL_WIDTH } from "@/constants";
import { dateFormat } from "@/utils/date";
import { formatterColums } from "@/components/table";
import debounce from "throttle-debounce/debounce";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import BasketGroup from "./components/basket-group";
import { mapState } from "vuex";
import * as store from "@/utils/store";
import RequestQQ from "@/api/qq";
import { reqSalesHomeList } from "@/api/sales/salesHome";
import { addOrder, basketPartCheck } from "@/api/sales/salesBasket";
import SalesDetail from "@/components/globalDialog/bill-details/sales-detail";
import NewParts2erpParts from "@/components/parts/NewParts2erpParts";
const defaultSearchForm = {
  createdBy: 0,
  channel: "",
  quoteWays: null,
  partner: "",
  cooperatorName: "",
  code: "",
  brand: "",
  date: "",
  fromDate: "",
  toDate: "",
  failed: false
};
let oldKeyScope;
export default {
  name: "BasKet",
  components: {
    EditBasketDetailBox,
    BasketGroup,
    AvaVehModels,
    SalesDetail,
    NewParts2erpParts
  },
  mixins: [baseDataMixin, precisionsFixed, searchMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const editBasket = (row, e) => {
      this.selectedTableRows = [row];
      e.stopPropagation();
      this.editBasket(row);
    };
    const remove = (row, e) => {
      this.selectedTableRows = [row];
      e.stopPropagation();
      this.remove([row]);
    };
    const controlsColumn = {
      label: "操作",
      prop: "controls",
      width: 100,
      cantExport: true,
      render: (value, row) => (
        <div class="table-button">
          {this.hasCartsPerm("update", [row]) ? (
            <el-tooltip placement="top" content="编辑" enterable={false}>
              <span
                class="operation-icon icon-edit-info"
                on-click={e => editBasket(row, e)}
              ></span>
            </el-tooltip>
          ) : null}
          {this.hasCartsPerm("delete", [row]) ? (
            <el-tooltip placement="top" content="删除" enterable={false}>
              <span
                class="operation-icon icon-delete-info"
                on-click={e => remove(row, e)}
              ></span>
            </el-tooltip>
          ) : null}
        </div>
      )
    };

    const qtyColumn = {
      label: "订购数量",
      prop: "bookQty",
      width: CELL_WIDTH.qty,
      render: (value, row, index) => {
        return this.hasCartsPerm("update", [row]) ? (
          <div on-click={e => e.stopPropagation()}>
            <ht-format-number
              class={`switch-focus focus-bookQty-${index}`}
              v-model={row.bookQty}
              precisionType="qty"
              min={1}
              size="mini"
              isThrottle
              on-change={() => this.handleQtyChange(row)}
              nativeOn-keyup={e => this.debouncedHandleInputEnter(e)}
              on-focus={() =>
                this.setPriceOrQtyKeyScope(`focus-bookQty-${index}`)
              }
            />
          </div>
        ) : (
          <div class="number-font">{value}</div>
        );
      }
    };

    const priceColumn = {
      label: "单价",
      prop: "price",
      width: 120,
      render: (value, row, index) => {
        const err = row.errors?.message ? "error" : "";
        return this.hasCartsPerm("update", [row]) ? (
          <div on-click={e => e.stopPropagation()}>
            <ht-format-number
              class={`switch-focus focus-price-${index} ${err}`}
              v-model={row.price}
              precisionType="price"
              min={0}
              size="mini"
              isThrottle
              on-change={() => this.handlePriceChange(row)}
              nativeOn-keyup={e => this.debouncedHandleInputEnter(e)}
              on-focus={() =>
                this.setPriceOrQtyKeyScope(`focus-price-${index}`)
              }
            >
              {row.errors?.message ? (
                <div slot="append">
                  <el-popover placement="top" trigger="hover">
                    <span class="text-font-danger font-12">
                      {row.errors?.message}
                    </span>
                    <i
                      slot="reference"
                      class="el-icon-warning text-font-danger"
                    ></i>
                  </el-popover>
                </div>
              ) : (
                <span></span>
              )}
            </ht-format-number>
          </div>
        ) : (
          <div class="number-font">{value}</div>
        );
      }
    };

    const viewAvaVehModels = (row, e) => {
      e.stopPropagation();
      this.avaVehModelsVisible = true;
      this.avaVehModelsPart = {
        id: row.partId,
        code: row.code
      };
    };

    return {
      Tabs: [
        { id: "basketSuccess", name: "报价成功", num: 0 },
        { id: "basketError", name: "报价失败", num: 0 }
      ],
      activeTab: 0,
      keyScopes: {
        basketGroup: Symbol("basketGroup"),
        basketTable: Symbol("basketTable"),
        priceOrQty: Symbol("priceOrQty"),
        toBind: Symbol("toBind"),
        bind: Symbol("bind")
      },
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      cooperatorInfo: {
        address: "",
        contactName: "",
        cooperatorName: "",
        phone: ""
      },
      priceOrQty: "focus-bookQty-0",
      groupsData: [],
      seletionIndex: 0,
      tableData: [],
      selectedTableRows: [],
      index: null,
      editData: {},
      editSalesDialog: false,
      activeCompanyId: null,
      activeIndex: 0,
      loading: false,
      tableName: "salesBasKetList",
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      easyColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "multiple",
          label: "选择",
          type: "multiple",
          width: CELL_WIDTH.multiple,
          cantExport: true
        },
        controlsColumn,
        {
          label: "配件编码",
          prop: "code",
          width: CELL_WIDTH.code
        },
        {
          label: "配件名称",
          prop: "name",
          width: CELL_WIDTH.name
        },
        qtyColumn,
        priceColumn,
        {
          label: "配件品牌",
          prop: "brand",
          width: CELL_WIDTH.brand
        },
        {
          label: "车型",
          prop: "vehModel",
          width: CELL_WIDTH.vehModel
        },
        {
          label: "适用车型",
          prop: "avaVehModel",
          width: CELL_WIDTH.vehModel
        },
        {
          label: "标准适用车型",
          prop: "avaVehModels",
          defaultShow: true,
          width: CELL_WIDTH.vehModel,
          cantExport: true,
          render: (value, row) => (
            <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
              查看
            </a>
          )
        },
        {
          label: "销售车型",
          prop: "saleVehModel",
          width: CELL_WIDTH.vehModel,
          type: "saleVehModel"
        },
        {
          label: "产地",
          prop: "productionPlace",
          width: CELL_WIDTH.productionPlace
        },
        {
          label: "配件性质",
          prop: "property",
          width: CELL_WIDTH.property
        },
        {
          label: "单位",
          prop: "unit",
          width: CELL_WIDTH.unit,
          isHide: true
        },
        {
          label: "是否含税",
          prop: "isTaxed",
          width: 100,
          formatter: value => (value ? "是" : "否"),
          isHide: true
        },
        {
          label: "满足数量",
          prop: "satisfyQty",
          width: CELL_WIDTH.qty,
          type: "munber",
          isHide: true
        },
        {
          label: "金额",
          prop: "amount",
          width: CELL_WIDTH.money,
          type: "munber",
          isHide: true
        },
        {
          label: "备注",
          prop: "remark",
          width: CELL_WIDTH.remark,
          isHide: true
        },
        {
          label: "添加人",
          prop: "createdBy",
          width: CELL_WIDTH.personName,
          type: "staffName"
        },
        {
          label: "添加时间",
          prop: "createdAt",
          width: CELL_WIDTH.time,
          type: "time"
        }
      ],
      searchForm: { ...defaultSearchForm },
      bindDialog: {
        visible: false
      },
      orderDialog: {
        visible: false
      },
      bindCompany: null,
      orderData: {},
      partData: [],
      orderBillId: 0,
      orderDetailShow: false,
      newParts2erpPartDialog: {
        visible: false
      },
      cooperatorsOptions: [],
      getCooperatorsOptionsloading: false
    };
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg"]),
    refBasketGroup() {
      if (this.$refs.refBasketGroup) {
        return this.$refs.refBasketGroup;
      } else {
        return null;
      }
    },
    columns() {
      return formatterColums.bind(this)(this.easyColumns);
    },
    canHandleTableRow() {
      return !!this.selectedTableRows.length;
    },
    statistical() {
      return {
        category: this.selectedTableRows.length,
        qtr: this.precisionFormat(
          sumBy(this.selectedTableRows, item => Number(item.bookQty)),
          "qty"
        ),
        amount: this.precisionFormat(
          sumBy(
            this.selectedTableRows,
            item => parseFloat(item.bookQty) * Number(item.price)
          ),
          "price"
        )
      };
    },
    companies() {
      return store.allCompanies();
    },
    cooperatorId() {
      return this.groupsData[this.seletionIndex].cooperatorInfo?.cooperatorId;
    },
    cooperatorName() {
      return (
        this.groupsData[this.seletionIndex].cooperatorInfo?.cooperatorName || ""
      );
    },
    platformCooperatorId() {
      return this.groupsData[this.seletionIndex].cooperatorInfo
        ?.platformCooperatorId;
    }
  },
  watch: {
    visible: {
      handler(value, oldValue) {
        if (value) {
          this.loadData();
          oldKeyScope = hotkeys.getScope();
          this.setKeyScope(this.keyScopes.basketGroup);
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    },
    tableData(value) {
      if (value.length) {
        this.priceOrQty = "focus-bookQty-0";
        this.selectedTableRows = [...value];
      }
    },
    activeTab(val, oldval) {
      this.searchForm.failed = val === 1;
      if (val !== oldval) {
        this.loadData();
      }
    }
  },
  mounted() {
    this.loadData();
    this.setKeyScope(this.keyScopes.basketGroup);
    hotkeys("*", { scope: this.keyScopes.priceOrQty }, e => {
      this.handleKeyCode(e, this.keyScopes.priceOrQty);
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.basketGroup);
    hotkeys.deleteScope(this.keyScopes.basketTable);
    hotkeys.deleteScope(this.keyScopes.priceOrQty);
  },
  methods: {
    store() {
      return store;
    },
    //打开客户订单详情
    showDetail(row) {
      this.orderBillId = row.id;
      this.orderDetailShow = true;
    },
    async toAddOrder(row) {
      const res = await addOrder({
        billId: row.id,
        ids: this.selectedTableRows.map(item => item.id),
        skipCreditLine: false
      });
      if (!res) return;
      this.$message.success("添加成功");
      this.orderDialog.visible = false;
      this.$emit("update:visible", false);
      this.$router.push({
        path: "/SalesBilling",
        query: { billId: row.id }
      });
    },
    async toBind() {
      await RequestQQ.bindCoop({
        localCooperatorId: this.bindCompany,
        platformCooperatorIds: [this.platformCooperatorId]
      });
      this.bindDialog.visible = false;
      this.loadData();
      this.$message.success(`绑定成功`);
    },
    async checkBind() {
      if (!this.cooperatorId) {
        //未绑定客户，去绑定
        const confirm = await this.$confirm(
          "该客户未绑定往来单位，请先绑定后再操作",
          {
            type: "warning",
            confirmButtonText: "去绑定",
            cancelButtonText: "取消",
            showClose: true
          }
        ).catch(() => {});
        if (!confirm) return false;
        this.bindDialog.visible = true;
        return false;
      }
      return true;
    },
    async checkPart() {
      const res = await basketPartCheck({
        ids: this.selectedTableRows.map(item => item.id)
      });
      if (res.Rows?.length) {
        this.partData = res.Rows;
        this.newParts2erpPartDialog.visible = true;
        return true;
      }
      return false;
    },
    async checkOrderList() {
      const res = await reqSalesHomeList({
        arrivalDateEnd: "",
        arrivalDateStart: "",
        cooperatorId: this.cooperatorId,
        dateEnd: "",
        dateStart: "",
        depositStatus: null,
        page: 1,
        pageSize: 50,
        plateNumber: "",
        qtyLimitOp: ">",
        qtyLimitType: "onTransSaleQty",
        sourceTypes: [0, 1],
        statuses: [1]
      });
      if (!res.rows?.length) return true;
      this.orderData = res;
      this.orderDialog.visible = true;
      return false;
    },
    handleKeyCode(e, keyScope) {
      switch (e.code) {
        case "ArrowLeft":
        case "ArrowRight":
          e.stopPropagation();
          if (keyScope == this.keyScopes.basketGroup && this.tableData.length) {
            this.setPriceOrQtyKeyScope(this.priceOrQty);
            this.updateFocusData({ initial: this.priceOrQty });
          } else if (
            [this.keyScopes.basketTable, this.keyScopes.priceOrQty].includes(
              keyScope
            )
          ) {
            this.setKeyScope(this.keyScopes.basketGroup);
            this.updateFocusData({ initial: null });
            this.selectedTableRows = [];
          }
          break;
        case "ArrowUp":
          e.stopPropagation();
          if (keyScope == this.keyScopes.priceOrQty) {
            this.updateFocusData({ type: "up" });
          }
          break;
        case "ArrowDown":
          e.stopPropagation();
          if (keyScope == this.keyScopes.priceOrQty) {
            this.updateFocusData({ type: "down" });
          }
          break;
        case "F5":
          this.toSearch();
          break;
        case "F6":
          this.toReset();
          break;
        default:
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    setPriceOrQtyKeyScope(priceOrQty) {
      hotkeys.setScope(this.keyScopes.priceOrQty);
      this.priceOrQty = priceOrQty;
    },
    debouncedHandleInputEnter(e) {
      e.stopPropagation();
      if (e.keyCode == 13) {
        debounce(100, this.handleInputEnter)();
      }
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    setTotalNumber() {
      this.$store.commit(
        "admin/saleInfo/setBasketInfo",
        sumBy(this.groupsData, "carts.length")
      );
    },
    loadData() {
      const searchData = { ...this.searchForm };
      if (!searchData.date) {
        searchData.date = [];
      }
      if ([0, 1].includes(searchData.quoteWays)) {
        searchData.quoteWays = [searchData.quoteWays];
      }
      searchData.fromDate = dateFormat(searchData.date[0]);
      searchData.toDate = dateFormat(searchData.date[1]);
      delete searchData.date;
      return loadSalesBasket(searchData).then(data => {
        this.Tabs[this.activeTab].num = 0;
        this.groupsData = data
          ? data.map(item => {
              this.Tabs[this.activeTab].num += item.rows.length;
              return {
                cooperatorInfo: {
                  platformCooperatorId: item.platformCooperatorId,
                  cooperatorId: item.cooperatorId,
                  cooperatorName: item.cooperatorName,
                  contactName: item.contactName,
                  address: item.address,
                  phone: item.phone
                },
                carts: item.rows.map(cart => {
                  return {
                    amount: this.precisionFormat(
                      parseFloat(cart.price) * parseFloat(cart.bookQty),
                      "money"
                    ),
                    ...cart,
                    cooperatorName: item.cooperatorName
                  };
                })
              };
            })
          : [];
        this.setTotalNumber();
      });
    },
    handleGroupChange(group) {
      this.cooperatorInfo = group ? group.cooperatorInfo : {};
      this.tableData = group ? group.carts : [];
    },
    handleQtyChange(row) {
      row.errors = { error: null };
      if (!row.bookQty) {
        row.amount = 0;
        return;
      }
      if (row.price) {
        row.amount = this.precisionFormat(row.bookQty * row.price, "money");
      } else if (row.amount) {
        row.price = this.precisionFormat(
          row.amount / row.bookQty,
          this.getPricePrecisionType()
        );
      }
      this.partInfoChangeHandle(row);
    },
    handlePriceChange(row) {
      row.errors = { error: null };
      if (!row.price && String(row.price) !== "0") {
        row.amount = 0;
        return;
      }
      if (row.bookQty) {
        row.amount = this.precisionFormat(row.bookQty * row.price, "money");
      } else if (row.amount) {
        row.bookQty = this.precisionFormat(row.amount / row.price, "qty");
      }
      this.partInfoChangeHandle(row);
    },
    editBasket(row) {
      if (!this.canHandleTableRow) return;
      if (!this.hasCartsPerm("update", [row])) {
        this.$message.error({
          message: "您没有权限修改该条明细！",
          showClose: true
        });
        return;
      }
      this.editData = { ...row };
      this.editSalesDialog = true;
    },
    partInfoChangeHandle(data) {
      this.$refs.editBasketDetail.cancelHandle();
      updateSalesBasket({
        id: data.id,
        bookQty: data.bookQty,
        price: data.price,
        isTaxed: data.isTaxed,
        cooperatorId: data.cooperatorId,
        property: data.property,
        remark: data.remark,
        saleVehModel: data.saleVehModel
      })
        .then(() => {
          this.cacheSeletionIndex = this.seletionIndex;
          this.loadData().then(() => {
            this.$message.success({ message: "更新成功", showClose: false });
            this.refBasketGroup.seletionChange(this.seletionIndex);
          });
        })
        .catch(error => {
          this.tableData.forEach(item => {
            if (item.id == data.id) {
              item.errors = error;
            }
          });
          this.$forceUpdate();
        });
    },
    remove(rows, isMultiple = false) {
      if (!this.canHandleTableRow) return;
      const noPerm = this.getNoPermList(
        "delete",
        "sales.quotationBaskets",
        rows
      );
      if (noPerm && noPerm.length) {
        const msg = `配件（${noPerm
          .slice(0, 10)
          .map(item => item.code)
          .join("，")}${
          noPerm.length > 10 ? "等" : ""
        }）您没有权限删除，请重新选择！`;
        this.$message.error({ message: msg, showClose: true });
        return;
      }
      this.$confirm(
        isMultiple
          ? `确认移除所选${rows.length}条记录的配件！`
          : "确认移除当前记录配件！"
      ).then(() => {
        this.cacheSeletionIndex = this.seletionIndex;
        removeSalesBasket({ ids: rows.map(item => item.id) })
          .then(() => {
            if (rows.length === this.tableData.length) {
              this.groupsData = this.groupsData.filter(
                item => item.cooperatorInfo !== this.cooperatorInfo
              );
            } else {
              const curGroup = this.groupsData.find(
                item => item.cooperatorInfo === this.cooperatorInfo
              );
              curGroup.carts = this.tableData = this.tableData.filter(
                item => !rows.includes(item)
              );
            }
            this.setTotalNumber();
            this.$message.success({ message: "删除成功", showClose: true });
            this.refBasketGroup.seletionChange(this.seletionIndex);
          })
          .catch(() => {});
      });
    },
    async createOrder() {
      if (!this.canHandleTableRow) return;
      if (this.checkTableError()) return;
      const noPerm = this.getNoPermList(
        "create",
        "sales.orders",
        this.selectedTableRows
      );
      if (noPerm && noPerm.length) {
        const msg = `配件（${noPerm
          .slice(0, 10)
          .map(item => item.code)
          .join("，")}${
          noPerm.length > 10 ? "等" : ""
        }）您没有权限创建客户订单，请重新选择！`;
        this.$message.error({ message: msg, showClose: true });
        return;
      }
      //检查绑定
      if (!(await this.checkBind())) return;
      if (!(await this.checkOrderList())) return;
      this.toCreateNewOrder();
    },
    async toCreateNewOrder() {
      const ids = this.selectedTableRows.map(item => item.id);
      if (ids && ids.length) {
        createOrder({ ids }).then(data => {
          if (data.errors && data.errors.length) {
            this.tableData.forEach(item => {
              data.errors.forEach(error => {
                if (item.id == error.id) {
                  item.errors = { message: error.error };
                }
              });
            });
            this.$forceUpdate();
            return this.$message.warning("表格数据错误，请修改后重试");
          }
          if (this.selectedTableRows.length === this.tableData.length) {
            this.groupsData = this.groupsData.filter(
              item => item.cooperatorInfo !== this.cooperatorInfo
            );
          } else {
            const curGroup = this.groupsData.find(
              item => item.cooperatorInfo === this.cooperatorInfo
            );
            curGroup.carts = this.tableData = this.tableData.filter(
              item => !this.selectedTableRows.includes(item)
            );
          }
          if (this.orderDialog) {
            this.orderDialog.visible = false;
          }
          this.$emit("update:visible", false);
          this.setTotalNumber();
          this.$router.push({
            path: "/SalesBilling",
            query: { billId: data.billId }
          });
        });
      }
    },
    checkTableError() {
      let error = false;
      this.tableData.forEach(item => {
        if (item.errors?.message) {
          error = true;
        }
      });
      if (error) {
        this.$message.warning("表格数据错误，请修改后重试");
      }
      return error;
    },
    async createSaleOutOrder() {
      if (!this.canHandleTableRow) return;
      if (this.checkTableError()) return;
      const noPerm = this.getNoPermList(
        "create",
        "sales.sales",
        this.selectedTableRows
      );
      if (noPerm && noPerm.length) {
        const msg = `配件（${noPerm
          .slice(0, 10)
          .map(item => item.code)
          .join("，")}${
          noPerm.length > 10 ? "等" : ""
        }）您没有权限创建销售单，请重新选择！`;
        this.$message.error({ message: msg, showClose: true });
        return;
      }
      //检查绑定
      if (!(await this.checkBind())) return;
      //检查配件是否需要映射
      if (await this.checkPart()) return;
      const ids = this.selectedTableRows.map(item => item.id);
      if (ids && ids.length) {
        createSaleOutOrder({ ids })
          .then(data => {
            if (data.errors && data.errors.length) {
              this.tableData.forEach(item => {
                data.errors.forEach(error => {
                  if (item.id == error.id) {
                    item.errors = { message: error.error };
                  }
                });
              });
              this.$forceUpdate();
              return this.$message.warning("表格数据错误，请修改后重试");
            }
            this.$emit("update:visible", false);
            this.$router.push({
              path: "/SalesOutBilling",
              query: { billId: data.billId, list: "true" }
            });
          })
          .catch(() => {});
      }
    },
    hasCartsPerm(key, rows) {
      const noPerm = this.getNoPermList(key, "sales.quotationBaskets", rows);
      return !noPerm || !noPerm.length;
    },
    hasOrdersPerm(key, rows) {
      const noPerm = this.getNoPermList(key, "sales.orders", rows);
      return !noPerm || !noPerm.length;
    },
    hasSalesPerm(key, rows) {
      const noPerm = this.getNoPermList(key, "sales.sales", rows);
      return !noPerm || !noPerm.length;
    },
    getNoPermList(key, permKey, rows) {
      return rows.filter(
        item => !this.hasBelongsPermWithoutRoute(key, permKey, item.belongs)
      );
    },
    toSearch() {
      this.loadData();
    },
    toReset() {
      this.searchForm = { ...defaultSearchForm };
      this.loadData();
    },
    async saveMapData(mapData) {
      this.newParts2erpPartDialog.mapData = mapData;
      const rows = {};
      this.newParts2erpPartDialog.mapData.forEach(item => {
        rows[item.id] = {
          partId: item.partId
        };
      });
      await RequestQQ.partMapping({
        billId: 0,
        cooperatorId: this.cooperatorId,
        billType: 2,
        rows
      });
      this.$message.success("配件映射成功");
      const ids = this.selectedTableRows.map(item => item.id);
      if (ids && ids.length) {
        createSaleOutOrder({ ids })
          .then(data => {
            if (data.errors && data.errors.length) {
              this.tableData.forEach(item => {
                data.errors.forEach(error => {
                  if (item.id == error.id) {
                    item.errors = { message: error.error };
                  }
                });
              });
              this.$forceUpdate();
              return this.$message.warning("表格数据错误，请修改后重试");
            }
            this.$emit("update:visible", false);
            this.$router.push({
              path: "/SalesOutBilling",
              query: { billId: data.billId }
            });
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.statistical-msg {
  color: $color-text-secondary;
  position: absolute;
  font-size: 14px;
  right: 0;
  margin-top: 8px;
  top: -4px;

  .warning {
    color: $color-warning;
  }
}
.basket {
  &::v-deep .el-input-group__append {
    padding: 0 8px;
  }
  &::v-deep .el-range-separator {
    padding: 0;
  }
  &::v-deep .error .el-input__inner {
    border-color: #f56c6c;
  }
}
.head {
  padding: 6px 0;
  right: 0;
  margin-top: 8px;
  top: -4px;
  .warning {
    color: $color-warning;
  }
}
.basket {
  &::v-deep .el-input-group__append {
    padding: 0 8px;
  }
  &::v-deep .error .el-input__inner {
    border-color: #f56c6c;
  }
}
.head {
  padding: 6px 0;
  right: 0;
  margin-top: 8px;
  top: -4px;
  .warning {
    color: $color-warning;
  }
}
.footer {
  margin-top: 12px;
  position: relative;
}
.auto-card .el-card__body {
  height: auto !important;
}
.cooperator-info-box {
  margin: 0;
  height: 38px;
  line-height: 38px;
  padding: 4px 0;
  font-size: 14px;
  color: #778087;

  span {
    display: inline-block;
    min-width: 200px;

    i {
      color: #3aa7ff;
      @include font_color("color-primary");
    }
  }
}
</style>
