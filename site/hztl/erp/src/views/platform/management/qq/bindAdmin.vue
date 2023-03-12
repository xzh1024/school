<script lang="tsx">
import { Component, Watch, Vue, Mixins } from "vue-property-decorator";
import { CELL_WIDTH } from "@/constants";
import { searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";
import RequestQQ, { GetCoopsListRequest, GetCoopsListRresult } from "@/api/qq";
type rowsDataType = GetCoopsListRresult["rows"];
import { dateFormat } from "@/utils/date";
const defaultSearchForm: GetCoopsListRequest & { date?: string | Date[] } = {
  keyword: "",
  platformCooperatorName: "",
  date: "",
  fromDate: "",
  toDate: "",
  status: "",
  page: 1,
  pageSize: 20
};
const defaultPriceType = [
  { id: "调拨价", name: "调拨价" },
  { id: "平台价", name: "平台价" },
  { id: "零售价", name: "零售价" },
  { id: "批发价", name: "批发价" },
  { id: "批发价一", name: "批发价一" },
  { id: "批发价二", name: "批发价二" },
  { id: "批发价三", name: "批发价三" },
  { id: "批发价四", name: "批发价四" }
];
let lastKeyscope: symbol | string;
const topHotkeys = new TopHotkeys();
@Component({ name: "AccessAdmin" })
export default class AccessAdmin extends Mixins(searchMixin) {
  [x: string]: any;
  public searchForm = { ...defaultSearchForm };
  public priceType = defaultPriceType;
  private page = {
    current: 0,
    total: 1,
    totalSize: 20
  };
  private table: {
    name: string;
    loading: boolean;
    data: rowsDataType;
    columns: never[];
    selections: rowsDataType;
    selectAll: boolean;
    notBindUsers: rowsDataType;
    bindedUsers: rowsDataType;
  } = {
    name: "Access-Table",
    loading: true,
    data: [],
    columns: [],
    selections: [],
    notBindUsers: [],
    bindedUsers: [],
    selectAll: false
  };
  private title: "绑定" | "换绑" = "绑定";
  private bindCompany = "";
  private dialog = {
    visible: false
  };
  private bindDialog = {
    visible: false
  };
  get tableColumns() {
    return [
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
      {
        prop: "controls",
        type: "controls",
        label: "操作",
        width: 70,
        cantExport: true,
        render: (_value: any, row: any) =>
          row.status == "unbind" ? (
            <div style="display:flex;justify-content:flex-start;">
              <el-tooltip enterable={false} placement="top" content="绑定">
                <span
                  class="text-font-success cursor-pointer hover-opacity"
                  on-click={() => this.showBindDialog("绑定", row)}
                >
                  绑定
                </span>
              </el-tooltip>
            </div>
          ) : (
            <div style="display:flex;justify-content:flex-start;">
              <el-tooltip enterable={false} placement="top" content="解除绑定">
                <span
                  class="text-font-danger cursor-pointer hover-opacity"
                  on-click={() => this.deleteAccess(row)}
                >
                  解绑
                </span>
              </el-tooltip>
              <el-tooltip enterable={false} placement="top" content="解除绑定">
                <span
                  class="m-l-6 text-font-danger cursor-pointer hover-opacity"
                  on-click={() => this.showBindDialog("换绑", row)}
                >
                  换绑
                </span>
              </el-tooltip>
            </div>
          )
      },
      {
        prop: "platformCooperatorName",
        label: "平台用户名",
        width: CELL_WIDTH.name
      },
      {
        prop: "status",
        label: "绑定状态",
        width: CELL_WIDTH.code,
        render: (_value: any, row: any) => {
          return row.status == "unbind" ? <div>未绑定</div> : <div>已绑定</div>;
        }
      },
      {
        prop: "number",
        label: "ERP往来单位编码",
        width: CELL_WIDTH.companyName
      },
      {
        prop: "cooperatorName",
        label: "ERP往来单位名称",
        width: CELL_WIDTH.companyName
      },
      {
        prop: "contactsName",
        label: "联系人",
        width: CELL_WIDTH.accountName
      },
      {
        prop: "contactsPhone",
        label: "联系电话",
        width: 160
      },
      {
        prop: "updatedByName",
        label: "绑定人",
        width: CELL_WIDTH.accountName
      },
      {
        prop: "updatedAt",
        label: "绑定日期",
        width: 140
      }
    ];
  }
  get companies() {
    return store.allCompanies();
  }
  @Watch("table.selectAll")
  selectAllChange(value: boolean) {
    this.table.selections = value ? [].slice.apply(this.table.data) : [];
  }
  @Watch("table.selections")
  selectionsChange() {
    this.table.notBindUsers = this.table.selections.filter(
      s => s.status == "unbind"
    );
    this.table.bindedUsers = this.table.selections.filter(
      s => s.status == "bind"
    );
  }
  @Watch("bindDialog.visible")
  dialogShowHandle(visible: boolean) {
    setTimeout(() => {
      if (visible) {
        lastKeyscope = hotkeys.getScope();
        topHotkeys.bindHotkeys(
          (this.$refs.bindDialog as Vue).$el as HTMLElement
        );
      } else {
        topHotkeys.unbindHotkeys(
          (this.$refs.bindDialog as Vue).$el as HTMLElement
        );
        hotkeys.setScope(lastKeyscope);
      }
    }, 30);
  }
  mounted() {
    const hasCooperatorPerm = this.hasPerm("transaction.platforms.cooperator");
    if (hasCooperatorPerm) {
      this.loadData();
    }
  }
  toSearch() {
    this.loadData();
  }
  toReset() {
    this.searchForm = { ...defaultSearchForm };
  }
  async toBind() {
    const bindData = {
      platformCooperatorIds:
        this.title === "绑定"
          ? this.table.notBindUsers.map(notbind => notbind.platformCooperatorId)
          : this.table.bindedUsers.map(binded => binded.platformCooperatorId),

      localCooperatorId: Number(this.bindCompany)
    };
    this.title === "绑定"
      ? await RequestQQ.bindCoop(bindData)
      : await RequestQQ.changeBind(bindData);
    this.bindDialog.visible = false;
    this.$message.success(`${this.title}成功`);
    this.loadData();
  }
  formDataChange(date: Date[]) {
    this.searchForm.fromDate = date ? dateFormat(date[0]) : "";
    this.searchForm.toDate = date ? dateFormat(date[1]) : "";
  }
  showBindDialog(title: "绑定" | "换绑", row?: rowsDataType[0]) {
    this.title = title;
    if (row) {
      this.table.selections = [];
      title === "绑定"
        ? (this.table.notBindUsers = [row])
        : (this.table.bindedUsers = [row]);
    }
    if (row) {
      this.bindCompany = row.cooperatorId;
    }
    this.bindDialog.visible = true;
  }
  async loadData(page = 1, pageSize = 20) {
    this.table.selectAll = false;
    if (pageSize) this.searchForm.pageSize = pageSize;
    this.table.loading = true;
    const searchData = { ...this.searchForm };
    delete searchData.date;
    const res = await RequestQQ.getCoopsList(
      Object.assign(searchData, { page })
    ).finally(() => (this.table.loading = false));
    this.table.data = res.rows || [];
    this.page.current = page;
    this.page.total = res.totalSize;
  }
  deleteAccess(row?: rowsDataType[0]) {
    const h = this.$createElement;
    const getName = (arr: rowsDataType) => {
      let name = "";
      arr.forEach(a => {
        name += `【${a.cooperatorName}】,`;
      });
      name = name.slice(0, -1);
      return name;
    };
    const users = row
      ? `【${row.cooperatorName}】`
      : getName(this.table.bindedUsers);
    this.$msgbox({
      title: "提示",
      type: "warning",
      showCancelButton: true,
      showClose: false,
      cancelButtonText: "取消(Esc)",
      confirmButtonText: "确定(F3)",
      message: h("div", undefined, [
        h("div", undefined, `你确定要解除以下员工的绑定吗？`),
        h("div", { class: "font-line-2 m-tb-8" }, users),
        h(
          "div",
          {
            style:
              "color:rgba(127, 127, 127, 0.647);font-size:12px;margin-top:6px"
          },
          "解除后对应的员工将不能再使用思锐的价格库存进行报价！"
        )
      ]),
      beforeClose: async (action, instance, done) => {
        if (action === "confirm") {
          const el = document.querySelector(
            ".el-message-box__wrapper"
          ) as HTMLElement;
          topHotkeys.unbindHotkeys(el);
          hotkeys.setScope(lastKeyscope);
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = "请稍候...";
          await RequestQQ.delBind({
            platformCooperatorId: this.table.bindedUsers.map(
              b => b.platformCooperatorId
            )
          });
          instance.confirmButtonLoading = false;
          done();
          this.$message.success("解绑成功");
          this.loadData();
        } else {
          instance.confirmButtonLoading = false;
          done();
        }
      }
    }).catch(() => {});
    this.$nextTick(() => {
      lastKeyscope = hotkeys.getScope();
      const el = document.querySelector(
        ".el-message-box__wrapper"
      ) as HTMLElement;
      topHotkeys.bindHotkeys(el);
    });
  }
  render() {
    return (
      <div class="bindAdmin p-a-12 container-box">
        <el-row class="height-full">
          <el-col span={24} class="height-full">
            <ht-card
              title="客户关系管理"
              class="height-full"
              /* tips="员工授权绑定步骤：<br />1、在此处找到需要授权的员工，点击操作列的【获取授权码】，弹出员工授权码弹框，在弹框中复制员工授权码；<br />2、将复制出来的员工授权码发送给对应的员工；<br />3、员工使用QQ号登录【腾讯企点】进入企鹅汽配->个人中心的报价设置找到思锐软件点击【立即绑定】在绑定页中粘贴授权码，点击【确认绑定】完成绑定。<br />4、员工在企鹅汽配里面给客户报价时会按设定好的参数给客户进行报价" */
            >
              <el-form
                value={this.searchForm}
                label-width="75px"
                size="mini"
                class="m-t-8"
              >
                <el-row>
                  <el-col lg={4} sm={12}>
                    <el-form-item label="往来单位">
                      <ht-autoselect
                        value={this.searchForm.keyword}
                        on-change={(value: string) => {
                          this.searchForm.keyword = value;
                        }}
                        fetch-suggestions={this.getAllCustomerCooperatorsByName}
                        remote
                        size="mini"
                        trigger-on-focus={false}
                        placeholder="往来单位"
                        clearable
                        highlight-first-item
                        filter-zero
                      />
                    </el-form-item>
                  </el-col>
                  <el-col lg={5} sm={12}>
                    <el-form-item label="平台用户名" label-width="120px">
                      <el-input
                        size="mini"
                        value={this.searchForm.platformCooperatorName}
                        on-input={(value: string) =>
                          (this.searchForm.platformCooperatorName = value)
                        }
                        clearable
                        placeholder="平台用户名"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col lg={4} sm={24}>
                    <el-form-item label="绑定状态">
                      <el-select
                        size="mini"
                        value={this.searchForm.status}
                        on-change={(value: string) =>
                          (this.searchForm.status = value)
                        }
                        clearable
                      >
                        <el-option label="未绑定" value="unbind" />
                        <el-option label="已绑定" value="bind" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col lg={10} sm={24}>
                    <el-row>
                      <el-col lg={16} xs={24}>
                        <el-form-item label="绑定日期">
                          <el-date-picker
                            size="mini"
                            v-model={this.searchForm.date}
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            on-change={this.formDataChange}
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col lg={8} xs={24} class="p-l-6 flex m-b-12">
                        <el-button
                          type="primary"
                          size="mini"
                          on-click={this.toSearch}
                        >
                          查询（F5）
                        </el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          on-click={this.toReset}
                        >
                          重置（F6）
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form>
              <ht-setting-table
                style="height:calc(100vh - 290px)"
                selectionType="multiple"
                v-loading={this.table.loading}
                // pagination
                // total={this.page.totalSize}
                // current-page={this.page.current}
                // onPageChange={this.loadData}
                selected-rows={this.table.selections}
                on={{
                  "update:selectedRows": (val: rowsDataType) =>
                    (this.table.selections = val)
                }}
                data={this.table.data}
                columns={this.tableColumns}
                table-name={this.table.name}
              />
              <div class="flex flex-row-center m-t-6">
                <el-checkbox
                  label={
                    this.table.selectAll
                      ? "反选当前查询结果"
                      : "全选当前查询结果"
                  }
                  value={this.table.selectAll}
                  on-change={(value: boolean) => (this.table.selectAll = value)}
                />
                |
                <span class="m-l-6 text-center" style="width:80px;">
                  已选中{this.table.selections.length}条
                </span>
                ｜ 批量操作
                <div class="flex m-l-6">
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={() => this.showBindDialog("绑定")}
                    disabled={!this.table.notBindUsers.length}
                  >
                    绑定(F2)
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={() => this.showBindDialog("换绑")}
                    disabled={!this.table.bindedUsers.length}
                  >
                    换绑(F3)
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    disabled={!this.table.bindedUsers.length}
                    on-click={() => {
                      this.deleteAccess();
                    }}
                  >
                    解除绑定(F4)
                  </el-button>
                </div>
              </div>
            </ht-card>
          </el-col>
        </el-row>
        <ht-dialog
          ref="bindDialog"
          visible={this.bindDialog.visible}
          width="400px"
          top="20vh"
          class="edit-swap-group-parts ignore-top-hotkeys"
          on={{
            "update:visible": (value: boolean) =>
              (this.bindDialog.visible = value)
          }}
          title={this.title}
          append-to-body
        >
          <div class="dialog-content p-lr-8">
            <el-form>
              <el-form-item label="往来单位名称" label-width="90px">
                <ht-autoselect
                  value={this.bindCompany}
                  on-change={(value: string) => {
                    this.bindCompany = value;
                  }}
                  size="mini"
                  fetch-suggestions={this.getAllCustomerCooperators}
                  trigger-on-focus={false}
                  placeholder="往来单位名称"
                  remote
                  highlight-first-item
                  filter-zero
                />
              </el-form-item>
              <div class="flex flex-center m-t-24 m-b-10">
                <el-button
                  size="mini"
                  on-click={() => {
                    this.bindDialog.visible = false;
                  }}
                >
                  取消(Esc)
                </el-button>
                <el-button type="primary" size="mini" on-click={this.toBind}>
                  确定(F3)
                </el-button>
              </div>
            </el-form>
          </div>
        </ht-dialog>
      </div>
    );
  }
}
</script>

<style scoped lang="scss">
.bindAdmin {
  ::v-deep .el-checkbox {
    margin-right: 5px;
  }
  &::v-deep .el-date-editor .el-range-separator {
    padding: 0;
  }
}
</style>
