<script lang="tsx">
import { Component, Watch, Vue, Mixins } from "vue-property-decorator";
import { CELL_WIDTH } from "@/constants";
import * as store from "@/utils/store";
import { searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import hotkeys from "hotkeys-js";
import RequestQQ, { GetUserListRequest, GetUserListResult } from "@/api/qq";
type rowsDataType = GetUserListResult["Rows"];
const defaultSearchForm: GetUserListRequest = {
  staffName: "",
  staffNumber: "",
  status: "",
  departmentName: "",
  page: 1,
  pageSize: 20
};
const defaultBaseSetting = {
  warehouseId: [632],
  newUserPriceType: [],
  isAutoPrice: true,
  isAutoPriceZero: false,
  isAutoPriceQtyZero: false,
  isAutoPriceNewUser: false
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
  public baseSetting = { ...defaultBaseSetting };
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
    notBindUsers: (rowsDataType[0] & { code?: string })[];
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
  private dialog = {
    loading: true,
    visible: false
  };
  private clipboardObj: any;
  private getCooperatorsOptionsloading = false;
  private cooperatorsOptions = [];
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
        width: 120,
        cantExport: true,
        render: (_value: any, row: rowsDataType[0]) =>
          row.status == "unbind" ? (
            <div style="display:flex;justify-content:flex-start;">
              <el-tooltip
                enterable={false}
                placement="top"
                content="获取授权码"
              >
                <span
                  class="text-font-success cursor-pointer hover-opacity"
                  on-click={() => this.getSelectionCode(row)}
                >
                  获取授权码
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
                  解除绑定
                </span>
              </el-tooltip>
            </div>
          )
      },
      {
        prop: "status",
        label: "绑定状态",
        width: CELL_WIDTH.code,
        render: (_value: any, row: rowsDataType[0]) => {
          return row.status == "unbind" ? <div>未绑定</div> : <div>已绑定</div>;
        }
      },
      {
        prop: "staffNumber",
        label: "员工编号",
        width: CELL_WIDTH.no
      },
      { prop: "staffName", label: "员工姓名", width: CELL_WIDTH.name },
      {
        prop: "departmentName",
        label: "所属部门",
        width: CELL_WIDTH.companyName
      },
      {
        prop: "phone",
        label: "联系电话",
        width: 160
      },
      {
        prop: "joinedAt",
        label: "入职日期",
        width: 140
      }
    ];
  }
  get wareHouse() {
    return store.administerWareHouse();
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
  @Watch("dialog.visible")
  dialogShowHandle(visible: boolean) {
    setTimeout(() => {
      if (visible) {
        lastKeyscope = hotkeys.getScope();
        topHotkeys.bindHotkeys((this.$refs.dialog as Vue).$el as HTMLElement);
      } else {
        topHotkeys.unbindHotkeys((this.$refs.dialog as Vue).$el as HTMLElement);
        hotkeys.setScope(lastKeyscope);
      }
    }, 30);
  }
  mounted() {
    const hasAuthPerm = this.hasPerm("transaction.platforms.author");
    if (hasAuthPerm) {
      this.initState();
    }
  }
  initState() {
    this.loadData();
  }
  toReset() {
    this.searchForm = { ...defaultSearchForm };
    this.loadData();
  }
  async toCopy(name: string, copyText: string) {
    await navigator.clipboard.writeText(
      `员工姓名：${name} \n授权码：${copyText}`
    );
    this.$message.success("复制成功");
  }
  async toCopyAll() {
    let copyText = "";
    this.table.notBindUsers.forEach(data => {
      copyText += `员工姓名：${data.staffName} \n授权码：${data.code}\n`;
    });
    await navigator.clipboard.writeText(copyText);
    this.$message.success("全部复制成功");
  }
  async loadData(page = 1, pageSize?: number) {
    this.table.selectAll = false;
    if (pageSize) this.searchForm.pageSize = pageSize;
    this.table.loading = true;
    const res = await RequestQQ.getUserList(
      Object.assign(this.searchForm, { page })
    ).finally(() => (this.table.loading = false));
    this.table.data = res.Rows || [];
    this.page.current = page;
    this.page.total = res.totalSize;
  }
  async getSelectionCode(row: rowsDataType[0]) {
    this.table.selections = [];
    this.table.notBindUsers = [row];
    this.dialog.visible = true;
    const res = await RequestQQ.getUserCodes({
      platformKey: "qeqp",
      staffIds: this.table.notBindUsers.map(s => s.StaffId)
    });
    this.table.notBindUsers.forEach(user => {
      res.rows.forEach(r => {
        if (user.StaffId === r.staffId) {
          user.code = r.licenseCode;
        }
      });
    });
    this.$forceUpdate();
  }
  async getSelectionsCode() {
    this.dialog.visible = true;
    const res = await RequestQQ.getUserCodes({
      platformKey: "qeqp",
      staffIds: this.table.notBindUsers.map(s => s.StaffId)
    });
    this.table.notBindUsers.forEach(user => {
      res.rows.forEach(r => {
        if (user.StaffId === r.staffId) {
          user.code = r.licenseCode;
        }
      });
    });
    this.$forceUpdate();
  }
  deleteAccess(row?: rowsDataType[0]) {
    if (row) {
      this.table.selections = [];
      this.table.bindedUsers = [row];
    }
    const h = this.$createElement;
    const getName = (arr: rowsDataType) => {
      let name = "";
      arr.forEach(a => {
        name += `【${a.staffName}】,`;
      });
      name = name.slice(0, -1);
      return name;
    };
    const users = row
      ? `【${row.staffName}】`
      : getName(this.table.bindedUsers);
    const staffIds = row
      ? [row.StaffId]
      : this.table.bindedUsers.map(item => item.StaffId);
    this.$msgbox({
      title: "提示",
      type: "warning",
      showCancelButton: true,
      showClose: false,
      cancelButtonText: "取消（Esc）",
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
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = "请稍候...";
          const res = await RequestQQ.delUserBind({
            staffIds,
            platformKey: "qeqp"
          }).finally(done);
          if (res) {
            instance.confirmButtonLoading = false;
            this.$message.success("解除成功");
            this.loadData();
          }
        } else {
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
      <div class="accessAdmin p-a-12 container-box">
        <el-row class="height-full">
          <el-col span={24} class="height-full">
            <ht-card
              title="员工授权"
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
                  <el-col lg={4} sm={12} xs={24}>
                    <el-form-item label="员工姓名">
                      <el-input
                        size="mini"
                        value={this.searchForm.staffName}
                        on-input={(value: string) =>
                          (this.searchForm.staffName = value)
                        }
                        clearable
                        placeholder="员工姓名"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col lg={4} sm={12} xs={24}>
                    <el-form-item label="员工编号">
                      <el-input
                        size="mini"
                        value={this.searchForm.staffNumber}
                        on-input={(value: string) =>
                          (this.searchForm.staffNumber = value)
                        }
                        clearable
                        placeholder="员工编号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col lg={6} sm={24} xs={24}>
                    <el-form-item label="所属部门">
                      <ht-autoselect
                        value={this.searchForm.departmentName}
                        on-change={(value: string) => {
                          this.searchForm.departmentName = value;
                        }}
                        fetch-suggestions={this.getAllDepartments}
                        size="mini"
                        remote
                        trigger-on-focus={false}
                        placeholder="所属部门"
                        highlight-first-item
                        filter-zero
                        clearable
                      />
                    </el-form-item>
                  </el-col>
                  <el-col lg={10} sm={24} xs={24}>
                    <el-row>
                      <el-col lg={10} sm={24} xs={24}>
                        <el-form-item label="绑定状态">
                          <el-select
                            size="mini"
                            value={this.searchForm.status}
                            on-change={(value: "unbind" | "bind") =>
                              (this.searchForm.status = value)
                            }
                            clearable
                          >
                            <el-option label="未绑定" value="unbind" />
                            <el-option label="已绑定" value="bind" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col lg={14} sm={24} xs={24} class="p-l-6 m-b-12">
                        <el-button
                          type="primary"
                          size="mini"
                          on-click={() => {
                            this.loadData();
                          }}
                        >
                          查询（F5）
                        </el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          on-click={() => {
                            this.toReset();
                          }}
                        >
                          重置（F6）
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form>
              <ht-setting-table
                selectionType="multiple"
                style="height:calc(100vh - 290px)"
                v-loading={this.table.loading}
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
                    on-click={this.getSelectionsCode}
                    disabled={!this.table.notBindUsers.length}
                  >
                    获取授权码(F2)
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    disabled={!this.table.bindedUsers.length}
                    on-click={() => {
                      this.deleteAccess();
                    }}
                  >
                    解除绑定(F3)
                  </el-button>
                </div>
                <div class="flex-space"></div>
                <el-pagination
                  on-size-change={(size: number) => {
                    this.loadData(1, size);
                  }}
                  on-current-change={this.loadData}
                  current-page={this.page.current}
                  page-sizes={[10, 20, 50, 100, 200]}
                  page-size={this.page.totalSize}
                  layout="total, sizes, prev, pager, next, jumper"
                  total={this.page.total}
                ></el-pagination>
              </div>
            </ht-card>
          </el-col>
        </el-row>
        <ht-dialog
          v-loading={this.dialog.loading}
          ref="dialog"
          visible={this.dialog.visible}
          width="500px"
          top="20vh"
          class="edit-swap-group-parts ignore-top-hotkeys"
          on={{
            "update:visible": (value: boolean) => (this.dialog.visible = value)
          }}
          title="员工授权码"
          append-to-body
        >
          <div class="dialog-content p-lr-10">
            <div>
              <span class="text-font-danger">*</span>
              以下授权码有效时间为24小时，如超过24小时请重新获取授权码授权
            </div>
            <div style="max-height: 300px;overflow-y: auto;padding-right:6px">
              {this.table.notBindUsers.map(userData => {
                return (
                  <div class="user-data">
                    <div class="flex m-t-12">
                      <div>员工姓名：</div>
                      <div>{userData.staffName}</div>
                    </div>
                    <div class="flex flex-row-center m-t-12">
                      <div style="width:75px">授权码：</div>
                      <div class="flex-space">
                        <el-input size="mini" value={userData.code} disabled />
                      </div>
                      <div>
                        <el-button
                          type="primary"
                          size="mini"
                          icon="el-icon-document-copy"
                          on-click={() => {
                            this.toCopy(
                              userData.staffName,
                              userData.code as string
                            );
                          }}
                        >
                          复制
                        </el-button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div class="flex flex-center m-t-16 m-b-10">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-document-copy"
                on-click={this.toCopyAll}
              >
                一键复制全部(F3)
              </el-button>
            </div>
          </div>
        </ht-dialog>
      </div>
    );
  }
}
</script>

<style scoped lang="scss">
.accessAdmin {
  ::v-deep .el-checkbox {
    margin-right: 5px;
  }
}
</style>
