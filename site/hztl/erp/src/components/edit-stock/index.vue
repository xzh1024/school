<template>
  <ht-dialog
    :visible.sync="passvisible"
    :close-on-click-modal="false"
    append-to-body
    title="库存编辑"
    width="1000px"
    class="ignore-top-hotkeys"
  >
    <div v-switch-focus="focusData" class="dialog-box">
      <div class="container">
        <ht-card
          title="配件信息"
          style="width: 330px;"
          no-background
          class="container-block"
        >
          <ht-table
            :data="tabledata"
            :columns="tableColumns"
            :show-header="false"
            :index-column="false"
            :selection-type="null"
            :key-scope="keyScope"
          />
        </ht-card>

        <ht-card
          title="库存信息修改"
          style="width: 300px;"
          no-background
          class="container-block"
        >
          <div>
            <el-form
              ref="stockform"
              :model="formData"
              :show-message="false"
              :rules="rules"
              size="mini"
              label-position="left"
              label-width="75px"
              class="search-box compact-form"
            >
              <el-form-item label="仓库">
                <ht-autoselect
                  v-model="formData.warehouseId"
                  :disabled="!canEditStock || !canStockMove"
                  :fetch-suggestions="
                    query =>
                      searchLoadManageWarehouses({
                        name: query,
                        managerCompanyId: store().userInfoMsg().companyId,
                        managerStaffId: store().userInfoMsg().staffId
                      })
                  "
                  :default-value="formData.warehouseName"
                  remote
                  filter-zero
                  :trigger-on-focus="false"
                  highlight-first-item
                  placeholder="请选择"
                  @change="handleWarehouseChange"
                />
              </el-form-item>
              <el-form-item label="货位" prop="positionId">
                <ht-autoselect
                  v-if="isEasyMode"
                  :disabled="!canEditStock || (!canStockMove && !canStockTake)"
                  v-model="formData.positionId"
                  :keep-input-value="formData.positionName"
                  :fetch-suggestions="
                    query => getPositions(formData.warehouseId, query)
                  "
                  :default-value="formData.positionName"
                  remote
                  keep-input
                  filter-zero
                  no-match-text=""
                  :trigger-on-focus="false"
                  class="switch-focus focus-position-id"
                  @input-change="handlePositionNameChange"
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handlePositionIdChange"
                />
                <ht-autoselect
                  v-else
                  :disabled="!canEditStock || (!canStockMove && !canStockTake)"
                  v-model="formData.positionId"
                  :fetch-suggestions="
                    query => getPositions(formData.warehouseId, query)
                  "
                  :default-value="formData.positionName"
                  remote
                  :trigger-on-focus="false"
                  highlight-first-item
                  filter-zero
                  class="switch-focus focus-position-id"
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handlePositionIdChange"
                />
              </el-form-item>
              <el-form-item label="数量">
                <ht-format-number
                  v-model="formData.qty"
                  :disabled="!canEditStock || !canStockTake"
                  :min="0"
                  precision-type="qty"
                  class="switch-focus focus-qty"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="进价">
                <ht-format-number
                  v-if="showPurchasedPrice"
                  v-model="formData.taxedPurchasePrice"
                  :min="0"
                  :disabled="!canEditPurchasesPrices || !canStockTake"
                  precision-type="price"
                  class="switch-focus focus-taxedPurchasePrice"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="零售价">
                <ht-format-number
                  v-if="showRetailPrice"
                  v-model="formData.salePrices.retail"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus focus-retail-price"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="平台价">
                <ht-format-number
                  v-if="showPlatformPrice"
                  v-model="formData.salePrices.platform"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="调拨价">
                <ht-format-number
                  v-if="showTransferPrice"
                  v-model="formData.salePrices.allot"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="批发价">
                <ht-format-number
                  v-if="showWholeSalePrice"
                  v-model="formData.salePrices.wholesale"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="批发价一">
                <ht-format-number
                  v-if="showWholeSalePrice1"
                  v-model="formData.salePrices.wholesale1"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="批发价二">
                <ht-format-number
                  v-if="showWholeSalePrice2"
                  v-model="formData.salePrices.wholesale2"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="批发价三">
                <ht-format-number
                  v-if="showWholeSalePrice3"
                  v-model="formData.salePrices.wholesale3"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
              <el-form-item label="批发价四">
                <ht-format-number
                  v-if="showWholeSalePrice4"
                  v-model="formData.salePrices.wholesale4"
                  :min="0"
                  :disabled="!canEditSalePrices"
                  precision-type="price"
                  class="switch-focus"
                  @intput-enter="debouncedHandleInputEnter"
                />
                <ht-input v-else disabled :value="NO_PRICE_PERM_TIPS" />
              </el-form-item>
            </el-form>
          </div>
        </ht-card>
        <ht-card
          title="同步更新设置"
          style="width: 335px;"
          no-background
          class="container-block"
        >
          <el-checkbox
            v-model="formData.isUpdatingOtherCompanies"
            class="normal-checkbox"
            @change="syncChange"
          >
            同步更新同件号、品牌、产地、性质的库存价格
          </el-checkbox>
          <div class="item-group">
            <div>选择要同步更新的公司</div>
            <el-checkbox
              v-model="checkAll"
              :disabled="!formData.isUpdatingOtherCompanies"
              class="company-item"
            >
              全选
            </el-checkbox>
          </div>
          <el-checkbox-group
            v-model="formData.otherCompanyIds"
            :disabled="!formData.isUpdatingOtherCompanies"
            class="infinite-list"
          >
            <el-checkbox
              v-for="company in companys"
              :key="company.id"
              :label="company.id"
              class="company-item"
            >
              {{ company.name }}
            </el-checkbox>
          </el-checkbox-group>
        </ht-card>
      </div>
      <div class="dialog-footer-align mt-1">
        <el-button
          v-loading="loading"
          type="primary"
          plain
          class="switch-focus focus-bottun"
          size="mini"
          @click="submit"
        >
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click="close">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { cloneDeep, pick } from "lodash";
import { updateStock } from "@/api/store/stocks";
import { searchMixin } from "@/mixins";
import { mapState } from "vuex";
import { loadSearchPosition } from "@/api/store/stocks";
import { resetBelongsItem } from "@/mixins/permissionsMixin";
import {
  ALL_SPACE_REG_EXP,
  QUICK_ADD_POSITION_LEN,
  NO_PRICE_PERM_TIPS
} from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import * as store from "@/utils/store";

let lastKeyScope;
const defaultFormData = {
  id: 0,
  warehouseId: null,
  warehouseName: "",
  positionId: null,
  positionName: "",
  qty: 0,
  taxedPurchasePrice: 0,
  salePrices: {
    retail: 0,
    platform: 0,
    allot: 0,
    wholesale: 0,
    wholesale1: 0,
    wholesale2: 0,
    wholesale3: 0,
    wholesale4: 0
  },
  isUpdatingOtherCompanies: false,
  otherCompanyIds: []
};
const CURRENT_BELONGS = ["self", "others"];
const NEW_BELONGS = "our";

export default {
  name: "EditStock",
  mixins: [searchMixin],
  props: {
    visible: {
      type: Boolean
    },
    stockData: {
      type: Object,
      required: true
    },
    canEditPurchasesPrices: {
      type: Boolean,
      required: true
    },
    canEditSalePrices: {
      type: Boolean,
      required: true
    },
    canEditStock: Boolean,
    companyId: [String, Number]
  },
  data() {
    return {
      loading: false,
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      keyScope: Symbol("editStock"),
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      tableColumns: [
        { prop: "name", label: "", width: "70" },
        {
          prop: "content",
          label: "",
          width: "230",
          classNames: "text-font-primary"
        }
      ],
      resetFocus: false,
      formData: cloneDeep(defaultFormData),
      positionList: [],
      companys: [],
      showCompanysCount: 10,
      cachePositionId: null,
      rules: {
        positionId: [
          {
            required: true,
            message: "请选择货位!"
          }
        ]
      },
      NO_PRICE_PERM_TIPS
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
    stockform() {
      return this.$refs.stockform;
    },
    passvisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    },
    checkAll: {
      get() {
        return this.formData.otherCompanyIds.length === this.companys.length;
      },
      set(value) {
        this.formData.otherCompanyIds = value
          ? this.companys.map(item => item.id)
          : [];
      }
    },
    showCompanys() {
      return this.companys.slice(0, this.showCompanysCount);
    },
    tabledata() {
      return [
        {
          name: "配件编码",
          content: this.stockData.code
        },
        {
          name: "配件名称",
          content: this.stockData.name
        },
        {
          name: "配件品牌",
          content: this.stockData.brand
        },
        {
          name: "产地",
          content: this.stockData.productionPlace
        },
        {
          name: "配件性质",
          content: this.stockData.property
        },
        {
          name: "货主",
          content: this.stockData.ownerCompanyName
        },
        {
          name: "供应商",
          content: this.stockData.supplierName
        },
        {
          name: "批次号",
          content: this.stockData.batchNo
        },
        {
          name: "实际数",
          content: this.stockData.qty
        },
        {
          name: "动态数",
          content: this.stockData.autoQty || this.stockData.dynaQty || ""
        },
        {
          name: "锁定数",
          content: this.stockData.lockedQty
        }
      ];
    },
    canStockTake() {
      return this.hasCompletePerm("storage.partStocktaking.stocktaking.create");
    },
    canStockMove() {
      return this.hasCompletePerm("storage.stockmoving.create");
    },
    showPurchasedPrice() {
      return this.hasBelongsPermWithoutRoute(
        "purchasedPrice",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showRetailPrice() {
      return this.hasBelongsPermWithoutRoute(
        "retailPrice",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showPlatformPrice() {
      return this.hasBelongsPermWithoutRoute(
        "platformPrice",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showTransferPrice() {
      return this.hasBelongsPermWithoutRoute(
        "transferPrice",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice1() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice1",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice2() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice2",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice3() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice3",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice4() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice4",
        "specials.pricesRead",
        resetBelongsItem(this.stockData.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    }
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val) {
          lastKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
          this.initData();
          setTimeout(() => {
            this.updateFocusData({
              initial: "focus-taxedPurchasePrice"
            });
            this.stockform && this.stockform.clearValidate();
          });
        } else if (oldVal) {
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.bindKeyboard();
    this.loadAllCompanys();
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    store() {
      return store;
    },
    initData() {
      this.formData = {
        ...cloneDeep(defaultFormData),
        ...pick(this.stockData, Object.keys(defaultFormData)),
        taxedPurchasePrice: this.stockData.costPrices
          ? this.stockData.costPrices.taxed
          : this.stockData.taxedPurchasePrice
      };
      this.cachePositionId = this.formData.positionId;
    },
    async handleWarehouseChange(warehouseId) {
      const positions = await this.getPositions(warehouseId);
      if (positions.length) {
        const position = positions.find(
          item => item.id === this.cachePositionId
        );
        if (position) {
          this.formData.positionId = this.cachePositionId;
        } else {
          this.formData.positionId = null;
        }
      } else {
        this.formData.positionId = null;
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId) {
      if (!positionId) return;
      this.cachePositionId = positionId;
    },
    handlePositionNameChange(positionName) {
      if (positionName) {
        this.formData.positionName = positionName.replace(
          ALL_SPACE_REG_EXP,
          ""
        );
      } else {
        this.formData.positionName = "";
      }
    },
    async submit() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      if (
        this.isEasyMode &&
        !this.formData.positionId &&
        this.formData.positionName
      ) {
        if (
          this.formData.positionName &&
          this.formData.positionName.length > QUICK_ADD_POSITION_LEN
        ) {
          this.$message.warning({
            message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
            showClose: true
          });
          this.loading = false;
          return;
        }

        const positionIds = await quickGetPositions([
          {
            warehouseId: this.formData.warehouseId,
            name: this.formData.positionName
          }
        ]);
        if (!positionIds) {
          this.loading = false;
          return;
        }

        this.formData.positionId = positionIds[0];
      }

      this.stockform.validate((valid, err) => {
        if (valid) {
          updateStock(this.formData)
            .then(() => {
              this.close();
              this.$message.success({ message: "更新成功!" });
              this.$emit("update-success", true);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
          this.loading = false;
        }
      });
    },
    close() {
      this.passvisible = false;
    },
    syncChange() {
      this.formData.otherCompanyIds = [];
    },
    bindKeyboard() {
      hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f3":
            this.submit();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({ type: handler.key });
            break;
          default:
            return;
        }
      });
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
    loadCompanys() {
      this.showCompanysCount += 10;
    },
    async loadAllCompanys() {
      if (!store.allCompanies() || !store.allCompanies().length) {
        await this.$store.dispatch("admin/baseData/loadAllCompanies");
      }
      this.companys = store.allCompanies();
      this.showCompanysCount = 10;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.dialog-box {
  background-color: $color-content-bg;
  @include background_color("color-content-bg");
}

.container {
  display: flex;
  justify-content: space-between;

  .container-block {
    background: #fff;
    height: auto !important;
  }

  .infinite-list {
    overflow: auto;
    padding: 0 20px;
    height: 250px;
    background-color: $color-content-bg;
    @include background_color("color-content-bg");
  }
}

.item-group {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.company-item {
  display: block;
  margin: 6px 0;
}
</style>
