<script>
import { EPC_VEH_MODELS_BOX_TABLE } from "./constants";
import { getPartVehModelsDwg } from "@/api/parts";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import hotkeys from "hotkeys-js";

let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  name: "EpcVehModelsBox",
  props: {
    visible: Boolean,
    code: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableName: EPC_VEH_MODELS_BOX_TABLE.name,
      tableColumns: EPC_VEH_MODELS_BOX_TABLE.columns,
      selectedRows: []
    };
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.loadData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
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
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      getPartVehModelsDwg({
        code: this.code,
        type: this.type
      })
        .then(res => {
          this.tableData = res || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },

  render() {
    return (
      <ht-dialog
        title={`「${this.code}」EPC适用车型`}
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        width="1200px"
        class="ignore-top-hotkeys"
      >
        <ht-setting-table
          v-loading={this.loading}
          data={this.tableData}
          columns={this.tableColumns}
          tableName={this.tableName}
          selectedRows={this.selectedRows}
          on={{
            "update:visible": val => (this.selectedRows = val)
          }}
          style="height: 500px;"
        />
      </ht-dialog>
    );
  }
};
</script>
