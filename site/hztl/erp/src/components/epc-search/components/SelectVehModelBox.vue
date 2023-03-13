<script>
export default {
  name: "SelectVehModelBox",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    vehModelData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      totalList: [],
      list: [],
      tableName: "epcSearchVehModelsList",
      options: []
    };
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    },
    tableTitle() {
      return (
        this.vehModelData &&
        `${this.vehModelData.brand}（${this.vehModelData.subBrand}）`
      );
    },
    canSure() {
      return this.list.some(item => item.isActived);
    }
  },
  watch: {
    vehModelData() {
      this.initData();
    }
  },
  methods: {
    initData() {
      this.options = [];
      const keys = Object.keys(this.vehModelData.heterogeneityOption) || [];
      if (keys && keys.length) {
        keys.forEach(item => {
          this.options.push({
            ...this.vehModelData.heterogeneityOption[item],
            option:
              this.vehModelData.heterogeneityOption[item] &&
              this.vehModelData.heterogeneityOption[item].option &&
              this.vehModelData.heterogeneityOption[item].option.length
                ? this.vehModelData.heterogeneityOption[item].option.map(
                    (item2, index) => ({
                      value: item2,
                      isActived: false,
                      id: index + 1
                    })
                  )
                : [],
            key: item
          });
        });
      }
      if (
        this.vehModelData &&
        this.vehModelData.salesVehicle &&
        this.vehModelData.salesVehicle.length
      ) {
        this.totalList = this.vehModelData.salesVehicle || [];
        this.list =
          this.totalList && this.totalList.length
            ? this.totalList.map((item, index) => ({
                ...item,
                isActived: index === 0
              }))
            : [];
      }
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canSure) {
        return;
      }
      const obj = this.list.find(item => item.isActived);
      if (obj) {
        this.$emit("sure", obj);
        this.cancelHandle();
      }
    },
    cancelHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.relVisible = false;
    },
    handleItemClick(vehModel, e) {
      if (e) {
        e.stopPropagation();
      }
      if (vehModel.isActived) {
        return;
      }
      this.list = this.list.map(item => ({
        ...item,
        isActived: item.mjsid === vehModel.mjsid
      }));
    },
    selectHandle(item, item2, e) {
      if (e) {
        e.stopPropagation();
      }
      item2.isActived = !item2.isActived;
      item.option = item.option.map(item3 => ({
        ...item3,
        isActived: item2.isActived ? item2.id === item3.id : false
      }));
      item[item.key] = item2.isActived ? item2.value : undefined;
      this.filterList();
    },
    filterList() {
      this.list = this.totalList
        .filter(item =>
          this.options.every(
            item2 =>
              item2[item2.key] === item[item2.key] ||
              item2[item2.key] === undefined
          )
        )
        .map((item, index) => ({
          ...item,
          isActived: index === 0
        }));
    }
  },

  render() {
    return (
      <ht-dialog
        title="车款（差异项）选择"
        visible={this.relVisible}
        on-close={this.cancelHandle}
        append-to-body
        width="700px"
      >
        <el-row gutter={10}>
          <el-col span={12}>
            <ht-card
              title="选择配置信息可缩小车型锁定范围"
              no-padding
              no-background
            >
              <div class="option-container">
                {this.options.map(item => (
                  <div>
                    <div class="option-title">{item.name}</div>
                    {item.option.length &&
                      item.option.map(item2 =>
                        item2 && item2.value ? (
                          <span
                            class={
                              item2.isActived
                                ? "option-content option-content-active"
                                : "option-content"
                            }
                            on-click={e => this.selectHandle(item, item2, e)}
                          >
                            {item2.value}
                          </span>
                        ) : null
                      )}
                  </div>
                ))}
              </div>
            </ht-card>
          </el-col>
          <el-col span={12}>
            <ht-card title={this.tableTitle} no-padding no-background>
              <div class="list-container">
                {this.list.map(item => (
                  <div
                    class={
                      item.isActived
                        ? "list-item text-font-primary background-primary"
                        : "list-item"
                    }
                    on-click={e => this.handleItemClick(item, e)}
                  >
                    {item.salesName}
                  </div>
                ))}
              </div>
            </ht-card>
          </el-col>
        </el-row>
        <div style="text-align: center;">
          <el-button
            disabled={!this.canSure}
            size="mini"
            type="primary"
            plain
            on-click={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            on-click={e => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.option-container {
  margin: 0 10px;
  padding-bottom: 10px;
  height: 450px;
  overflow-y: auto;
  margin-top: 10px;

  .option-title {
    font-size: 16px;
  }

  .option-content {
    display: inline-block;
    margin: 10px;
    padding: 0 15px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    color: #409eff;
    background: #409eff1a;
    font-size: 12px;
    cursor: pointer;
  }

  .option-content-active {
    color: #ffffff;
    background: #409eff;
  }
}
.list-container {
  height: 450px;
  overflow-y: auto;
  border: solid 1px #dcdfe6;
  border-radius: 0;

  .list-item {
    padding: 5px 10px;
    cursor: pointer;
    border-bottom: solid 1px #dcdfe6;
  }
}
</style>
