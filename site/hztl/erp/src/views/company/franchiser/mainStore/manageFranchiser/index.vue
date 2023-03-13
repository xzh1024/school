<script>
import ResizeBox from "@/components/resizeBox";
import FranchisersList from "./franchisersList";
import FranchisersPartsList from "./franchisersPartsList";

export default {
  name: "ManageFranchiser",
  components: {
    ResizeBox,
    FranchisersList,
    FranchisersPartsList
  },
  data() {
    return {
      subCompanyId: 0
    };
  },
  methods: {
    handleRowChange(rows) {
      if (rows.length) {
        this.subCompanyId = rows[0].subCompanyId;
      } else {
        this.subCompanyId = 0;
      }
    },
    refreshLists() {
      this.$refs.refFranchisersPartsList &&
        this.$refs.refFranchisersPartsList.loadData();
      this.$refs.refFranchisersList && this.$refs.refFranchisersList.loadData();
    }
  },

  render() {
    return (
      <resize-box default-len={242} is-column>
        <FranchisersList
          slot="block1"
          ref="refFranchisersList"
          on-row-change={this.handleRowChange}
          on-authoriz={this.refreshLists}
        />
        <FranchisersPartsList
          slot="block2"
          ref="refFranchisersPartsList"
          subCompanyId={this.subCompanyId}
        />
      </resize-box>
    );
  }
};
</script>
