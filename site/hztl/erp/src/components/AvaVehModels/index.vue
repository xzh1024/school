<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { Fragment } from "vue-fragment";
import hotkeys from "hotkeys-js";
import { PartModel } from "@/api/parts/partsModels";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { BEIMAI, MINGJUE, DEFAULT_VIN_TYPE } from "@/constants/platform";
import ModelsSearch from "./ModelsSearch/index.vue";
import { SearchFormMingJueData } from "./ModelsSearch/MingJue";
import { SearchFormBeiMaiData } from "./ModelsSearch/BeiMai";
import ModelsTable, {
  SearchMingJueParams,
  SearchBeiMaiParams
} from "./ModelsTable/index.vue";
import AutoModelsSelectDilog from "./AutoModelsSelectDilog/index.vue";
import SysModelsSelectDilog from "./SysModelsSelectDilog/index.vue";
import EpcModelsSelectDilog from "./EpcModelsSelectDilog/index.vue";

interface Props {
  visible: boolean;
  isEdit?: boolean;
  part?: PartModel | null;
  disInternalHotKeys?: boolean;
}

interface Event {
  onVisibleChange(visible: boolean): void;
}

let lastKeyscope: symbol | string;
const topHotkeys = new TopHotkeys();
@Component
export default class AvaVehModelsDialog extends tsc.Component<Props, Event> {
  public $refs!: {
    modelsTable: ModelsTable;
  };
  @Prop() readonly part!: PartModel | null;
  @Prop(Boolean) readonly isEdit!: boolean;
  @Prop() readonly visible!: boolean;
  @Prop() disInternalHotKeys!: boolean;
  @Watch("visible", { immediate: true })
  onVisibleChange(newVal: boolean, oldVal: boolean) {
    if (!this.disInternalHotKeys) {
      if (newVal) {
        lastKeyscope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el as HTMLElement);
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el as HTMLElement);
        hotkeys.setScope(lastKeyscope);
      }
    }
  }
  changeVisible(visible: boolean) {
    this.$emit("update:visible", visible);
    this.$emit("visibleChange", visible);
  }

  protected get dataSource() {
    return (
      (this.$store && this.$store.state.admin.user.userInfoMsg.dataService) ||
      DEFAULT_VIN_TYPE
    );
  }
  private get isMingJue() {
    return this.dataSource === MINGJUE;
  }
  private get isBeiMai() {
    return this.dataSource === BEIMAI;
  }

  private searchParams: SearchMingJueParams | SearchBeiMaiParams | null = null;
  private loading = false;
  get modelsTableRef() {
    return this.$refs.modelsTable;
  }
  private searchChange(data: SearchFormMingJueData | SearchFormBeiMaiData) {
    if (this.part) {
      this.searchParams = { partId: this.part.id, ...data };
    }
  }
  private autoModlesVisible = false;
  private changeAutoModelDilog(visible: boolean) {
    this.autoModlesVisible = visible;
    if (!visible) {
      this.modelsTableRef?.goFirstPage();
    }
  }
  private sysModlesVisible = false;
  private changeSysModelDilog(visible: boolean) {
    this.sysModlesVisible = visible;
    if (!visible) {
      this.modelsTableRef?.goFirstPage();
    }
  }
  private epcModlesVisible = false;
  private changeEpcModelDilog(visible: boolean) {
    this.epcModlesVisible = visible;
    if (!visible) {
      this.modelsTableRef?.goFirstPage();
    }
  }
  render() {
    return (
      <Fragment>
        <ht-dialog
          visible={this.visible}
          width="1300px"
          top="7vh"
          class="edit-swap-group-parts ignore-top-hotkeys"
          on={{ "update:visible": this.changeVisible }}
          title={`「${this.part?.code}」标准适用车型`}
          append-to-body
        >
          <div class="edit-container flex-container column-flex">
            {this.isEdit ? (
              <div class="flex-block-bg flex-block-margin flex-block-padding">
                {this.isMingJue && (
                  <el-button
                    type="primary"
                    size="mini"
                    onClick={() => this.changeAutoModelDilog(true)}
                  >
                    自定义车型
                  </el-button>
                )}
                <el-button
                  type="primary"
                  size="mini"
                  onClick={() => this.changeSysModelDilog(true)}
                >
                  系统标准车型
                </el-button>
                {this.isMingJue && (
                  <el-button
                    type="primary"
                    size="mini"
                    onClick={() => this.changeEpcModelDilog(true)}
                  >
                    EPC适用车型导入
                  </el-button>
                )}
              </div>
            ) : null}
            <ModelsSearch
              class="flex-block-bg flex-block-margin flex-block-padding"
              isMingJue={this.isMingJue}
              isBeiMai={this.isBeiMai}
              partId={this.part?.id || 0}
              visible={this.visible}
              loading={this.loading}
              onChange={this.searchChange}
            />
            <div class="auto-block flex-container detail-container flex-block-margin">
              <ModelsTable
                class="auto-block flex-block-bg"
                ref="modelsTable"
                isMingJue={this.isMingJue}
                isBeiMai={this.isBeiMai}
                isEdit={this.isEdit}
                params={this.searchParams!}
              />
            </div>
          </div>
        </ht-dialog>
        <AutoModelsSelectDilog
          visible={this.autoModlesVisible}
          partId={this.part?.id}
          dataSource={this.dataSource}
          onVisibleChange={this.changeAutoModelDilog}
        />
        <SysModelsSelectDilog
          visible={this.sysModlesVisible}
          partId={this.part?.id || 0}
          dataSource={this.dataSource}
          isMingJue={this.isMingJue}
          isBeiMai={this.isBeiMai}
          customCodes={this.part?.customCodes || []}
          onVisibleChange={this.changeSysModelDilog}
        />
        <EpcModelsSelectDilog
          visible={this.epcModlesVisible}
          part={this.part!}
          dataSource={this.dataSource}
          onVisibleChange={this.changeEpcModelDilog}
        />
      </Fragment>
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
}
</style>
