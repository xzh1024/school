<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { SwapGroup } from "@/api/parts/swapGroup";
import EditSearch, {
  EditSearchParams,
  defaultFormData
} from "./EditSearch.vue";
import EditPartsList from "./EditPartsList.vue";
import EditLocalParts from "./EditLocalParts.vue";
import { LocalPart, addLocalCode } from "@/api/parts/swapGroupParts";

interface Props {
  group?: SwapGroup | null;
  visible: boolean;
}

interface Event {
  onVisibleChange(visible: boolean): void;
}

@Component
export default class EditSwapGroupPartsDialog extends tsc.Component<
  Props,
  Event
> {
  public $refs!: {
    editPartsTable: EditPartsList;
  };
  @Prop() readonly group?: SwapGroup;
  @Prop() readonly visible!: boolean;
  changeVisible(visible: boolean) {
    return this.$emit("visibleChange", visible);
  }
  private searchParams: EditSearchParams = { ...defaultFormData };
  private loading = false;
  get editPartsTableRef() {
    return this.$refs.editPartsTable;
  }
  @Watch("visible")
  onVisibleChange(val: boolean) {
    if (val) {
      this.searchParams = { ...defaultFormData };
      this.$nextTick(() => {
        this.editPartsTableRef?.goFirstPage();
      });
    }
  }
  private addPart(part: LocalPart) {
    addLocalCode({
      groupId: this.group!.id,
      code: part.code
    }).then(() => {
      this.$refs.editPartsTable?.goFirstPage();
    });
  }
  render() {
    return (
      <ht-dialog
        visible={this.visible}
        width="1300px"
        top="7vh"
        class="edit-swap-group-parts"
        on={{ "update:visible": this.changeVisible }}
        title={`编辑「互换组：${this.group?.name}」`}
      >
        <div class="edit-container flex-container column-flex">
          <EditSearch
            class="flex-block-bg flex-block-margin flex-block-padding"
            loading={this.loading}
            v-model={this.searchParams}
          />
          <div class="auto-block flex-container detail-container">
            <div class="auto-block flex-container column-flex flex-block-margin flex-block-bg">
              <div class="ht-page-title page-title-divider title-padding">
                本地配件资料
              </div>
              <EditLocalParts
                params={this.searchParams!}
                onPartAdd={this.addPart}
              />
            </div>
            <div class="auto-block flex-container column-flex flex-block-margin flex-block-bg">
              <div class="ht-page-title page-title-divider title-padding">
                {this.group?.name}
              </div>
              <EditPartsList ref="editPartsTable" group={this.group} />
            </div>
          </div>
        </div>
      </ht-dialog>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.edit-swap-group-parts {
  &::v-deep .el-dialog__body {
    background-color: #e7ebed;
    padding: 0;
  }
  .edit-container {
    height: 80vh;
  }
  .detail-container {
    .flex-block-margin {
      margin-top: 0;
    }
  }
}
</style>
