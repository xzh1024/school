<template>
  <div class="i-card">
    <h3>基础信息</h3>
    <i-form ref="baseFormRef" v-model="formData" :options="baseFormOptions" />
  </div>
  <div class="i-card">
    <div class="row">
      <h3>售价信息</h3>
      <a-button type="primary" @click="addRow">添加行</a-button>
    </div>
    <i-form ref="sellFormRef" v-model="formData" :options="sellFormOptions">
      <template #tableForm>
        <a-table
          :columns="columns"
          :data="formData.cardSalePrice"
          :pagination="false"
          style="width: 100%"
        >
          <template #columns>
            <a-table-column
              v-for="(item, index) in columns"
              :key="index"
              :title="item.title"
              :data-index="item.dataIndex"
            >
              <template #cell="{ record }">
                <a-input
                  v-model="record[item.dataIndex]"
                  :input-attrs="{ type: 'number' }"
                  :placeholder="`请输入${item.title}`"
                />
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </i-form>
  </div>
  <div class="i-card">
    <h3>权益设置</h3>
    <i-form ref="equityFormRef" v-model="formData" :options="equityFormOptions">
      <template #dateForm>
        <a-table
          :columns="equityColumns"
          :data="equityData"
          :pagination="false"
          style="width: 100%"
        >
          <template #columns>
            <a-table-column
              v-for="(item, index) in equityColumns"
              :key="index"
              :title="item.title"
              :data-index="item.dataIndex"
              :width="item.width"
            >
              <template #cell="{ record, column }">
                <div v-if="column.dataIndex === 'timeRange'">
                  <time-process v-model="record.timeRange" />
                </div>
                <div v-else-if="column.dataIndex === 'detail'">
                  <a-dropdown>
                    <a-button type="text">复制到</a-button>
                    <template #content>
                      <a-doption
                        v-for="(it, i) in equityData"
                        :key="it.date"
                        class="dropdown-item"
                        :value="i"
                      >
                        {{ it.date }}
                      </a-doption>
                    </template>
                  </a-dropdown>
                </div>
                <span v-else>{{ record[column.dataIndex] }}</span>
              </template>
              <template v-if="item.title === '时间'" #title>
                <div class="table-head-row">
                  <div>00:00</div>
                  <div>06:00</div>
                  <div>12:00</div>
                  <div>18:00</div>
                  <div>24:00</div>
                </div>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </i-form>
  </div>
  <div class="i-card">
    <h3>卡设置</h3>
    <i-form ref="cardFormRef" v-model="formData" :options="cardFormOptions">
      <template #cardForm>
        <card
          v-if="formData.cardFaceType === 2"
          type="once"
          bg-color="#ddd"
          :bg="formData.cardFaceColor"
        />
        <card v-else type="once" :bg-color="formData.cardFaceColor" />
      </template>
      <template #cardColorForm>
        <div class="colors">
          <img
            class="color-right"
            :style="{
              left: `${colorActive * 42 + 10}px`
            }"
            src="@/assets/images/card/gou.png"
          />
          <div
            v-for="item in colors"
            :key="item"
            class="color-item"
            :style="{ backgroundColor: item }"
            @click.self="formData.cardFaceColor = item"
          />
        </div>
      </template>
    </i-form>
  </div>

  <div class="fixed-phone">
    <iframe
      id="basicIframe"
      ref="homeIframeRefs"
      :src="`${H5Url}/pages/card/tabbar/home`"
      frameborder="0"
      class="content"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import Card from './card.vue';
  import TimeProcess from './time-process.vue';
  import { FormOptions } from '@/components/i-form';
  import { sellTableColumns, sellPeriodTableColumns, colors } from './hooks';
  import { Message } from '@arco-design/web-vue';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  import { useStoreOptions } from '@/views/vms/hooks/useStore';
  import { useVenueOptions } from '@/views/vms/hooks/useVenue';
  import { saleChannelData } from '../dic';
  import { H5Url } from '@/utils/h5Url';
  const props = defineProps({
    type: {
      // 1、限期卡2、次卡
      type: Number,
      default: 1
    }
  });

  const { getProjectOptions, projectOptions } = useProjectOptions();
  const { getStoreOptions, storeOptions } = useStoreOptions();
  const { getVenueOptions, venueOptions } = useVenueOptions();

  const formData = ref({
    projectId: '',
    storeId: '',
    cardFaceType: 1,
    allowTransferType: 0,
    shelveType: 1,
    activeMethod: 1,
    expirationMethod: 1,
    admission: 1,
    cardFaceColor: colors[0],
    transferPrice: 0,
    saleDateType: 1,
    cardSalePrice: [] as any
  });

  const colorActive = computed(() => {
    return colors.indexOf(formData.value.cardFaceColor);
  });

  const columns = computed(() =>
    props.type === 2 ? sellPeriodTableColumns : sellTableColumns
  );

  function addRow() {
    const arr = formData.value.cardSalePrice;
    if (arr.length === 10) {
      Message.error('最多添加10行');
      return;
    }
    arr.push({
      useDayOrTimes: '0',
      listPrice: '0',
      salePrice: '0',
      allowFreezeDay: '0',
      giveDayOrTimes: '0'
    });
  }

  const commonOptions = {
    formCard: false,
    menuForm: false,
    layout: 'vertical'
  };
  // 基础信息
  // @ts-ignore
  const baseFormOptions = computed<FormOptions>(() => {
    return {
      ...commonOptions,
      columns: [
        {
          label: '项目名称',
          prop: 'projectId',
          type: 'select',
          span: 6,
          rules: [{ required: true, message: '请选择项目名称' }],
          dic: projectOptions,
          on: {
            change(v: string) {
              getStoreOptions({ projectId: v });
              getVenueOptions({
                projectId: v,
                storeId: formData.value.storeId
              });
            }
          }
        },
        {
          label: '店铺名称',
          prop: 'storeId',
          type: 'select',
          span: 6,
          options: {
            multiple: true
          },
          dic: storeOptions,
          on: {
            change(v: string) {
              getVenueOptions({
                projectId: formData.value.projectId,
                storeId: v
              });
            }
          }
        },
        {
          label: '卡名称',
          prop: 'name',
          span: 6,
          options: { 'max-length': 30 },
          rules: [{ required: true, message: '请填写卡名称' }]
        },
        {
          label: '支持场馆',
          prop: 'venues',
          type: 'select',
          span: 6,
          options: { 'multiple': true, 'max-tag-count': 17 },
          rules: [{ required: true, message: '请选择支持场馆' }],
          dic: venueOptions
        },
        {
          label: '销售时间',
          prop: 'saleDateType',
          type: 'select',
          span: 6,
          dic: [
            { label: '限时', value: 2 },
            { label: '不限时', value: 1 }
          ],
          rules: [{ required: true, message: '请选择销售时间' }]
        },
        ...(formData.value.saleDateType === 2
          ? [
              {
                label: '时间范围',
                prop: 'saleDate',
                type: 'dateRange',
                span: 12,
                rules: [{ required: true, message: '请选择时间范围' }],
                on: {
                  change(v: string[]) {
                    console.log(v);
                  }
                }
              }
            ]
          : []),
        {
          label: '销售渠道',
          prop: 'saleChannel',
          type: 'select',
          span: 6,
          rules: [{ required: true, message: '请选择销售渠道' }],
          dic: saleChannelData
        },
        {
          label: '产品介绍',
          prop: 'productDescription',
          type: 'textarea',
          span: 24,
          options: {
            // 'max-length': 11
          }
        }
      ]
    };
  });
  // 售价信息
  // @ts-ignore
  const sellFormOptions = computed<FormOptions>(() => {
    return {
      ...commonOptions,
      columns: [
        { prop: 'table', span: 24, hideLabel: true },
        {
          label: '有效期',
          prop: 'expirationMethod',
          type: 'radio',
          span: 6,
          dic: [
            { label: '不限制', value: 1 },
            { label: '限制有效', value: 2 }
          ],
          rules: [{ required: true, message: '请选择有效期' }]
        },
        ...(formData.value.expirationMethod === 2
          ? [
              {
                label: '有效天数',
                prop: 'expirationDay',
                rules: [{ required: true, message: '请填写有效天数' }]
              }
            ]
          : []),
        {
          label: '激活方式',
          prop: 'activeMethod',
          type: 'select',
          span: 6,
          dic: [
            { label: '购买激活', value: 1 },
            { label: '指定时间激活', value: 2 },
            { label: '第一次到店激活', value: 3 }
          ]
        },
        ...(formData.value.activeMethod === 2
          ? [
              // {
              //   label: '激活时间',
              //   prop: 'activeDate',
              //   type: 'date'
              // },
              {
                label: '自动激活天数',
                prop: 'activeDay'
              }
            ]
          : [])
      ]
    };
  });
  const equityColumns = [
    { title: '日期', dataIndex: 'date', width: 82 },
    { title: '时间', dataIndex: 'timeRange' },
    { title: '详情', dataIndex: 'detail', width: 82 }
  ];
  const equityData = ref([
    { date: '周一', timeRange: [0, 24] },
    { date: '周二', timeRange: [0, 24] },
    { date: '周三', timeRange: [0, 24] },
    { date: '周四', timeRange: [0, 24] },
    { date: '周五', timeRange: [0, 24] },
    { date: '周六', timeRange: [0, 24] },
    { date: '周日', timeRange: [0, 24] }
  ]);
  // 权益设置
  // @ts-ignore
  const equityFormOptions = computed<FormOptions>(() => {
    return {
      ...commonOptions,
      columns: [
        {
          label: '入场时段',
          prop: 'admission',
          type: 'radio',
          span: 24,
          dic: [
            { label: '全时段', value: 1 },
            { label: '特定时段', value: 2 }
          ]
        },
        ...(formData.value.admission === 2
          ? [
              {
                prop: 'date',
                span: 24,
                hideLabel: true
              }
            ]
          : []),
        {
          label: '是否支持转让',
          prop: 'allowTransferType',
          type: 'radio',
          span: 6,
          dic: [
            { label: '否', value: 0 },
            { label: '是', value: 1 }
          ]
        },
        ...(formData.value.allowTransferType === 1
          ? [
              {
                label: '转让手续费',
                prop: 'transferPrice',
                span: 6,
                options: {
                  suffix: '元'
                }
              }
            ]
          : [])
      ]
    };
  });
  // 卡设置
  // @ts-ignore
  const cardFormOptions = computed<FormOptions>(() => {
    return {
      ...commonOptions,
      columns: [
        {
          label: '卡面设置',
          prop: 'cardFaceType',
          type: 'radio',
          span: 24,
          dic: [
            { label: '颜色', value: 1 },
            { label: '自定义', value: 2 }
          ],
          on: {
            change(v: number) {
              formData.value.cardFaceColor = v === 1 ? colors[0] : '';
            }
          }
        },
        {
          prop: 'card',
          hideLabel: true,
          span: 24
        },
        formData.value.cardFaceType === 1
          ? {
              label: '背景颜色',
              prop: 'cardColor',
              hideLabel: true,
              span: 24
            }
          : {
              label: '背景图片',
              prop: 'cardFaceColor',
              span: 24,
              hideLabel: true,
              type: 'customUpload',
              limit: 1,
              options: {
                options: {
                  isAliOss: false,
                  accept: 'image/*'
                }
              }
            },
        {
          label: '卡说明',
          prop: 'cardContent',
          type: 'textarea',
          span: 24,
          rules: [{ required: true, message: '请填写卡说明' }]
        },
        {
          label: '上架信息',
          prop: 'shelveType',
          type: 'radio',
          span: 6,
          dic: [
            { label: '立即上架', value: 1 },
            { label: '定时上架', value: 2 }
          ],
          rules: [{ required: true, message: '请选择上架信息' }]
        },
        ...(formData.value.shelveType === 2
          ? [
              {
                label: '上架时间',
                prop: 'shelveDate',
                type: 'date',
                span: 6,
                rules: [{ required: true, message: '请选择上架时间' }]
              }
            ]
          : [])
      ]
    };
  });

  function setFormData(data: any) {
    console.log(data);

    formData.value = { ...data };
  }

  const baseFormRef = ref();
  const sellFormRef = ref();
  const equityFormRef = ref();
  const cardFormRef = ref();
  async function submit() {
    const baseFormRes = await baseFormRef.value?.submit();
    const sellFormRes = await sellFormRef.value?.submit();
    const equityFormRes = await equityFormRef.value?.submit();
    const cardFormRes = await cardFormRef.value?.submit();

    return !baseFormRes && !equityFormRes && !sellFormRes && !cardFormRes;
  }

  defineExpose({
    formData,
    setFormData,
    submit
  });

  onMounted(() => {
    getProjectOptions();
    getStoreOptions({ projectId: '' });
    getVenueOptions({ projectId: '', storeId: '' });
  });
</script>

<style lang="less" scoped>
  h3 {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    margin: 0 0 16px 0;
  }

  .row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .colors {
    display: flex;
    align-items: center;
    position: relative;
  }

  .color-item {
    width: 36px;
    height: 36px;
    border-radius: 4px 4px 4px 4px;
    margin-right: 6px;
    cursor: pointer;
  }

  .color-right {
    position: absolute;
    width: 16px;
  }

  .dropdown-item {
    width: 80px;
  }

  .table-head-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .i-card {
    width: 100%;
  }

  .fixed-phone {
    position: fixed;
    top: 50%;
    left: 50px;
    width: 416px;
    height: 852px;
    background: url(@/assets/images/svc/phone-bg.png);
    // background-color: #fff;
    transform: translateY(-50%);
    .content {
      width: 370px;
      height: 568px;
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eee;
      position: absolute;
      left: 22px;
      top: 100px;
    }
  }
</style>
