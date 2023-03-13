<template>
  <div class="list">
    <i-table :options="options" :data="weights">
      <template #picCodeCell="{ record }">
        <i-custom-upload
          v-model="record.picCode"
          url-key="previewAddress"
          :options="{
            listType: 'picture-card',
            accept: 'image',
            limit: 1,
            imageStyle: {
              width: '60px',
              height: '60px'
            }
          }"
        ></i-custom-upload>
      </template>
      <template #codeCell="{ record }">
        <a-input v-model="record.code" placeholder="请填写规格编码"></a-input>
      </template>
      <template #barcodeCell="{ record }">
        <a-input
          v-model="record.barcode"
          placeholder="请填写规格条码"
          @input="record.barcode = record.barcode.replace(/\D/g, '')"
        ></a-input>
      </template>
      <template #artCodeCell="{ record }">
        <a-input v-model="record.artCode" placeholder="请填写货号"></a-input>
      </template>
      <template #taxRateCell="{ record }">
        <a-input-number v-model="record.taxRate" placeholder="请填写税率">
          <template #append>%</template>
        </a-input-number>
      </template>
      <template #scribingPriceCell="{ record }">
        <a-input-number
          v-model="record.scribingPrice"
          placeholder="请填写参考销售价"
        >
          <template #append>￥</template></a-input-number
        >
      </template>
      <template #salePriceCell="{ record }">
        <a-input-number
          v-model="record.salePrice"
          placeholder="请填写销售价"
        >
          <template #append>￥</template>
        </a-input-number>
      </template>
      <template #stockNumCell="{ record }">
        <a-input v-model="record.stockNum" placeholder="请填写库存"> </a-input>
      </template>
    </i-table>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'EditSpecsList'
  };
</script>

<script lang="ts" setup>
  import ITable from '@/components/i-table/index.vue';
  import { computed, ref, Ref, watch } from 'vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    },
    specNames: {
      type: Array,
      default: () => []
    }
  });
  const emits = defineEmits(['update:modelValue']);

  const weights: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const options: Ref = ref({
    index: false,
    menu: false,
    pageShow: false,
    indexWidth: 35,
    menuOtherOptions: {
      scroll: {
        x: 1000
      }
    },
    columns: [
      {
        label: '规格名称',
        prop: 'names',
        width: 150,
        align: 'center'
      },
      {
        label: '规格图片',
        prop: 'picCode',
        width: 120,
        align: 'center'
      },
      {
        label: '规格编码',
        prop: 'code',
        width: 170,
        align: 'center'
      },
      {
        label: '规格条码',
        prop: 'barcode',
        width: 170,
        align: 'center'
      },
      {
        label: '货号',
        prop: 'artCode',
        width: 150,
        align: 'center'
      },
      {
        label: '税率',
        prop: 'taxRate',
        width: 180,
        align: 'center'
      },
      {
        label: '参考销售价(￥)',
        prop: 'scribingPrice',
        width: 220,
        align: 'center'
      },
      {
        label: '销售价',
        prop: 'salePrice',
        width: 200,
        align: 'center'
      },
      {
        label: '库存',
        prop: 'stockNum',
        width: 150,
        align: 'center'
      }
    ]
  });

  watch(
    () => props.specNames,
    () => {
      skuHandle();
    },
    { deep: true }
  );
  function skuHandle() {
    const { specNames = [] } = props;
    const skuList = weights.value;
    const arr: any = [];
    specNames.forEach((i: any) => {
      if (i.specName) {
        const val: any = [];
        i.specVals.forEach((j: any) => {
          if (j.specValueId) val.push(j);
        });
        arr.push(val);
      }
    });
    // console.log(arr);
    // console.log(specNames);
    const map: any = {};
    skuList.forEach((i: any) => {
      const str = i.specValueIds ? i.specValueIds.join('') : i.ids?.join('');
      map[str] = i;
    });
    // console.log(map);
    const dikalRes = dikal(arr);
    // console.log(dikalRes);
    let newSkuList = [];
    // 笛卡尔合集 生成列表
    if (specNames.length > 1) {
      newSkuList = dikalRes.map((i: any) => {
        let names = i.map((j: any) => j.specValueName);
        names = names.join(',');
        const ids = i.map((j: any) => j.specValueId);
        return { names, ids };
      });
    } else {
      const dikalArr: any = [];
      dikalRes.forEach((i: any) => {
        // const ids = i.map((j: any) => j.psvId);
        i.forEach((j: any) => {
          dikalArr.push({ ...j, names: j.specValueName, ids: [j.specValueId] });
        });
      });
      // console.log(dikalArr, 'dikalArr');
      newSkuList = dikalArr;
    }
    // 比对原始值  同步赋值
    // console.log(newSkuList, 'newSkuList');
    newSkuList = newSkuList.filter((i: any) => i.names);
    newSkuList = newSkuList.map((i: any) => {
      const str = i.ids.join('');
      if (map[str]) {
        return { ...map[str], ...i, id: map[str].id };
      }
      return i;
    });
    weights.value = newSkuList;
  }
  // 迪卡尔集合
  function dikal(arr: any) {
    if (!arr || arr.length < 2) return arr || [];
    return Array.prototype.reduce.call(
      arr,
      (a: any, b: any[]) => {
        const ret: any = [];
        a.forEach((a: any) => {
          b.forEach((b) => {
            ret.push(a.concat([b]));
          });
        });
        return ret;
      },
      [[]]
    );
  }
</script>

<style scoped lang="less">
  .list {
    width: 100%;
  }

  :deep(.arco-upload-list-picture),
  :deep(.arco-upload-picture-card) {
    width: 60px;
    min-width: 60px;
    max-width: 60px;
    height: 60px;
    margin-right: 0;
    margin-bottom: 0;
  }

  :deep(.arco-upload-wrapper.arco-upload-wrapper-type-picture-card) {
    width: 60px;
  }

  :deep(.arco-upload-list-picture-mask) {
    line-height: 60px;
  }

  :deep(.img-box) {
    width: 60px;
    height: 60px;
  }
</style>
