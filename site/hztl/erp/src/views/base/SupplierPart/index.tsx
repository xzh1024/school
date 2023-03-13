import { Component, Mixins, Watch } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import SearchFrom, { SupplierPartFilter } from "./SearchFrom";
import SupplierList from "./SupplierList";
import PartList from "./PartList";
import AddPartDialog from "./AddPartDialog";
import EditSinglePartDialog from "./EditSinglePartDialog";
import EditMultiplePartDialog from "./EditMultiplePartDialog";
import { EditPartData, SupplierItem, SupplierPartItem } from "./interface";
import {
  changeSupplierType,
  editSupplierParts,
  removeSupplierParts
} from "./services";

@Component({
  name: "supplierPart",
  components: {
    SearchFrom,
    SupplierList,
    PartList,
    AddPartDialog,
    EditSinglePartDialog,
    EditMultiplePartDialog,
    PartsDetailBox
  }
})
export default class SupplierPart extends Mixins(HotkeyMixin) {
  $refs!: {
    supplierList: SupplierList;
  };
  private loading = false;
  private get belongs() {
    return this.supplier?.belongs || [];
  }
  private get disAdd() {
    return !this.hasBelongsPerm("create", ["our", "self"]);
  }
  private get disEdit() {
    return !this.hasBelongsPerm("update", this.belongs);
  }
  private get disRemove() {
    return !this.hasBelongsPerm("delete", this.belongs);
  }

  private searchParams: SupplierPartFilter | null = null;
  private searchChange(params: SupplierPartFilter) {
    this.searchParams = params;
  }

  private supplier: SupplierItem | null = null;
  private supplierSelectHander(supplier: SupplierItem) {
    this.supplier = supplier;
  }
  private get defaultSelectSuppliers() {
    return this.supplier && !this.disEdit
      ? [
          {
            id: this.supplier.cooperatorId,
            name: this.supplier.name
          }
        ]
      : [];
  }

  private addPartVisible = false;
  private showAddPartDialog() {
    this.addPartVisible = true;
  }

  private closeDialog() {
    this.addPartVisible = false;
    this.$refs.supplierList.refreshData();
  }

  private curSupportType = 1;
  @Watch("supplier")
  onSupplierChange() {
    this.curSupportType = this.supplier ? this.supplier.type : 1;
  }

  private curSupportTypeChange(type: number) {
    if (this.disEdit || !this.supplier) {
      return;
    }
    this.loading = true;
    changeSupplierType(this.supplier.cooperatorId, type)
      .then(() => {
        this.$refs.supplierList.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private supplierPart: SupplierPartItem[] = [];
  private partSelectHander(rows: SupplierPartItem[]) {
    this.supplierPart = rows;
  }

  private removeSelectedParts() {
    if (this.disRemove || !this.supplierPart.length) {
      return;
    }
    this.$confirm(`确定移除当前所选${this.supplierPart.length}个配件?`).then(
      () => {
        this.removeParts(this.supplierPart.map(item => item.id));
      }
    );
  }

  private removeParts(ids: number[]) {
    if (this.disRemove || !ids.length) {
      return;
    }
    this.loading = true;
    removeSupplierParts(ids)
      .then(() => {
        this.$refs.supplierList.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private changePartDataHandle(ids: number[], data: EditPartData) {
    if (this.disEdit || !ids.length) {
      return;
    }
    this.loading = true;
    editSupplierParts(ids, data)
      .then(() => {
        this.editSingVisible = false;
        this.editMultipleVisible = false;
        this.$refs.supplierList.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private editSingVisible = false;
  private editMultipleVisible = false;
  private singEditPart: SupplierPartItem | null = null;
  private editIds: number[] = [];
  private editpartsHandle(list: SupplierPartItem[]) {
    if (list.length === 1) {
      this.editSingVisible = true;
      this.singEditPart = list[0];
    } else if (list.length > 1) {
      this.editMultipleVisible = true;
      this.editIds = list.map(item => item.id);
    }
  }

  private partDetailBoxVisible = false;
  private get curPart() {
    return this.supplierPart.length === 1 ? this.supplierPart[0] : null;
  }
  private showPartDetail() {
    if (this.curPart) {
      this.partDetailBoxVisible = true;
    }
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding mt-half">
          <el-button
            type="primary"
            size="mini"
            onClick={this.showAddPartDialog}
            disabled={this.disAdd}
            loading={this.loading}
          >
            添加配件（F2）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={() => this.editpartsHandle(this.supplierPart)}
            disabled={this.disEdit || !this.supplierPart.length}
            loading={this.loading}
          >
            编辑（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={this.disRemove || !this.supplierPart.length}
            onClick={this.removeSelectedParts}
            loading={this.loading}
          >
            删除（F4）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.curPart}
            onClick={this.showPartDetail}
            loading={this.loading}
          >
            配件详情（F10）
          </el-button>
        </div>
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          <search-from
            loading={this.loading}
            onSearchChange={this.searchChange}
          />
        </div>

        <div class="auto-block flex-block-margin">
          <ht-resize-columns defaultLen={800}>
            <div slot="block1" class="flex-block-bg flex-container column-flex">
              <div class="flex-container flex-block-padding">
                <div class="ht-page-title">供应商列表</div>
              </div>
              <supplier-list
                class="auto-block"
                ref="supplierList"
                searchParams={this.searchParams}
                onSelectChange={this.supplierSelectHander}
              />
            </div>
            <div slot="block2" class="flex-block-bg flex-container column-flex">
              <div class="flex-container flex-block-padding">
                <div class="ht-page-title">供应商配件管理</div>
                <div>
                  专供供应商：
                  <el-radio-group
                    loading={this.loading}
                    v-model={this.curSupportType}
                    disabled={this.disEdit}
                    onChange={this.curSupportTypeChange}
                  >
                    <el-radio label={0}>是</el-radio>
                    <el-radio label={1}>否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <part-list
                class="auto-block"
                searchParams={this.searchParams}
                supplier={this.supplier}
                onRemoveParts={this.removeParts}
                onEditPart={this.editpartsHandle}
                onSelectChange={this.partSelectHander}
                onChangePartData={this.changePartDataHandle}
              />
            </div>
          </ht-resize-columns>
        </div>
        <add-part-dialog
          visible={this.addPartVisible}
          defaultSelects={this.defaultSelectSuppliers}
          onClose={this.closeDialog}
        />
        <edit-single-part-dialog
          visible={this.editSingVisible}
          loading={this.loading}
          editPart={this.singEditPart}
          onChangePartData={this.changePartDataHandle}
          onClose={() => (this.editSingVisible = false)}
        />
        <edit-multiple-part-dialog
          visible={this.editMultipleVisible}
          loading={this.loading}
          partIds={this.editIds}
          onChangePartData={this.changePartDataHandle}
          onClose={() => (this.editMultipleVisible = false)}
        />
        <parts-detail-box
          visible={this.partDetailBoxVisible}
          onClose={() => (this.partDetailBoxVisible = false)}
          value={this.curPart?.partId}
        />
      </div>
    );
  }
}
