<template>
  <el-dialog
    class="area-dialog"
    title="发货地区"
    :visible.sync="visible"
    width="624px"
    @close="close"
  >
    <div class="area-body">
      <el-tree
        :data="areas"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expandedAreas"
        :default-checked-keys="checkedAreas"
        :props="defaultProps"
        @check="handleCheck"
        @check-change="handleCheckChange"
        @node-click="handleNodeClick"
      >
      </el-tree>

      <span class="ddd"></span>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="hide">
        取 消
      </el-button>
      <el-button type="primary" size="mini" @click="confirm">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ScopeModel, BrandModel } from "@/common/interface/baseInterface";
import { BasicsService } from "@/common/services/basicsService";
const basicsService = new BasicsService();

@Component({
  name: "AreadDialog"
})
export default class AreadDialog extends Vue {
  protected visible = false;

  protected areas = [];
  protected defaultProps = {
    children: "children",
    label: "name"
  };

  protected expandedAreas = []; 
  protected checkedAreas = []; 

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  private close() {
    console.log(this.visible);
  }

  protected confirm() {
    console.log("提交");
  }

  protected getAreas() {
    basicsService.getAreas().then(res => {
      console.log(res);
      this.areas = res || [];
    });
  }

  protected handleCheck(data: any, checked: any, indeterminate: any) {
    // console.log(data, checked, indeterminate);
  }

  protected handleCheckChange(data: any, checked: any, indeterminate: any) {
    console.log(data, checked, indeterminate);
  }

  protected handleNodeClick(data: any) {
    console.log(data);
  }

  created() {
    this.getAreas();
  }
}
</script>

<style lang="scss" scoped>
.area-dialog {
  .area-body {
    height: 400px;
    overflow-y: auto;
  }
}
</style>
