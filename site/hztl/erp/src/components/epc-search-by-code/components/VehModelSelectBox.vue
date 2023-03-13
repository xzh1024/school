<script>
import EpcCanvas from "@/components/epc-search/components/EpcCanvas";
import { EPC_SEARCH_BY_CODE_DIALOG_VEH_MODEL_TABLE } from "../constants";

export default {
  name: "VehModelSelectBox",
  components: { EpcCanvas },
  props: {
    visible: Boolean,
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      tableName: EPC_SEARCH_BY_CODE_DIALOG_VEH_MODEL_TABLE.name,
      selectedRows: [],
      imgBoxVisible: false,
      imageUrl: "",
      isShowCanvas: false
    };
  },
  watch: {
    imgBoxVisible(val) {
      if (val) {
        this.isShowCanvas = true;
      } else {
        this.isShowCanvas = false;
        this.imageUrl = "";
      }
    }
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    tableColumns() {
      const showImgBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.imgBoxVisible = true;
        this.imageUrl = row.imageUrl;
      };
      return EPC_SEARCH_BY_CODE_DIALOG_VEH_MODEL_TABLE.columns.map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <span
                class="text-font-primary"
                style="cursor: pointer;"
                on-click={e => showImgBox(row, e)}
              >
                查看图片
              </span>
            )
          };
        }
        return item;
      });
    }
  },

  render() {
    return (
      <ht-dialog
        title="车型选择"
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        width="1200px"
        top="7vh"
      >
        <ht-setting-table
          data={this.tableData}
          columns={this.tableColumns}
          tableName={this.tableName}
          selectedRows={this.selectedRows}
          on={{
            selectChange: val => (this.selectedRows = val)
          }}
          style="height: 500px;"
        />

        <el-dialog
          visible={this.imgBoxVisible}
          on={{
            "update:visible": val => (this.imgBoxVisible = val)
          }}
          append-to-body
          show-close={false}
          class="ht-light-box"
          top="calc(1vh + 40px)"
        >
          <EpcCanvas
            v-show={this.imageUrl}
            url={this.imageUrl}
            isShowCanvas={this.isShowCanvas}
          />
          {!this.imageUrl ? <div class="err-tip">暂无装配图!</div> : ""}
        </el-dialog>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.ht-light-box {
  &::v-deep .el-dialog__body {
    height: calc(99vh - 50px);
    width: calc(99vh - 50px);
    .err-tip {
      font-size: 14px;
      height: 150px;
      line-height: 150px;
      width: 400px;
      text-align: center;
      background: #fff;
    }
  }
}
</style>
