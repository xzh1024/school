<script>
import {
  createPrintTem,
  deletePrintTem,
  loadPrintTems,
  setDefaultPrintTem,
  updatePrintTem
} from "@/api/print";
import { getUploads } from "@/api/common/qiniuToken";
import { base64toFile } from "@/utils/tool.ts";
import {
  BASE_FILES_LIST,
  DEFAULT_PRINT_TEMS,
  INVOICE_TYPE_EMUN
} from "../constants";
import { CELL_WIDTH } from "@/constants";

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      selectedRows: [],
      editTemData: {},
      baseFiles: {},
      temsList: [],
      tableName: "basePrintTemsList",
      columns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          label: "默认",
          prop: "isDefault",
          width: 50,
          render: (value, row) =>
            !row.canOperation ? null : (
              <el-checkbox
                value={row.isDefault}
                on-click={e => e.stopPropagation()}
                on-change={() => this.setDefaultTem(row.id)}
              />
            )
        },
        {
          label: "操作",
          prop: "controls",
          width: 100,
          type: "controls",
          cantExport: true,
          render: (_, row) => (
            <div>
              {row.cantModify ||
              !row.canOperation ||
              !this.hasAutoPerm("update") ? null : (
                <el-tooltip placement="top" content="编辑" enterable={false}>
                  <span
                    class="icon operation-icon icon-edit-info"
                    on-click={e => this.showEditDialog(row, e)}
                  ></span>
                </el-tooltip>
              )}
              &nbsp;
              <el-tooltip placement="top" content="拷贝" enterable={false}>
                <span
                  class="icon operation-icon reset-el-icon el-icon-document-copy"
                  on-click={e => this.copyTem(row, e)}
                ></span>
              </el-tooltip>
              &nbsp;
              {row.cantModify ||
              !row.canOperation ||
              !this.hasAutoPerm("delete") ? null : (
                <el-tooltip placement="top" content="删除" enterable={false}>
                  <span
                    class="icon operation-icon icon-delete-info"
                    on-click={e => this.removePrintTem(row.id, e)}
                  ></span>
                </el-tooltip>
              )}
            </div>
          )
        },
        {
          label: "模版名称",
          width: 100,
          prop: "name"
        },
        {
          label: "模版所属分公司",
          width: 150,
          prop: "companyName"
        }
      ]
    };
  },
  computed: {
    temData() {
      if (this.selectedRows.length) {
        return {
          ...this.selectedRows[0],
          content: this.selectedRows[0].content
        };
      } else {
        return {
          type: this.type
        };
      }
    }
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getBaseFiles(newVal);
          this.loadTemsList(newVal);
        }
      }
    }
  },
  methods: {
    getBaseFiles(type) {
      this.baseFiles = BASE_FILES_LIST.find(item => item.type == type) || {};
    },
    loadTemsList(type) {
      this.loading = true;
      loadPrintTems({ type })
        .then(res => {
          // 拼接内置数据，默认项如果不是后端存储数据则为本地内置数据
          const hasDefault = !!res.find(item => item.isDefault);
          const defaultTem = DEFAULT_PRINT_TEMS.find(
            item => item.type === type
          );
          this.temsList = [
            {
              ...defaultTem,
              isDefault: !hasDefault
            },
            ...res
          ];
          // console.log(this.temsList);
          // 设置默认选中项，默认从上次的选项中判断id，如果无，则选中默认项
          let selected;
          if (this.selectedRows.length) {
            selected = this.temsList.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          if (!selected) {
            selected = this.temsList.find(item => item.isDefault);
          }
          // console.log(selected);
          this.selectedRows = selected ? [selected] : [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlerSelectedChange(data) {
      this.selectedRows = data;
    },
    copyTem(data, e) {
      e.stopPropagation();
      this.showEditDialog({
        name: `${data.name}的复制`,
        type: data.type,
        content: data.content
      });
    },
    showEditDialog(data, e) {
      e && e.stopPropagation();
      // 传值且存在id为编辑，0为默认不能编辑，不传值为新增
      if (data && data.id === 0) {
        return;
      }
      this.editTemData = data
        ? {
            ...data,
            content: data.content
          }
        : {
            type: this.type
          };
      this.visible = true;
    },
    hideEditDialog() {
      this.visible = false;
    },
    async removePrintTem(id, e) {
      e.stopPropagation();
      await this.$confirm("此操作将永久删除该模版, 是否继续?");
      this.loading = true;
      await deletePrintTem(id)
        .then(() => {
          this.temsList = this.temsList.filter(item => item.id !== id);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setDefaultTem(id) {
      this.loading = true;
      setDefaultPrintTem(id, this.type)
        .then(() => {
          this.temsList.forEach(item => {
            item.isDefault = item.id === id;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleTemChange(data) {
      if (!data.name) {
        this.$message({
          message: "模版名不能为空！",
          type: "warning"
        });
        return;
      }
      if (
        this.temsList.find(
          item => item.name === data.name && item.id !== data.id
        )
      ) {
        this.$message({
          message: "模版名不能重复！",
          type: "warning"
        });
        return;
      }
      // const contentJson = JSON.parse(data.content);
      // if (contentJson.invoiceLogo && contentJson.invoiceLogo.images) {
      //   if (contentJson.invoiceLogo.images.length > 0) {
      //     contentJson.invoiceLogo.images.forEach(item => {
      //       if (item.type == "logo") {
      //         console.log(this.$store.state);
      //       }
      //     });
      //   }
      // }
      // 图片处理
      const remarks = data.content;
      const re = /"data:image.*?"/g;
      const matchArr = remarks.match(re);
      if (matchArr) {
        const files = [];
        matchArr.forEach(matchStr => {
          files.push(base64toFile(matchStr.substring(1, matchStr.length - 1)));
        });
        getUploads("erp", { file: files }).then(res => {
          if (res && res.length) {
            let index = 0;
            data.content = remarks.replace(re, () => `"${res[index++]}"`);
            if (data.id) {
              updatePrintTem({
                id: data.id,
                name: data.name,
                content: data.content
              }).then(() => {
                const curTem = this.temsList.find(item => item.id === data.id);
                curTem.name = data.name;
                curTem.content = data.content;
                this.loadTemsList(this.type);
                this.hideEditDialog();
              });
            } else {
              createPrintTem({
                type: data.type,
                name: data.name,
                content: data.content
              }).then(() => {
                this.loadTemsList(this.type);
                this.hideEditDialog();
              });
            }
          }
        });
      } else {
        if (data.id) {
          updatePrintTem({
            id: data.id,
            name: data.name,
            content: data.content
          }).then(() => {
            const curTem = this.temsList.find(item => item.id === data.id);
            curTem.name = data.name;
            curTem.content = data.content;
            this.hideEditDialog();
          });
        } else {
          createPrintTem({
            type: data.type,
            name: data.name,
            content: data.content
          }).then(() => {
            this.loadTemsList(this.type);
            this.hideEditDialog();
          });
        }
      }
    },
    isLabel() {
      return ["partLabel", "partLabelLate", "shippingLabel"].includes(
        this.type
      );
    },
    isShippingLabel() {
      return ["shippingLabel"].includes(this.type);
    }
  },
  render() {
    return (
      <div class="container-card flex-container column-flex">
        <div class="ht-page-title">{INVOICE_TYPE_EMUN[this.type]}打印模版</div>
        <div class="divider"></div>
        <div class="flex-container auto-block">
          <div class="tem-control auto-block" v-loading={this.loading}>
            <div class="tem-list-container">
              <ht-setting-table
                columns={this.columns}
                tableName={this.tableName}
                data={this.temsList}
                selectedRows={this.selectedRows}
                on-rowOperation={this.showEditDialog}
                on-selectChange={this.handlerSelectedChange}
              />
            </div>
            <div class="btn-group">
              <el-button
                on-click={() => this.showEditDialog()}
                disabled={!this.hasAutoPerm("create")}
                size="mini"
                type="primary"
              >
                新增模版
              </el-button>
            </div>
          </div>
          <div class="invoice-warp">
            <HtTemInvoice
              class="invoice-container"
              show-sample
              typeEmun={INVOICE_TYPE_EMUN}
              temData={this.temData}
              baseFiles={this.baseFiles}
              isLabel={this.isLabel()}
              isShippingLabel={this.isShippingLabel()}
            />
          </div>
        </div>
        <ht-dialog
          title="模版编辑器"
          width="1350px"
          visible={this.visible}
          on-close={this.hideEditDialog}
          close-on-click-modal={false}
        >
          <ht-custom-invoice
            style="height:65vh"
            typeEmun={INVOICE_TYPE_EMUN}
            temData={this.editTemData}
            baseFiles={this.baseFiles}
            on-template-change={this.handleTemChange}
            isLabel={this.isLabel()}
            isShippingLabel={this.isShippingLabel()}
          />
        </ht-dialog>
      </div>
    );
  }
};
</script>
<style lang="stylus" scoped>
.container-card {
    background: #fff;
    margin-left: 5px;

    .ht-page-title {
        margin: 5px;
    }

    .tem-control {
        width: 325px;

        .tem-list-container {
            height: calc(100% - 45px);
        }

        .btn-group {
            margin: 10px 0;
            text-align: center;
        }
    }
}

.invoice-warp {
    flex: none;
    background-color: #000;
    padding: 20px;
}
</style>
