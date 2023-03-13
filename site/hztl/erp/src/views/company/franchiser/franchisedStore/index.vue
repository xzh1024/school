<script>
import JoinRecordsList from "./joinRecordsList";
import AuthorizedPartsList from "./authorizedPartsList";

export default {
  name: "FranchisedStore",
  components: {
    JoinRecordsList,
    AuthorizedPartsList
  },
  data() {
    return {
      mainCompanys: []
    };
  },

  render() {
    return (
      <el-row style="height: 100%;">
        <el-col span={8} style="height: 100%;">
          <JoinRecordsList
            style="margin: 5px 0 0 5px;height: calc(100% - 5px);"
            on-main-companys-change={val => (this.mainCompanys = val)}
          />
        </el-col>
        <el-col span={16} style="height: 100%;">
          <AuthorizedPartsList
            style="height: 100%;"
            mainCompanys={this.mainCompanys}
          />
        </el-col>
      </el-row>
    );
  }
};
</script>
