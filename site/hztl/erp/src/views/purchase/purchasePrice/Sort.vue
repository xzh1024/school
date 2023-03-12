<template>
  <div class="container-box">
    <ht-card class="auto-card">
      <p>
        系统将按照从上到下的顺序获取默认采购价格，直到有值为止；请按住价格类型上下拖动进行排序
      </p>
      <div class="drag-box">
        <draggable
          :disabled="!canUpdatePriority"
          v-model="priceArr"
          animation="300"
          chosen-class="active"
          @end="dragendSubmit"
        >
          <transition-group>
            <div
              class="price-item"
              v-for="(item, idx) in priceArr"
              :key="item.id"
              :class="{ bottom: idx === priceArr.length - 1 }"
            >
              <div class="price-name">
                {{ item.name }}
              </div>
              <div v-if="idx !== priceArr.length - 1">
                <i class="el-icon-arrow-down" style="font-size: 16px;"></i>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="drag-icon">
          <a alt="拖拽排序" title="拖拽排序">
            <i class="el-icon-sort" />
          </a>
        </div>
      </div>
    </ht-card>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import {
  getSystemParamsDetail,
  updateSystemParamsDetail
} from "@/api/base/base";
import { Component, Emit, Vue } from "vue-property-decorator";
@Component({
  components: {
    draggable
  }
})
export default class extends Vue {
  private priceArr = [
    {
      id: 6,
      name: "客户享受价格"
    },
    {
      id: 0,
      name: "固定价格"
    },
    {
      id: 2,
      name: "按品牌"
    },
    {
      id: 1,
      name: "指定配件"
    },
    {
      id: 5,
      name: "库存售价"
    },
    {
      id: 3,
      name: "按分类"
    },
    {
      id: 4,
      name: "全部配件"
    }
  ];
  get canUpdatePriority() {
    return this.hasAutoPerm("updatePriority");
  }
  @Emit("referenceSettings")
  referenceSettingsHandler() {
    return this.priceArr.map(x => x.id);
  }
  mounted() {
    this.initState();
  }
  async initState() {
    const res: any = await getSystemParamsDetail({
      module: "purchase",
      type: "purchasePriority"
    });
    const arrSortByArr = (
      arr: number[],
      newArr: { id: number; name: string }[]
    ) => {
      const resArr: { id: number; name: string }[] = [];
      arr.forEach(a => {
        newArr.forEach(n => {
          if (a == n.id) {
            resArr.push(n);
          }
        });
      });
      return resArr;
    };
    this.priceArr = arrSortByArr(res.value, this.priceArr);
  }
  async dragendSubmit() {
    await updateSystemParamsDetail({
      module: "purchase",
      type: "purchasePriority",
      value: this.priceArr.map(x => x.id)
    });
    this.$message({
      type: "success",
      message: "更改成功",
      showClose: true
    });
    this.referenceSettingsHandler();
  }
}
</script>

<style scoped lang="scss">
.container-box {
  user-select: none;
}
p {
  color: #333;
  font-weight: 500;
  margin-top: 0;
}
.drag-box {
  width: 600px;
  position: relative;
  .drag-icon {
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    right: -50px;
    top: 50%;
    padding: 2px 5px;
    border-radius: 50%;
    box-shadow: 0 4px 10px #e8e8e8 inset;
    transform: translate(0, -50%);
  }
}

.price-item {
  margin-bottom: 6px;
  border-radius: 2px;
  color: #333;
  box-shadow: 0 4px 10px #e8e8e8;
  border-radius: 4px;
  text-align: center;
}
.price-item.bottom .price-name {
  height: 48px;
  line-height: 36px;
}
.price-name {
  padding: 6px;
  font-weight: 400;
  cursor: move;
}
.price-line {
  margin-top: 2px;
  text-align: center;
  span {
    display: inline-block;
    transform: rotate(90deg);
  }
}
.active {
  background-color: rgb(241, 241, 241);
  cursor: move;
}
</style>
