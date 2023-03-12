<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import { LogItem, SYSTEM_RESET_DATA_LOG_TABLE } from "./constants";
import { getSettingsResetLogList } from "./services";

@Component
export default class LogTable extends Vue {
  private loading = false;
  private tableName = SYSTEM_RESET_DATA_LOG_TABLE.name;
  private tableColumns = SYSTEM_RESET_DATA_LOG_TABLE.columns;
  private tableData: LogItem[] = [];

  public loadData() {
    this.loading = true;
    getSettingsResetLogList()
      .then(res => {
        this.tableData = res.rows || [];
      })
      .finally(() => {
        this.loading = false;
      });
  }

  mounted() {
    this.loadData();
  }

  render() {
    return (
      <ht-setting-table
        loading={this.loading}
        tableName={this.tableName}
        columns={this.tableColumns}
        data={this.tableData}
      />
    );
  }
}
</script>
