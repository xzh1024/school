<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import {
  createDicts,
  deleteDicts,
  updateDicts,
  ableDicts
} from "@/api/base/base";
import { SelectOptions } from "@/constants/interface";
import { DictionaryItem, dictionaryList } from "@/constants/base";
import Category from "./category.vue";
import DetailTable from "./detail-table.vue";
import DetailDialog from "./detail-dialog.vue";
import DisableEnableDialog from "./disable-enable-dialog.vue";

interface Keywords {
  [key: string]: string;
}
const DictionaryStore = namespace("baseData/dictionary");

@Component({
  name: "dictionary"
})
export default class DictionaryComponent extends Mixins(HotkeyMixin) {
  public $refs!: {
    detailTable: DetailTable;
  };

  @DictionaryStore.Action("loadDictionary")
  loadDictionary!: (params: {
    type: string;
    isReload?: boolean;
    useID?: boolean;
  }) => Promise<void>;

  private refreshSelectData() {
    const needIdDictionaries = [
      "technicianLevel",
      "technicianCategory",
      "repairProjectCategory",
      "vehicleLevel",
      "vehicleType"
    ]; //这些字段需要id
    const isUseId = needIdDictionaries.indexOf(this.dictionaryKey) > -1;
    this.loadDictionary({
      type: this.dictionaryKey,
      isReload: true,
      useID: isUseId
    });
  }

  private dictionaryKey = "";
  private visible = false;
  private editData?: DictionaryItem;
  private isAdd = false;
  private loading = false;

  private refreshCurData() {
    this.$nextTick(() => {
      this.$refs.detailTable?.refreshData(
        this.keywords[this.dictionaryKey],
        this.containDisabled
      );
    });
  }

  private get isSettlementType() {
    return this.dictionaryKey === "settlementType";
  }
  get curDictionary() {
    return dictionaryList.find(item => item.key === this.dictionaryKey);
  }
  @Watch("curDictionary")
  onCurDictionaryChange() {
    this.dict = [];
  }

  private keywords: Keywords = {};
  private onSearch(e: MouseEvent) {
    e?.stopPropagation();
    this.refreshCurData();
  }

  private containDisabled = false;

  private disableEnableDialogVisible = false;
  private dict: SelectOptions[] = [];
  private get canDisableEnable() {
    return (
      this.hasAutoPerm("update") && !this.isSettlementType && this.dict?.length
    );
  }
  handleSelectChange(rows: DictionaryItem[]) {
    if (rows?.length) {
      this.dict = rows.map(item => ({ id: item.id || 0, name: item.name }));
    } else {
      this.dict = [];
    }
  }
  showDisableEnableDialog() {
    if (this.canDisableEnable) {
      this.disableEnableDialogVisible = true;
    }
  }

  handleEnable(data: DictionaryItem) {
    this.$confirm(`此操作将启用该字典项：${data.name}, 是否继续？`, "提示", {
      type: "warning"
    }).then(() => {
      this.loading = true;
      ableDicts({
        type: this.dictionaryKey,
        disable: false,
        dict: [
          {
            id: data.id,
            name: data.name
          }
        ]
      })
        .then(() => {
          this.$message.success({ message: "启用成功！", showClose: true });
        })
        .then(() => {
          this.refreshSelectData();
          return this.refreshCurData();
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    });
  }
  handleDisable(data: DictionaryItem) {
    this.$confirm(`此操作将停用该字典项：${data.name}, 是否继续？`, "提示", {
      type: "warning"
    }).then(() => {
      this.loading = true;
      ableDicts({
        type: this.dictionaryKey,
        disable: true,
        dict: [
          {
            id: data.id,
            name: data.name
          }
        ]
      })
        .then(() => {
          this.$message.success({ message: "停用成功！", showClose: true });
        })
        .then(() => {
          this.refreshSelectData();
          return this.refreshCurData();
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    });
  }

  private get canAdd() {
    return this.hasAutoPerm("create") && this.curDictionary?.editable;
  }
  showAddDialog() {
    if (this.canAdd) {
      this.isAdd = true;
      this.changeVisible(true);
    }
  }
  showEditDialog(data: DictionaryItem) {
    this.editData =
      this.dictionaryKey === "partBrand"
        ? { ...data, oldName: data.name }
        : { ...data };
    this.isAdd = false;
    this.changeVisible(true);
  }
  changeDefault(data: DictionaryItem) {
    this.updateDictionary(data);
  }
  changeVisible(visible: boolean) {
    this.visible = visible;
  }
  handleConfrim(data: DictionaryItem) {
    this.isAdd ? this.addDictionary(data) : this.updateDictionary(data);
  }
  handleDelete(data: DictionaryItem) {
    this.$confirm(`此操作将删除该字典项：${data.name}, 是否继续？`, "提示", {
      type: "warning"
    })
      .then(() => {
        this.loading = true;
        return deleteDicts({ id: data.id, type: this.dictionaryKey });
      })
      .then(() => {
        this.$message.success({ message: "删除成功！", showClose: true });
      })
      .then(() => {
        this.refreshSelectData();
        return this.refreshCurData();
      })
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
  addDictionary(data: DictionaryItem) {
    this.loading = true;
    createDicts({
      ...data,
      specialValue: data.specialValue?.toString(),
      type: this.dictionaryKey
    })
      .then(() => {
        this.$message.success({ message: "新增成功！", showClose: true });
        this.visible = false;
      })
      .then(() => {
        this.refreshSelectData();
        return this.refreshCurData();
      })
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
  updateDictionary(data: DictionaryItem) {
    this.loading = true;
    updateDicts({
      ...data,
      specialValue: data.specialValue?.toString(),
      type: this.dictionaryKey
    })
      .then(() => {
        this.$message.success({ message: "编辑成功！", showClose: true });
        this.visible = false;
      })
      .then(() => {
        this.refreshSelectData();
        return this.refreshCurData();
      })
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  render() {
    return (
      <div class="flex-container full-height">
        <Category
          class="flex-block-bg flex-block-margin"
          v-model={this.dictionaryKey}
          onChange={this.refreshCurData}
        />
        <div class="flex-block-bg flex-block-margin auto-block flex-container column-flex">
          <div class="ht-page-title">
            <div class="flex-container">
              <div class="title-name">{this.curDictionary?.name}</div>
              <el-form
                class="form-item-small-margin-bottom"
                label-width="0"
                size="mini"
                style="margin-left: 10px; width: 300px;"
              >
                <el-form-item>
                  <ht-input
                    v-model={this.keywords[this.dictionaryKey]}
                    placeholder="请输入关键字"
                    on-intput-enter={this.onSearch}
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      onClick={this.onSearch}
                    />
                  </ht-input>
                </el-form-item>
              </el-form>
            </div>
            <div>
              显示停用字典
              <el-switch
                v-model={this.containDisabled}
                disabled={this.isSettlementType}
                style="margin-left: 5px;"
                onChange={this.refreshCurData}
              />
              <el-button
                type="primary"
                size="mini"
                style="margin-left: 10px;"
                disabled={!this.canDisableEnable}
                onClick={this.showDisableEnableDialog}
                loading={this.loading}
              >
                批量停用/启用
              </el-button>
              <el-button
                type="primary"
                size="mini"
                disabled={!this.canAdd}
                onClick={this.showAddDialog}
                loading={this.loading}
              >
                新增字典（F2）
              </el-button>
            </div>
          </div>
          <DetailTable
            ref="detailTable"
            class="auto-block"
            dictionaryKey={this.dictionaryKey}
            onChangeDefault={this.changeDefault}
            onEdit={this.showEditDialog}
            onEnable={this.handleEnable}
            onDisable={this.handleDisable}
            onDelete={this.handleDelete}
            onSelectChang={this.handleSelectChange}
          />
        </div>

        <DetailDialog
          editData={this.editData}
          dictionaryKey={this.dictionaryKey}
          visible={this.visible}
          isAdd={this.isAdd}
          onConfrim={this.handleConfrim}
          onClose={() => {
            this.changeVisible(false);
          }}
        />
        <DisableEnableDialog
          visible={this.disableEnableDialogVisible}
          dictionaryKey={this.dictionaryKey}
          dict={this.dict}
          onSuccess={() => this.refreshCurData()}
          onClose={() => (this.disableEnableDialogVisible = false)}
        />
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
.ht-page-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  height: 28px;

  &::before {
    top: 10%;
    height: 80%;
  }

  .title-name {
    margin-left: 5px;
  }

  .flex-container {
    flex: 1;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
