<template>
  <el-dialog
    class="brand-dialog"
    title="主营车型品牌"
    :visible.sync="visible"
    width="624px"
    @close="close"
  >
    <div class="">已选汽车品牌：</div>
    <div class="brand-check-list">
      <el-tag
        v-for="(brand, brandIndex) in brandCheckNames"
        :key="brand"
        effect="plain"
        size="mini"
        closable
        :disable-transitions="false"
        @close="handleCloseBrand(brandIndex)"
      >
        {{ brand }}
      </el-tag>
    </div>

    <div class="dark-container">
      <div>地区：</div>
      <div class="dark-list">
        <el-tag
          v-for="(area, areaIndex) in areas"
          :key="area.category"
          @click="changeArea(area, areaIndex)"
          size="mini"
          :effect="area.effect"
        >
          {{ area.category }}
        </el-tag>
      </div>
    </div>

    <div class="brand-container">
      <div>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
          >全选当前品牌：</el-checkbox
        >
      </div>
      <div class="brand-list">
        <el-checkbox-group
          v-model="brandCheckNames"
          size="small"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox-button
            size="mini"
            v-for="brandName in nowBrandNames"
            :key="brandName"
            :label="brandName"
          ></el-checkbox-button>
        </el-checkbox-group>
      </div>
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

interface AreaModel {
  category: string;
  effect: string;
}

@Component({
  name: "BrandDialog"
})
export default class BrandDialog extends Vue {
  protected visible = false;
  protected isChecked = false;
  protected checkAll = false;
  protected brandCheckNames: string[] = [];
  protected areas: AreaModel[] = [];

  protected nowBrandNames: string[] = [];
  protected categoryBrandList: BrandModel[] = [];

  public show(vehBrands: string[]) {
    this.getBrands();
    this.brandCheckNames = [...vehBrands];
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  public confirm() {
    this.$emit("updateVehBrands", this.brandCheckNames);
    this.hide();
  }

  protected handleChecked() {
    if (this.isChecked) {
      this.clearAllBrand();
    } else {
      this.selectAllBrand();
    }
  }

  @Watch("areas", { immediate: true, deep: true })
  protected changeAreas() {
    this.handleCheckedCitiesChange(this.brandCheckNames);
  }

  handleCheckAllChange(val: boolean) {
    if (val) {
      this.selectAllBrand();
    } else {
      this.clearAllBrand();
    }
  }
  handleCheckedCitiesChange(value: string[]) {
    const checkedCount = value.length;
    this.checkAll = !this.nowBrandNames.some(item => !value.includes(item));
  }

  protected selectAllBrand() {
    const nowBrandNames = [...this.nowBrandNames];
    const brandCheckNames = [...this.brandCheckNames];
    nowBrandNames.forEach((brandName: string) => {
      const result = brandCheckNames.includes(brandName);
      if (!result) {
        brandCheckNames.push(brandName);
      }
    });
    this.brandCheckNames = brandCheckNames;
  }
  protected clearAllBrand() {
    const nowBrandNames = [...this.nowBrandNames];
    const brandCheckNames = new Set([...this.brandCheckNames]);
    this.nowBrandNames.forEach((brandName: string) => {
      const result = brandCheckNames.has(brandName);
      if (result) {
        brandCheckNames.delete(brandName);
      }
    });
    this.brandCheckNames = [...brandCheckNames];
  }

  protected changeArea(area: AreaModel, index: number) {
    const areas = this.areas;
    if (areas[index] && areas[index].effect === "dark") {
      return;
    }
    areas.forEach((item: AreaModel) => {
      item.effect = "plain";
    });
    area.effect = "dark";

    this.categoryBrandList.some((item: BrandModel) => {
      const result = item.category === area.category;
      if (result) {
        this.nowBrandNames = item.scopes.map(scope => scope.name);
      }
      return result;
    });
  }

  protected getBrands() {
    basicsService.getBrands().then((resp: BrandModel[]) => {
      this.categoryBrandList = resp || [];
      this.areas = this.categoryBrandList.map(
        (item: BrandModel, index: number) => {
          let effect = "plain";
          if (index === 0) {
            this.nowBrandNames = item.scopes.map(scope => scope.name);
            effect = "dark";
          }
          return {
            category: item.category,
            effect
          };
        }
      );
    });
  }

  private close() {
    this.categoryBrandList = [];
  }

  handleCloseBrand(brandIndex: number) {
    this.brandCheckNames.splice(brandIndex, 1);
    this.handleCheckedCitiesChange(this.brandCheckNames);
  }
}
</script>

<style lang="scss" scoped>
.brand-dialog {
  .brand-check-list {
    height: 200px;
    overflow-y: auto;
    padding: 0 8px 8px 0;
    border: 1px solid #f4f4f4;
    border-radius: 4px;
    .el-tag {
      margin-top: 8px;
      margin-left: 8px;
    }
  }
  .dark-container {
    margin-top: 20px;
    .dark-list {
      height: 60px;
      overflow-y: auto;
      .el-tag {
        margin-right: 3px;
        cursor: pointer;
      }
      .el-tag--plain {
        border-color: transparent;
      }
    }
  }
  .brand-container {
    margin-top: 20px;
    .brand-list {
      height: 98px;
      overflow-y: auto;
      ::v-deep .el-checkbox-group {
        .el-checkbox-button--small {
          margin-top: 8px;
          margin-right: 8px;
          // cursor: pointer;
          .el-checkbox-button__inner {
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            padding: 4px 10px;
          }
        }
        .el-checkbox-button.is-checked {
          .el-checkbox-button__inner {
            border-color: #409eff;
            box-shadow: none;
          }
        }
      }
    }
  }
}
</style>
