<template>
  <el-dialog
    class="area-dialog"
    title="发货地区"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="400px"
    @closed="closed"
  >
    <div class="area-body">
      <el-tree
        :data="areas"
        show-checkbox
        node-key="id"
        ref="areaTree"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="hide">
        取 消
      </el-button>
      <el-button type="primary" size="mini" @click="submit">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit } from "vue-property-decorator";
import { AreaModel } from "@/common/interface/baseInterface";
import { BasicsService } from "@/common/services/basicsService";
const basicsService = new BasicsService();
import { Tree } from "element-ui";

@Component({
  name: "AreadDialog"
})
export default class AreadDialog extends Vue {
  protected filterAreas: AreaModel[] = [];
  @Emit("updateAreas")
  protected updateAreas() {
    return this.filterAreas;
  }
  protected visible = false;

  protected areas: AreaModel[] = [];
  protected checkedNodes: AreaModel[] = [];

  protected defaultProps = {
    children: "children",
    label: "name"
  };
  protected checkedKeys: any = [];

  protected setAreaTreeNodeType(tree: AreaModel[], parent?: AreaModel) {
    tree.forEach((item: AreaModel) => {
      if (!parent) {
        item.type = "Province";
        item.cascadeName = item.name;
      } else if (item.children) {
        item.type = "City";
        item.cascadeName = `${parent.cascadeName}/${item.name}`;
      } else {
        item.type = "County";
        item.cascadeName = `${parent.cascadeName}/${item.name}`;
      }
      if (item.children) {
        this.setAreaTreeNodeType(item.children, item);
      }
    });
  }
  protected filterAreaTreeNode(tree: AreaModel[]) {
    let tempFlat: AreaModel[] = [];
    if (!tree) return tempFlat;
    const checkedNodes = this.checkedNodes;
    tree.forEach((item: AreaModel) => {
      const result = checkedNodes.some(node => {
        if (item.id === node.id) {
          tempFlat.push({
            id: item.id,
            name: item.name,
            type: item.type,
            cascadeName: item.cascadeName
          });
          return true;
        } else {
          return false;
        }
      });
      if (!result) {
        const flat = this.filterAreaTreeNode(item.children as AreaModel[]);
        tempFlat = tempFlat.concat(flat);
      }
    });
    return tempFlat;
  }

  public show(data: AreaModel[]) {
    const list = data.map(item => item.id);
    this.checkedKeys = list;
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  private closed() {
    this.checkedKeys = [];
  }

  protected getAreas() {
    basicsService.getAreas().then((res: AreaModel[]) => {
      const tree = res || [];
      this.setAreaTreeNodeType(tree);
      this.areas = tree;
    });
  }

  protected handleNodeClick(data: any) {
    console.log(data);
  }

  get refAreaTree(): Tree {
    return this.$refs.areaTree as Tree;
  }

  protected submit() {
    this.checkedNodes = this.refAreaTree.getCheckedNodes() as AreaModel[];
    this.filterAreas = this.filterAreaTreeNode(this.areas);
    this.updateAreas();
    this.hide();
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
