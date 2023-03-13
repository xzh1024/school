<template>
  <div class="container-box">
    <ht-card :no-padding="true" class="auto-card">
      <el-row :gutter="6" class="full-height" style="height:500px">
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
          <ht-card title="配件列表" no-padding class="full-height">
            <div
              v-switch-focus="focusData"
              class="flex-container column-flex"
              style="height:396px;"
            >
              <p class="cooperator-info-box">
                <span>
                  <i class="el-icon-s-custom" />
                  {{ supplierInfo.contactsName }}
                </span>
                <span>
                  <i class="el-icon-phone" />
                  {{ supplierInfo.contactsPhone }}
                </span>
                <span>
                  <i class="el-icon-location" />
                  {{ supplierInfo.areaName }}
                </span>
              </p>
              <ht-setting-table
                :loading="loading"
                :data="tableData"
                :key-scope="keyScopes.basketTable"
                :columns="columns"
                :table-name="tableName"
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
    <div class="footer">
      <el-button
        :disabled="
          !selectedTableRows.length ||
            !hasOrdersPerm('create', selectedTableRows)
        "
        type="primary"
        size="mini"
        @click="createOrder"
      >
        生成订货计划
      </el-button>
      <el-button type="primary" size="mini" @click="loadData">
        刷新采购篮
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
      :visible.sync="showEditDialog"
      :partData="editData"
      isEdit
      @sure="partInfoChangeHandle"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
  </div>
</template>

<script>
import { sumBy } from "lodash";
import { mapActions } from "vuex";
import hotkeys from "hotkeys-js";
import {
  createOrderByCarts,
  deletePurchaseBasket,
  loadPurchaseBasket,
  updatePurchaseBasket
} from "@/api/purchase";
import { CELL_WIDTH } from "@/constants";
import { baseDataMixin, precisionsFixed } from "@/mixins";
import { formatterColums } from "@/components/table";
import debounce from "throttle-debounce/debounce";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import BasketGroup from "./components/basket-group";
import { EditBasketDetailBox } from "../components";
import { mapState } from "vuex";

let oldKeyScope;

export default {
  name: "BasKet",
  components: {
    EditBasketDetailBox,
    BasketGroup,
    AvaVehModels
  },
  mixins: [precisionsFixed, baseDataMixin],
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
      label: "采购数量",
      prop: "qty",
      width: CELL_WIDTH.qty,
      render: (value, row, index) => {
        return this.hasCartsPerm("update", [row]) ? (
          <div on-click={e => e.stopPropagation()}>
            <ht-format-number
              class={`switch-focus focus-qty-${index}`}
              v-model={row.qty}
              precisionType="qty"
              min={1}
              size="mini"
              isThrottle
              on-change={() => this.handleQtyChange(row)}
              nativeOn-keyup={e => this.debouncedHandleInputEnter(e)}
              on-focus={() => this.setPriceOrQtyKeyScope(`focus-qty-${index}`)}
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
      width: CELL_WIDTH.money,
      render: (value, row, index) => {
        return this.hasCartsPerm("update", [row]) ? (
          <div on-click={e => e.stopPropagation()}>
            <ht-format-number
              class={`switch-focus focus-price-${index}`}
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
            />
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
      keyScopes: {
        basketGroup: Symbol("basketGroup"),
        basketTable: Symbol("basketTable"),
        priceOrQty: Symbol("priceOrQty")
      },
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      supplierInfo: {
        contactsName: "",
        contactsPhone: "",
        areaName: ""
      },
      priceOrQty: "focus-qty-0",
      groupsData: [],
      seletionIndex: 0,
      tableData: [],
      selectedTableRows: [],
      tableName: "puchaseBasKetList",
      loading: false,
      editData: {},
      showEditDialog: false,
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
          width: CELL_WIDTH.vehModel,
          defaultShow: true,
          cantExport: true,
          render: (value, row) => (
            <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
              查看
            </a>
          )
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
          label: "金额",
          prop: "amount",
          width: CELL_WIDTH.money,
          type: "number",
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
      ]
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
    canHandleTableRow() {
      return !!this.selectedTableRows.length;
    },
    refTab() {
      return this.$refs.tab;
    },
    columns() {
      let columns = [];
      columns = this.easyColumns;
      return formatterColums.bind(this)(columns);
    },
    statistical() {
      return {
        category: this.selectedTableRows.length,
        qtr: this.precisionFormat(
          sumBy(this.selectedTableRows, item => Number(item.qty)),
          "qty"
        ),
        amount: this.precisionFormat(
          sumBy(
            this.selectedTableRows,
            item => parseFloat(item.qty) * Number(item.price)
          ),
          "price"
        )
      };
    }
  },
  watch: {
    visible: {
      handler(value, oldValue) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          this.setKeyScope(this.keyScopes.basketGroup);
          this.loadData();
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    },
    tableData(value) {
      if (value.length) {
        this.priceOrQty = "focus-qty-0";
        this.selectedTableRows = [...value];
      }
    }
  },
  mounted() {
    this.loadPurchaseBasketInfo();
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
    ...mapActions("admin/purchaseInfo", ["loadPurchaseBasketInfo"]),

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
    handleGroupChange(group) {
      this.supplierInfo = group ? group.supplierInfo : {};
      this.tableData = group ? group.carts : [];
      if (!this.tableData.length) {
        this.seletionIndex = 0;
        if (this.refBasketGroup) {
          this.refBasketGroup.seletionChange(this.seletionIndex);
        }
      }
    },
    async loadData() {
      let res = null;
      res = await loadPurchaseBasket();
      this.groupsData =
        res && res.rows
          ? res.rows.map(item => {
              return {
                supplierInfo: item.supplierInfo,
                carts: item.carts.map(cart => {
                  return {
                    ...cart,
                    supplierName: item.supplierInfo.name
                  };
                })
              };
            })
          : [];
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
      this.showEditDialog = true;
    },
    async createOrder() {
      if (!this.canHandleTableRow) return;
      const noPerm = this.getNoPermList(
        "create",
        "purchases.orders",
        this.selectedTableRows
      );
      if (noPerm && noPerm.length) {
        const msg = `配件（${noPerm
          .slice(0, 10)
          .map(item => item.code)
          .join("，")}${
          noPerm.length > 10 ? "等" : ""
        }）您没有权限创建订货计划单，请重新选择！`;
        this.$message.error({ message: msg, showClose: true });
        return;
      }
      const cartsIds = this.selectedTableRows.map(item => item.id);
      await createOrderByCarts({ cartsIds }).then(data => {
        this.$router.push({
          path: "/PurchaseBilling",
          query: { orderId: Number(data.billId) }
        });
      });
      await this.loadPurchaseBasketInfo();
      this.$emit("update:visible", false);
    },
    async remove(rows, isMultiple = false) {
      if (!this.canHandleTableRow) return;
      const noPerm = this.getNoPermList("delete", "purchases.carts", rows);
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
      await this.$confirm(
        isMultiple
          ? `确认移除所选${rows.length}条记录的配件！`
          : "确认移除当前记录配件！"
      );
      this.cacheSeletionIndex = this.seletionIndex;
      await deletePurchaseBasket({
        ids: rows.map(item => item.id)
      });
      if (rows.length === this.tableData.length) {
        this.groupsData = this.groupsData.filter(
          item => item.supplierInfo !== this.supplierInfo
        );
      } else {
        const curGroup = this.groupsData.find(
          item => item.supplierInfo === this.supplierInfo
        );
        curGroup.carts = this.tableData = this.tableData.filter(
          item => !rows.includes(item)
        );
      }
      await this.loadPurchaseBasketInfo();
      this.$message.success({ message: "删除成功", showClose: true });
      this.refBasketGroup?.seletionChange(this.seletionIndex);
    },
    handleQtyChange(row) {
      if (!row.qty) {
        row.amount = 0;
        return;
      }
      if (row.price) {
        row.amount = this.precisionFormat(row.qty * row.price, "money");
      } else if (row.amount) {
        row.price = this.precisionFormat(row.amount / row.qty, "price");
      }
      this.partInfoChangeHandle(row);
    },
    handlePriceChange(row) {
      if (!row.price) {
        row.amount = 0;
        return;
      }
      if (row.qty) {
        row.amount = this.precisionFormat(row.qty * row.price, "money");
      }
      this.partInfoChangeHandle(row);
    },
    async partInfoChangeHandle(data) {
      await updatePurchaseBasket({
        id: data.id,
        qty: data.qty,
        price: data.price,
        isTaxed: data.isTaxed,
        property: data.property,
        remark: data.remark,
        amount: data.amount,
        supplierId: data.supplierId
      });
      this.cacheSeletionIndex = this.seletionIndex;
      await this.loadData();
      this.$message.success({ message: "更新成功", showClose: true });
    },
    hasCartsPerm(key, rows) {
      const noPerm = this.getNoPermList(key, "purchases.carts", rows);
      return !noPerm || !noPerm.length;
    },
    hasOrdersPerm(key, rows) {
      const noPerm = this.getNoPermList(key, "purchases.orders", rows);
      return !noPerm || !noPerm.length;
    },
    getNoPermList(key, permKey, rows) {
      return rows.filter(
        item => !this.hasBelongsPermWithoutRoute(key, permKey, item.belongs)
      );
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
.footer {
  margin-top: 12px;
  position: relative;
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
