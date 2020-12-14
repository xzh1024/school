<template>
  <el-dialog title="提示" :visible.sync="visible" width="624px" @close="close">
    <div class="dialog-body">
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
          <!-- <i
            class="icon"
            :class="isChecked ? 'icon-check' : 'icon-uncheck'"
            @click="handleChecked"
          ></i> -->
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
            >全选当前品牌：</el-checkbox
          >
          <!-- 全选当前品牌： -->
        </div>
        <!-- <div class="brand-list">
          <el-tag
            v-for="(scope, scopeIndex) in nowBrandNames"
            :key="scope.name"
            @click="changeScope(scope, scopeIndex)"
            size="mini"
            :effect="scope.effect"
          >
            {{ scope.name }}
          </el-tag>
        </div> -->
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

interface BrandModel {
  code: string;
  name: string;
}
interface AreaModel {
  category: string;
  // effect: "plain" | "dark";
  effect: string;
}
interface CategoryBrandModel {
  category: string;
  scopes: BrandModel[];
}

@Component({
  name: "BrandDialog"
})
export default class BrandDialog extends Vue {
  protected visible = false;
  protected isChecked = false;
  protected checkAll = false;
  // public isIndeterminate = true;
  protected brandCheckNames: string[] = [];
  protected areas: AreaModel[] = [
    // { category: "中国", effect: "plain" },
    // { category: "德国", effect: "plain" },
  ];

  protected nowBrandNames: string[] = [];

  created() {
    this.areas = this.categoryBrandList.map(
      (item: CategoryBrandModel, index: number) => {
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
  }

  protected categoryBrandList: CategoryBrandModel[] = [
    {
      category: "中国",
      scopes: [
        { code: "", name: "启辰" },
        { code: "", name: "荣威" },
        { code: "", name: "名爵" },
        { code: "", name: "长城" },
        { code: "", name: "江淮" },
        { code: "", name: "比亚迪" },
        { code: "", name: "五菱" },
        { code: "", name: "宝骏" },
        { code: "", name: "之诺" },
        { code: "", name: "北汽" },
        { code: "", name: "长安" },
        { code: "", name: "奇瑞" },
        { code: "", name: "开瑞" },
        { code: "", name: "吉利" },
        { code: "", name: "海马" },
        { code: "", name: "思铭" },
        { code: "", name: "中华" },
        { code: "", name: "金杯" },
        { code: "", name: "众泰" },
        { code: "", name: "力帆" },
        { code: "", name: "哈飞" },
        { code: "", name: "天马" },
        { code: "", name: "宝龙" },
        { code: "", name: "小鹏" },
        { code: "", name: "双环" },
        { code: "", name: "中兴" }
      ]
    },
    {
      category: "德国",
      scopes: [
        { code: "", name: "云雀" },
        { code: "", name: "猎豹" },
        { code: "", name: "昌河" },
        { code: "", name: "汉腾" },
        { code: "", name: "江铃" },
        { code: "", name: "陆风" },
        { code: "", name: "领克" },
        { code: "", name: "腾势" },
        { code: "", name: "华泰" },
        { code: "", name: "蔚来" },
        { code: "", name: "观致" },
        { code: "", name: "东风" },
        { code: "", name: "英致" },
        { code: "", name: "凯翼" },
        { code: "", name: "理念" },
        { code: "", name: "华普" },
        { code: "", name: "英伦" },
        { code: "", name: "野马" },
        { code: "", name: "万丰" },
        { code: "", name: "传祺" },
        { code: "", name: "一汽" },
        { code: "", name: "奔腾" },
        { code: "", name: "红旗" },
        { code: "", name: "福汽启腾" },
        { code: "", name: "纳智捷" },
        { code: "", name: "福田" },
        { code: "", name: "吉奥" },
        { code: "", name: "北京" },
        { code: "", name: "威旺" },
        { code: "", name: "幻速" },
        { code: "", name: "绅宝" },
        { code: "kangdi", name: "康迪" },
        { code: "quanqiuying", name: "全球鹰" },
        { code: "dihao", name: "帝豪" },
        { code: "jihe", name: "几何" },
        { code: "hafu", name: "哈弗" },
        { code: "WEY", name: "WEY" },
        { code: "oula", name: "欧拉" },
        { code: "dongnan", name: "东南" },
        { code: "jinlong", name: "金龙" },
        { code: "", name: "庆铃" },
        { code: "", name: "大发" },
        { code: "", name: "知豆" },
        { code: "", name: "理想" },
        { code: "", name: "汉龙" },
        { code: "", name: "启腾" }
      ]
    }
  ];

  public show(vehBrands: string[]) {
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
    // this.brandCheckNames = val ? this.nowBrandNames : [];
    // this.isIndeterminate = false;
  }
  handleCheckedCitiesChange(value: string[]) {
    const checkedCount = value.length;
    this.checkAll = !this.nowBrandNames.some(item => !value.includes(item));

    // this.isIndeterminate = checkedCount > 0 && this.checkAll;
    // let checkedCount = value.length;
    // this.checkAll = checkedCount === this.nowBrandNames.length;
    // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
    // this.isChecked = true;
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
    // this.isChecked = false;
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

    this.categoryBrandList.some((item: CategoryBrandModel) => {
      const result = item.category === area.category;
      if (result) {
        this.nowBrandNames = item.scopes.map(scope => scope.name);
      }
      return result;
    });
  }
  protected changeScope(scope: BrandModel, index: number) {
    // console.log(scope);
    // console.log(index);
  }

  private close() {
    // this.visible = false;
    // console.log(this.visible);
  }

  handleCloseBrand(brandIndex: number) {
    this.brandCheckNames.splice(brandIndex, 1);
    this.handleCheckedCitiesChange(this.brandCheckNames);
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  margin: 8px 8px 0;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
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
