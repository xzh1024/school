<template>
  <div class="container-box">
    <ht-card class="auto-card">
      <p>
        系统将按照从上到下的顺序获取默认销售价格，直到有值为止；请按住价格类型上下拖动进行排序
      </p>
      <div class="drag-box">
        <!-- <draggable
          :disabled="!canUpdatePriority"
          v-model="priceArr"
          animation="300"
          chosen-class="active"
          @end="dragendSubmit"
        > -->
        <transition-group>
          <div
            class="price-item"
            v-for="(item, idx) in priceArr"
            :key="item.id"
            :class="{ bottom: idx === priceArr.length - 1 }"
            v-dragging="{ item: item, list: priceArr, group: 'priceArr' }"
          >
            <div class="price-name">
              <div v-if="/配件|品牌|分类/.test(item.name)">
                自定义价格公式
              </div>
              <div v-else>{{ item.name }}</div>
              <div v-if="item.priceType" style="width:120px;margin:0 6px;">
                <el-select
                  :popper-append-to-body="false"
                  size="mini"
                  v-model="item.priceType"
                  @change="dragendSubmit"
                >
                  <el-option
                    :label="option.name"
                    :value="option.code"
                    v-for="(option, idx) in item.options"
                    :key="idx"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                style="line-height:30px;"
                v-if="/配件|品牌|分类/.test(item.name)"
              >
                ({{ item.name }})
              </div>
            </div>
            <div v-if="idx !== priceArr.length - 1">
              <i class="el-icon-arrow-down" style="font-size: 16px;"></i>
            </div>
          </div>
        </transition-group>
        <!-- </draggable> -->
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
import { Component, Vue } from "vue-property-decorator";
const PRICE_TYPES = [
  { code: "retail", name: "零售价" },
  { code: "platform", name: "平台价" },
  { code: "allot", name: "调拨价" },
  { code: "wholesale", name: "批发价" },
  { code: "wholesale1", name: "批发价一" },
  { code: "wholesale2", name: "批发价二" },
  { code: "wholesale3", name: "批发价三" },
  { code: "wholesale4", name: "批发价四" }
];
type priceArrType = (
  | {
      id: number;
      name: string;
      priceType?: undefined;
      options?: undefined;
    }
  | {
      id: number;
      name: string;
      priceType: string;
      options: {
        code: string;
        name: string;
      }[];
    }
)[];
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
      name: "固定价格",
      priceType: "retail",
      options: PRICE_TYPES
    },
    {
      id: 2,
      name: "按品牌",
      priceType: "retail",
      options: PRICE_TYPES
    },
    {
      id: 1,
      name: "指定配件",
      priceType: "retail",
      options: PRICE_TYPES
    },
    {
      id: 5,
      name: "库存售价",
      priceType: "retail",
      options: PRICE_TYPES
    },
    {
      id: 3,
      name: "按分类",
      priceType: "retail",
      options: PRICE_TYPES
    },
    {
      id: 4,
      name: "全部配件",
      priceType: "retail",
      options: PRICE_TYPES
    }
  ];
  get canUpdatePriority() {
    return this.hasAutoPerm("updatePriority");
  }
  // @Watch("priceArr", { immediate: true, deep: true })
  // priceHandler(newVal: priceArrType, oldVal: priceArrType) {
  //   //黑魔法
  //   if (newVal === oldVal) {
  //     this.debounceSubmit();
  //   }
  // }
  mounted() {
    this.initState();
  }
  destroyed() {
    this.$dragging.$off("dragend");
  }
  async initState() {
    this.$dragging.$on("dragend", this.dragendSubmit);
    const res: any = await getSystemParamsDetail({
      module: "sale",
      type: "salePriority"
    });
    const arrSortByArr = (
      arr: { code: number; priceType: string }[],
      newArr: priceArrType
    ) => {
      const resArr: priceArrType = [];
      arr.forEach(a => {
        newArr.forEach(n => {
          if (a.code == n.id) {
            if (n.priceType) {
              n.priceType = a.priceType;
            }
            resArr.push(n);
          }
        });
      });
      return resArr;
    };
    this.priceArr = arrSortByArr(res.value, this.priceArr);
  }
  // debounce(fn: Function, delay = 500) {
  //   let startTime = Date.now();
  //   let timer = 0;
  //   return function() {
  //     const endTime = Date.now();
  //     if (endTime - startTime <= delay) {
  //       clearTimeout(timer);
  //     }
  //     timer = setTimeout(fn, delay);
  //     startTime = endTime;
  //   };
  // }
  async dragendSubmit() {
    await updateSystemParamsDetail({
      module: "sale",
      type: "salePriority",
      value: this.priceArr.map(x => {
        return {
          code: x.id,
          priceType: x.priceType
        };
      })
    });
    this.$message({
      type: "success",
      message: "更改成功",
      showClose: true
    });
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
  height: 60px;
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
  line-height: 26px;
  padding: 6px;
  font-weight: 400;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
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
