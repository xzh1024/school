<template>
  <ht-dialog :visible.sync="relVisible" title="编辑采购进货明细" width="1200px">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      size="mini"
      label-position="left"
      label-width="71px"
      class="form-item-small-margin-bottom"
      style="margin: 0 10px 10px 10px;"
    >
      <el-form-item
        label="支付方式"
        prop="enhancedSettlementType"
        style="width: 300px;"
      >
        <ht-autoselect
          v-model="ruleForm.enhancedSettlementType"
          v-delay-focus="visible"
          :clearable="false"
          :options="store().enhancedSettlementTypeDictionary()"
          :trigger-on-focus="false"
          placeholder="请选择"
          mnemonic
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <ht-setting-table
        :loading="loading"
        :data="tableData"
        :table-name="tableName"
        :columns="tableColumns"
        :total="totalSize"
        :current-page="currentPage"
        disabledHotkeys
        pagination
        height="400px"
        @pageChange="pageChange"
      />
    </el-form>
    <div style="text-align: center; margin-top: 10px;">
      <el-button
        v-loading="loading"
        type="primary"
        size="mini"
        plain
        @click.stop="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click.stop="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { searchMixin } from "@/mixins";
import { CELL_WIDTH } from "@/constants";
import { mapState } from "vuex";
import { purchaseParts } from "@/api/franchiser";
import MessageBox from "@/components/hztl/message-box";
import { setDeaultPriceAndPosition } from "@/api/purchase/inquire";
import { getAuthorizedPartsList } from "@/api/franchiser";
import { loadSearchPosition } from "@/api/store/stocks";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import * as store from "@/utils/store";

const defaultRuleForm = {
  enhancedSettlementType: "现付（现金）"
};

export default {
  name: "EidtPurchaseBox",
  mixins: [searchMixin],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    infoData: {
      type: Array,
      default() {
        return [];
      }
    },
    headCompanyId: {
      type: Number,
      required: true
    },
    headRemind: Number,
    zeroStockPart: Number
  },
  data() {
    const controlsColumn = {
      prop: "controls",
      label: "操作",
      width: 50,
      cantExport: true,
      render: (value, row) => (
        <el-tooltip placement="top" content="删除" enterable={false}>
          <i
            class="icon operation-icon icon-delete-info"
            on-click={e => this.deleteHandle(row, e)}
          />
        </el-tooltip>
      )
    };
    const qtyColumn = {
      prop: "qty",
      label: "数量",
      width: CELL_WIDTH.qty,
      render: (value, row) => (
        <div on-click={e => e.stopPropagation()}>
          <ht-format-number
            v-model={row.qty}
            precisionType="qty"
            minOut
            min={0}
            size="mini"
            isThrottle
          />
        </div>
      )
    };
    const priceColumn = {
      prop: "realPrice",
      label: "价格",
      width: CELL_WIDTH.money,
      render: (value, row) => (
        <div on-click={e => e.stopPropagation()}>
          <ht-format-number
            v-model={row.realPrice}
            precisionType="price"
            minOut
            min={0}
            size="mini"
            isThrottle
          />
        </div>
      )
    };
    const warehouseColumn = {
      prop: "warehouseId",
      label: "仓库",
      width: CELL_WIDTH.warehouseName,
      render: (value, row) => (
        <div on-click={e => e.stopPropagation()}>
          <ht-autoselect
            v-model={row.warehouseId}
            fetch-suggestions={query =>
              this.searchLoadAllWarehouses(
                query,
                Number(store.userInfoMsg().companyId || 0)
              )
            }
            defaultValue={row.warehouseName}
            remote
            filter-zero
            clearable
            trigger-on-focus={false}
            highlight-first-item
            placeholder="请选择"
            size="mini"
            on-change={warehouseId =>
              this.handleWarehouseChange(warehouseId, row)
            }
          />
        </div>
      )
    };
    const positionColumn = {
      prop: "positionId",
      label: "货位",
      width: CELL_WIDTH.positionName,
      render: (value, row) => {
        return this.isEasyMode ? (
          <div on-click={e => e.stopPropagation()}>
            <ht-autoselect
              v-model={row.positionId}
              keepInputValue={row.positionName}
              fetch-suggestions={query =>
                this.getPositions(row.warehouseId, query)
              }
              defaultValue={row.positionName}
              remote
              keep-input
              filter-zero
              clearable
              no-match-text=""
              trigger-on-focus={false}
              placeholder="请选择"
              size="mini"
              on-input-change={positionName =>
                this.handlePositionNameChange(positionName, row)
              }
              on-change={positionId =>
                this.handlePositionIdChange(positionId, row)
              }
            />
          </div>
        ) : (
          <div on-click={e => e.stopPropagation()}>
            <ht-autoselect
              v-model={row.positionId}
              fetch-suggestions={query =>
                this.getPositions(row.warehouseId, query)
              }
              defaultValue={row.positionName}
              remote
              filter-zero
              clearable
              trigger-on-focus={false}
              highlight-first-item
              placeholder="请选择"
              size="mini"
              on-change={positionId =>
                this.handlePositionIdChange(positionId, row)
              }
            />
          </div>
        );
      }
    };

    return {
      loading: false,
      alert: null,
      ruleForm: { ...defaultRuleForm },
      totalSize: 0,
      currentPage: 1,
      tableData: [],
      tableName: "",
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        controlsColumn,
        {
          prop: "code",
          label: "配件编码",
          width: CELL_WIDTH.code
        },
        {
          prop: "name",
          label: "配件名称",
          width: CELL_WIDTH.name
        },
        {
          prop: "brand",
          label: "配件品牌",
          width: CELL_WIDTH.brand
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.productionPlace
        },
        qtyColumn,
        priceColumn,
        warehouseColumn,
        positionColumn
      ],
      selectedRows: [],
      rules: {
        enhancedSettlementType: [
          {
            required: true,
            message: "请选择支付方式！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("admin", {
      userInfoMsg: state => state.user.userInfoMsg
    }),
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
    ...mapState("admin/table", ["pageSize"]),
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.initData();
        this.$nextTick(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        });
      }
    }
  },
  methods: {
    store() {
      return store;
    },
    initData() {
      this.ruleForm = { ...defaultRuleForm };
      this.tableData = [];
      if (this.infoData.length) {
        this.loading = true;
        const partIds = this.infoData.map(item => item.id);
        setDeaultPriceAndPosition({ partIds })
          .then(res => {
            this.formatTableData(res.rows, this.infoData);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.currentPage = 1;
        this.loadData();
      }
    },
    pageChange(page = 1) {
      this.currentPage = page;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      getAuthorizedPartsList({
        headCompanyId: this.headCompanyId,
        zeroStockPart: this.zeroStockPart,
        headRemind: this.headRemind,
        hasPage: true,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          this.totalSize = res.totalSize;
          if (res.rows.length) {
            const partIds = res.rows.map(item => item.id);
            setDeaultPriceAndPosition({ partIds })
              .then(res2 => {
                this.formatTableData(res2.rows, res.rows);
              })
              .finally(() => {
                this.loading = false;
              });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    formatTableData(rows, infoData) {
      const obj = {};
      if (rows && rows.length) {
        rows.forEach(item => {
          obj[item.partId] = item;
        });
        this.tableData = infoData.map(item => ({
          ...item,
          qty: item.qty || 1,
          realPrice: obj[item.id].taxedPrice,
          warehouseId: obj[item.id].warehouseId,
          warehouseName: obj[item.id].warehouseName,
          positionId: obj[item.id].positionId,
          cachePositionId: obj[item.id].positionId,
          positionName: obj[item.id].positionName
        }));
      }
    },
    async handleWarehouseChange(warehouseId, row) {
      const positions = await this.getPositions(warehouseId);
      if (positions.length) {
        const position = positions.find(
          item => item.id === row.cachePositionId
        );
        if (position) {
          row.positionId = row.cachePositionId;
        } else {
          row.positionId = null;
        }
      } else {
        row.positionId = null;
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId, row) {
      if (!positionId) return;
      row.cachePositionId = positionId;
    },
    handlePositionNameChange(positionName, row) {
      if (positionName) {
        row.positionName = positionName.replace(ALL_SPACE_REG_EXP, "");
      } else {
        row.positionName = "";
      }
    },

    deleteHandle(row, e) {
      e.stopPropagation();
      this.selectedRows = [row];
      this.tableData = this.tableData.filter(item => item.id !== row.id);
    },
    successTips(billId, billNo) {
      return (
        <div>
          已生成采购单(
          <el-link
            type="primary"
            on-click={() => this.gotoBill(billId)}
            style="vertical-align: top;"
          >
            {billNo}
          </el-link>
          )，请前往
          <span>采购-采购开单</span>或
          <span>点击此单据号跳转到采购开单详情页面</span>完成后续采购开单流程
        </div>
      );
    },
    sureHandle() {
      if (this.loading) {
        return;
      }

      this.$refs.ruleForm.validate(async (valid, err) => {
        if (valid) {
          this.loading = true;
          let supplies = this.tableData.map(item => ({ ...item }));

          if (
            this.isEasyMode &&
            this.tableData.some(item => !item.positionId && item.positionName)
          ) {
            if (
              this.tableData.some(
                item =>
                  !item.positionId &&
                  item.positionName &&
                  item.positionName.length > QUICK_ADD_POSITION_LEN
              )
            ) {
              this.$message.warning({
                message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
                showClose: true
              });
              this.loading = false;
              return;
            }

            const positionIds = await quickGetPositions(
              this.tableData.map(item => ({
                warehouseId: item.warehouseId,
                name: item.positionName
              }))
            );
            if (!positionIds) {
              this.loading = false;
              return;
            }

            supplies = supplies.map((item, index) => ({
              ...item,
              positionId: positionIds[index]
            }));
          }

          purchaseParts({
            ...this.ruleForm,
            headCompanyId: this.headCompanyId,
            supplies
          })
            .then(res => {
              this.$emit("success");
              this.cancelHandle();
              this.alert = MessageBox.alert(
                this.successTips(
                  res.id || res.header.id,
                  res.billNo || res.header.billNo
                ),
                "开单提示"
              );
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    gotoBill(billId) {
      MessageBox.close();
      this.$router.push({
        path: "/PurchaseReceiveBilling",
        query: { billId: Number(billId) }
      });
    },
    cancelHandle() {
      this.relVisible = false;
    }
  }
};
</script>
