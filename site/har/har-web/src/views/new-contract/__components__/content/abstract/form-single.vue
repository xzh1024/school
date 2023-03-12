<template>
  <div class="contract-abstract-container">
    <table class="contract-content-table" cellspacing="0" border="1">
      <tbody>
        <template v-if="1">
          <tr>
            <th
              :colspan="processColspan(1, 1)"
              class="contract-content-table__title"
            >
              <span>合同摘要</span>
            </th>
          </tr>
          <tr>
            <th :style="labelStyle" class="text-right">
              <span>合同号</span>
            </th>
            <td :colspan="processColspan(4, 2)">
              <span>{{ value.contractCode }}</span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>项目名称</span>
            </th>
            <td :colspan="processColspan(4, 2)">
              <span>{{ value.projectName }}</span>
            </td>
          </tr>
          <tr>
            <th :style="labelStyle" class="text-right">
              <span>承租方</span>
            </th>
            <td :colspan="processColspan(4, 2)">
              <span>{{ value.merchantName }}</span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>版本号</span>
            </th>
            <td :colspan="processColspan(4, 2)">
              <span>{{ value.version }}</span>
            </td>
          </tr>
          <tr>
            <th class="text-right"><span>合同说明</span></th>
            <td :colspan="processColspan(2, 1)">
              <span>{{ value.contractRemark }}</span>
            </td>
          </tr>
        </template>

        <!--租赁用途-->
        <template v-if="1">
          <tr>
            <th :colspan="processColspan(1, 1)">
              <h4>租赁用途</h4>
            </th>
          </tr>
          <tr>
            <th :style="labelStyle" class="text-right">
              <span>店铺</span>
            </th>
            <td>
              <span>{{ value.storeName }}</span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>品牌</span>
            </th>
            <td>
              <span>{{ value.brandName }}</span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>业态</span>
            </th>
            <td :colspan="processColspan(6, 1)">
              <span>{{ value.formatName }}</span>
            </td>
          </tr>
        </template>

        <!--租赁标的-->
        <template v-if="1">
          <tr>
            <th :colspan="processColspan(1, 1)">
              <h4>租赁标的</h4>
            </th>
          </tr>
          <tr>
            <th :style="labelStyle" class="text-right">
              <span>楼宇楼层</span>
            </th>
            <td>
              <span
                >{{
                  [value.buildingName, value.floorName]
                    .filter((t) => t)
                    .join('/')
                }}
              </span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>铺位号</span>
            </th>
            <td>
              <span>{{ value.estateName }}</span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>主营铺位号</span>
            </th>
            <td :colspan="processColspan(6, 1)">
              <span>{{ value.mainEstateName }}</span>
            </td>
          </tr>
          <tr>
            <th :style="labelStyle" class="text-right">
              <span>建筑面积</span>
            </th>
            <td>
              <span>
                <template v-if="value.estateFloorage != null"
                  >{{ value.estateFloorage }}平米</template
                >
              </span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>使用面积</span>
            </th>
            <td :colspan="processColspan(4, 1)">
              <span>
                <template v-if="value.estateUseArea != null"
                  >{{ value.estateUseArea }}平米</template
                >
              </span>
            </td>
          </tr>
        </template>

        <!--租赁期限-->
        <template v-if="1">
          <tr>
            <th :colspan="processColspan(1, 1)">
              <h4>租赁期限</h4>
            </th>
          </tr>
          <tr>
            <th :style="labelStyle" class="text-right">
              <span>签约日期</span>
            </th>
            <td>
              <span>{{ value.signDate }}</span>
            </td>
            <th :style="labelStyle" class="text-right">
              <span>合同租期</span>
            </th>
            <td :colspan="processColspan(4, 1)">
              <span>
                {{
                  [value.leaseStartDate, value.leaseEndDate]
                    .filter((t) => t)
                    .join('~')
                }}
              </span>
            </td>
          </tr>
        </template>

        <!--意向金/保证金-->
        <template v-if="1">
          <tr>
            <th :colspan="processColspan(1, 1)">
              <h4>意向金/保证金</h4>
            </th>
          </tr>
          <tr>
            <td :colspan="processColspan(1, 1)">
              <span>{{ value.intentionInfo }}</span>
            </td>
          </tr>
        </template>

        <!--返款信息-->
        <template v-if="1">
          <tr>
            <th :colspan="processColspan(1, 1)">
              <h4>返款信息</h4>
            </th>
          </tr>
          <tr>
            <td :colspan="processColspan(1, 1)">
              <span>{{ value.refundInfo }}</span>
            </td>
          </tr>
        </template>

        <!--租金及费用（本合同签订费用项目共计-->
        <template v-if="1">
          <tr>
            <th :colspan="processColspan(1, 1)">
              <h4>
                租金及费用（本合同签订费用项目共计
                {{ value.expenseList ? value.expenseList.length : 0 }}
                项）
              </h4>
            </th>
          </tr>
          <AbstractExpenseTr
            :label-style="labelStyle"
            :columns="columns"
            :data="value.expenseList ? value.expenseList : []"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AbstractFormSingle'
  };
</script>

<script setup lang="ts">
  import { ref, PropType, watch } from 'vue';

  import { useColumns } from './use-columns';
  import AbstractExpenseTr from './__components__/expene-tr.vue';
  import { CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse } from '@/api';

  const props = defineProps({
    value: {
      type: Object as PropType<CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse>,
      default: () => ({})
    }
  });

  const { columns } = useColumns();
  const tableCellMaxNum = ref(0);
  const labelStyle = ref({ 'min-width': '100px' });

  watch(
    () => columns.value,
    (val) => {
      tableCellMaxNum.value = val.length;
    },
    { immediate: true }
  );

  function processColspan(tdNum = 1, averageNum = 1) {
    return Math.floor(tableCellMaxNum.value / averageNum);
  }
</script>

<style lang="less">
  @import './index';
</style>
