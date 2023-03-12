<template>
  <drawer v-model="drawerVisible" width="60vw" :title="title">
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">
        确认
      </a-button>
    </template>
    <div class="editSpace_box">
      <i-loading :loading="detailLoading" />
      <a-card>
        <div class="title">基本信息</div>
        <i-form ref="refForm1" v-model="form" :options="baseOptions">
          <template #venueClassifyIdForm>
            <div class="input-box">
              <a-select
                v-model="form.venueClassifyId"
                placeholder="请选择场地分类"
              >
                <a-option
                  v-for="(item, index) in venueClassifyList"
                  :key="index"
                  :value="item.id"
                  >{{ item.name }}</a-option
                >
              </a-select>
              <a-button
                class="btn-pos"
                type="text"
                @click="addClassifyVisible = true"
                >新建分类</a-button
              >
            </div>
          </template>
          <template #coverFileCodeForm>
            <div class="coverFile_box">
              <div class="toast_info">支持jpg、png、bmp格式，大小不超过2M</div>
              <i-custom-upload
                v-bind="{
                  urlKey: 'url'
                }"
                v-model="form.coverFileCode"
                :options="{
                  accept: 'jpg,png,bmp'
                }"
                :limit="1"
              >
                <template #uploadButton>
                  <div class="flex upload_box">
                    <img src="@/assets/images/member/add.png" alt="" />
                    <span>点击上传图片</span>
                  </div>
                </template>
              </i-custom-upload>
            </div>
          </template>
          <template #detailsFileCodeForm>
            <div class="detailsFile_box">
              <div class="toast_info">支持jpg、png、bmp格式，大小不超过2M</div>
              <div
                class="img_area"
                :class="[
                  form.detailsFileCode.length == 0 ? 'max_width' : 'min_width'
                ]"
              >
                <i-custom-upload
                  v-bind="{
                    urlKey: 'url'
                  }"
                  v-model="form.detailsFileCode"
                  :options="{
                    accept: 'jpg,png,bmp'
                  }"
                  :limit="9"
                >
                  <template #uploadButton>
                    <div class="flex upload_box detail_img_box">
                      <img src="@/assets/images/member/add.png" alt="" />
                      <span>点击上传图片</span>
                    </div>
                  </template>
                </i-custom-upload>
              </div>
            </div>
          </template>
        </i-form>
      </a-card>
      <a-card>
        <div class="title">计费信息</div>
        <i-form ref="refForm2" v-model="form" :options="options"></i-form>
        <div class="max-width">
          <div class="flex align-center justify-between margin_bottom_16">
            <div v-if="form.rules.length > 0" class="tab_box">
              <div
                v-for="(item, index) in form.rules"
                :key="index"
                class="tab_li"
                :class="{ selected: activeIndex == index }"
                @click="onSelect(index)"
                >{{ item.title }}</div
              >
            </div>
            <a-button
              v-if="form.rules.length > 0"
              type="primary"
              style="width: 108px"
              @click="setChargingRule"
              >设置计费规则</a-button
            >
          </div>
          <i-table
            v-if="form.rules.length > 0"
            :options="tableColumns"
            :data="currentRuleData.configs"
          >
            <template #priceRulesCell="{ record }">
              <div>
                <div v-for="(j, jIndex) in record.priceRules" :key="jIndex">
                  <template v-if="currentRuleData.rule === 1"
                    >每个人{{ j.price || 0 }}元</template
                  >
                  <template v-else-if="currentRuleData.rule === 2">
                    时段{{ jIndex + 1 }}： {{ j.startTime }}点至
                    {{ j.endTime }}点,每小时{{ j.price }}元
                  </template>
                  <template v-else>
                    包场{{ jIndex + 1 }}： {{ j.startTime }}点至
                    {{ j.endTime }}点,每场{{ j.price }}元
                  </template>
                </div>
              </div>
            </template>
          </i-table>
          <!-- <a-tabs v-if="form.rules" v-model:activeKey="tableKey">
                <a-tab-pane
                  v-for="(item, index) in form.rules"
                  :key="item.rule"
                  :title="item.title"
                >
                  <template #title>
                    {{ item.title }}
                    <icon-edit @click="changeTitle(index, item.title)" />
                  </template>
                  <a-button
                    type="primary"
                    class="margin-bottom"
                    @click="setChargingRule(index)"
                    >设置计费规则</a-button
                  >
                  <i-table :options="tableColumns" :data="item.configs">
                    <template #priceRulesCell="{ record }">
                      <div>
                        <div
                          v-for="(j, jIndex) in record.priceRules"
                          :key="jIndex"
                        >
                          <template v-if="item.rule === 1"
                            >每个人{{ j.price || 0 }}元</template
                          >
                          <template v-else-if="item.rule === 2">
                            时段{{ jIndex + 1 }}： {{ j.startTime }}点至
                            {{ j.endTime }}点,每小时{{ j.price }}元
                          </template>
                          <template v-else>
                            包场{{ jIndex + 1 }}： {{ j.startTime }}点至
                            {{ j.endTime }}点,每场{{ j.price }}元
                          </template>
                        </div>
                      </div>
                    </template>
                  </i-table>
                </a-tab-pane>
              </a-tabs> -->
        </div>
      </a-card>
    </div>
    <charge-rules
      v-if="changeRuleVisible"
      v-model="changeRuleVisible"
      :info="form.rules[activeIndex]"
      @change="chargeChange"
    ></charge-rules>
    <unit-edit v-model="addClassifyVisible" @confirm="confirm" />
    <a-modal
      v-if="editVisible"
      v-model:visible="editVisible"
      title="修改计费类型标题"
      @ok="changeOk"
    >
      <a-input v-model="globalName" placeholder="请填写标题" />
    </a-modal>
  </drawer>
</template>

<script lang="ts">
  export default {
    name: 'EditSpace'
  };
</script>

<script lang="ts" setup>
  import { ref, computed, onMounted, Ref } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import {
    groundPcApiVenueClassifyListGet,
    GroundPcApiVenueClassifyListGetResponse,
    groundPcApiVenueAddPost,
    groundPcApiVenueUpdatePost,
    groundPcApiVenueInfoIdGet,
    groundPcApiCommonEstateSelectListGet,
    GroundPcApiCommonEstateSelectListGetResponse
  } from '@/api/ground-pc-api';
  import {
    classifyRuleList,
    classifyStatusList,
    StatusListType,
    weekList
  } from '@/utils/dic';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  import { useStoreOptions } from '@/views/vms/hooks/useStore';
  import ChargeRules from './charge-rules.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ILoading from '@/components/i-loading/index.vue';
  import UnitEdit from '../siteType/__components__/edit.vue';
  import { FormOptions } from '@/components/i-form';
  import Drawer from '@/components/drawer/drawer.vue';

  interface Props {
    modelValue: boolean;
    id: number | null;
    storeId: number | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    id: null,
    storeId: null
  });

  onMounted(() => {
    if (props.id) getInfo();
    getVenueClassList();
    getProjectOptions();
    form.value = {
      coverFileCode: [
        {
          id: '1',
          name: 'ceshi',
          type: 'image/png',
          format: '',
          size: '',
          url: 'https://har-cbd-cdn.huianrong.com/har-cbd/upload/dev/20230224/1677222483315932262326.png'
        }
      ],
      detailsFileCode: [
        {
          id: '1',
          name: 'ceshi',
          type: 'image/png',
          format: '',
          size: '',
          url: 'https://har-cbd-cdn.huianrong.com/har-cbd/upload/dev/20230224/1677222483315932262326.png'
        },
        {
          id: '1',
          name: 'ceshi',
          type: 'image/png',
          format: '',
          size: '',
          url: 'https://har-cbd-cdn.huianrong.com/har-cbd/upload/dev/20230224/1677222483315932262326.png'
        }
      ],
      rules: [],
      status: 1
    };
  });

  const editVisible = ref(false);
  const refForm1: Ref = ref(null);
  const refForm2: Ref = ref(null);
  const emits = defineEmits(['update:modelValue', 'refresh']);
  // 新增分类
  const addClassifyVisible = ref(false);

  const changeRuleVisible = ref(false);
  const drawerVisible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const title = computed(() => {
    return props.id ? '编辑场地' : '新增场地';
  });
  const venueClassifyList = ref<GroundPcApiVenueClassifyListGetResponse>([]);
  // 项目下拉列表
  const { getProjectOptions, projectOptions } = useProjectOptions();
  // 店铺下拉
  const { getStoreOptions, storeOptions } = useStoreOptions();
  // 铺位下拉
  const berthData = ref<GroundPcApiCommonEstateSelectListGetResponse>([]);
  const [getEstateData] = useFuncProxy(async (params) => {
    berthData.value = await groundPcApiCommonEstateSelectListGet(params);
  });

  const tableKey = ref();
  const activeIndex = ref(0);
  // 表单内容
  const form = ref<any>({
    rules: [],
    status: 1
  });
  const baseOptions = computed<FormOptions>(() => {
    return {
      formCard: false,
      menuForm: false,
      span: 8,
      layout: 'vertical',
      columns: [
        {
          label: '项目名称',
          search: true,
          prop: 'projectId',
          type: 'select',
          span: 6,
          dic: projectOptions,
          rules: [{ required: true, message: '请选择项目名称' }],
          options: {
            allowSearch: true
          },
          on: {
            change(v: string) {
              getStoreOptions({ projectId: v });
              getEstateData({ projectId: v });
            }
          }
        },
        {
          label: '店铺名称',
          search: true,
          prop: 'storeId',
          span: 6,
          type: 'select',
          dic: storeOptions,
          rules: [{ required: true, message: '请选择店铺名称' }],
          options: {
            allowSearch: true
          },
          on: {
            change(v: string) {}
          }
        },
        {
          label: '铺位号',
          search: true,
          prop: 'estateId',
          type: 'select',
          span: 6,
          dic: berthData.value,
          rules: [{ required: true, message: '请选择铺位号' }],
          options: {
            allowSearch: true
          },
          on: {
            change(v: string) {}
          }
        },
        {
          label: '场地名称',
          prop: 'name',
          span: 6,
          rules: [{ required: true, message: '请输入场地名称' }]
        },
        {
          label: '场地分类',
          prop: 'venueClassifyId',
          type: 'select',
          span: 6,
          dic: venueClassifyList.value,
          rules: [{ required: true, message: '请选择场地分类' }],
          props: {
            label: 'name',
            value: 'id'
          }
        },
        {
          label: '场地编码',
          prop: 'code',
          span: 6,
          options: {
            maxLength: 50
          }
        },
        {
          label: '状态',
          prop: 'status',
          type: 'radio',
          dic: classifyStatusList,
          span: 24,
          rules: [{ required: true, message: '请选择状态' }]
        },
        {
          label: '场地封面图',
          prop: 'coverFileCode',
          type: 'customUpload',
          limit: 1,
          span: 24,
          options: {
            urlKey: 'previewAddress'
          },
          rules: [{ required: true, message: '场地封面图不能为空' }]
        },
        {
          label: '场地详情图',
          prop: 'detailsFileCode',
          type: 'customUpload',
          limit: 9,
          options: {
            urlKey: 'previewAddress'
          },
          rules: [{ required: true, message: '场地详情图不能为空' }],
          span: 24
        }
      ]
    };
  });
  const options = computed<FormOptions>(() => {
    return {
      formCard: false,
      menuForm: false,
      menuColClass: 'menu_class',
      span: 8,
      layout: 'vertical',
      columns: [
        {
          label: '计费类型',
          prop: 'ruleType',
          dic: classifyRuleList,
          span: 24,
          type: 'checkbox',
          rules: [{ required: true, message: '请选择计费类型' }],
          on: {
            change(v: any) {
              const { rules = [] } = form.value;
              const arr: any = [];
              if (v.length) {
                v.forEach((i: any) => {
                  const item = rules.find((j: any) => j.rule === i);
                  if (item) {
                    arr.push(item);
                  } else {
                    const c = classifyRuleList.find((k: any) => k.value === i);
                    const { value, label } = c || {};
                    arr.push({ rule: value, title: label });
                  }
                });
              }
              if (!arr.some((i: any) => i.rule === tableKey.value)) {
                console.log(arr[0]?.rule);
                tableKey.value = arr[0]?.rule;
              }
              form.value.rules = arr;
              currentRuleData.value = form.value.rules.find(
                (item: any, currentIndex: number) => activeIndex.value === currentIndex
              );
              // console.log(v);
            }
          }
        }
      ]
    };
  });
  // modal   修改tabs名称
  const globalName = ref('');
  // 当前修改索引
  const modalIndex = ref<number | null>(null);
  const [getInfo, detailLoading] = useFuncProxy(async () => {
    const res = await groundPcApiVenueInfoIdGet({
      id: `${props.id}`
    });
    const { coverFiles } = res;
    form.value = {
      ...res,
      coverFileCode: Object.keys(coverFiles!).length ? [coverFiles] : [],
      detailsFileCode: res?.detailsFiles || [],
      ruleType: res.rules?.map((i: any) => i.rule)
    };
  });
  const currentRuleData = ref<any>({});
  const onSelect = (index: number) => {
    activeIndex.value = index;
    currentRuleData.value = form.value.rules.find(
      (item: any, currentIndex: number) => index === currentIndex
    );
  };
  function setChargingRule() {
    changeRuleVisible.value = true;
  }

  const tableColumns = {
    menu: false,
    pageShow: false,
    tableCard: false,
    index: true,
    columns: [
      {
        label: '星期',
        prop: 'week',
        formatter: (record: any) => {
          const { week = [] } = record;
          console.log('record11', record);
          return week
            .map(
              (i: any) =>
                weekList.find((j: StatusListType) => j.value === i)?.label
            )
            ?.join(',');
        }
      },
      {
        label: '费用(¥)',
        prop: 'priceRules'
      }
    ]
  };

  const [getVenueClassList] = useFuncProxy(async () => {
    venueClassifyList.value = await groundPcApiVenueClassifyListGet();
  });
  const onCancel = () => {
    Modal.open({
      title: '取消确认',
      content: '取消后不保存本次编辑内容，是否取消？',
      onOk: () => {
        drawerVisible.value = false;
      }
    });
  };
  const loading = ref(false);
  async function onSubmit() {
    console.log(form.value, 777);
    const res1 = await refForm1.value?.submit();
    const res2 = await refForm2.value?.submit();
    if (res1 || res2) return false;
    try {
      const { detailsFileCode = [], coverFileCode = [] } = form.value;
      const p = {
        ...form.value,
        // storeId: props.storeId,
        coverFileCode: coverFileCode.map((i: any) => i.key || i.id).join(''),
        detailsFileCode: detailsFileCode.map((i: any) => i.key || i.id)
      };
      loading.value = true;
      if (props.id) {
        await groundPcApiVenueUpdatePost(p);
        Message.success('编辑成功');
      } else {
        await groundPcApiVenueAddPost(p);
        Message.success('添加成功');
      }
      drawerVisible.value = false;
      loading.value = false;
      emits('refresh');
      refForm1.value.resetFields();
      refForm2.value.resetFields();
    } catch (e) {
      loading.value = false;
      console.error(e);
    }
  }
  function confirm() {
    getVenueClassList();
  }
  function chargeChange(e: string) {
    const { rules = [] } = form.value;
    rules[activeIndex.value] = JSON.parse(e);
    onSelect(activeIndex.value);
  }
  function changeTitle(index: number, title: string) {
    globalName.value = title;
    editVisible.value = true;
    modalIndex.value = index;
  }

  function changeOk() {
    const { rules = [] } = form.value;
    // if (typeof modalIndex.value === 'number') {
    rules[modalIndex.value!].title = globalName.value;
    // }
  }
</script>

<style scoped lang="less">
  .editSpace_box {
    border-radius: 4px;
    :deep(.menu_class) {
      display: none;
    }
    .title {
      font-size: 16px;
      color: #333333;
      line-height: 24px;
      margin-bottom: 16px;
    }
    .coverFile_box {
      :deep(.arco-upload-list-picture) {
        width: 210px;
        height: 210px;
        .img-box {
          width: 210px;
          height: 210px;
        }
        .arco-upload-list-picture-mask {
          display: flex;
          align-items: center;
          justify-content: center;
          .arco-upload-icon-preview {
            margin-right: 16px;
          }
        }
      }
      .toast_info {
        font-size: 14px;
        color: #666666;
        line-height: 22px;
        margin-bottom: 8px;
      }
    }
    .detailsFile_box {
      .min_width {
        min-width: 235px;
      }
      .max_width {
        width: 235px;
      }
      .img_area {
        border: 1px dashed #e6e6e6;
        padding: 12px;
      }
      :deep(.arco-upload-list-picture) {
        width: 210px;
        height: 140px;
        .img-box {
          width: 210px;
          height: 140px;
        }
        .arco-upload-list-picture-mask {
          display: flex;
          align-items: center;
          justify-content: center;
          .arco-upload-icon-preview {
            margin-right: 16px;
          }
        }
      }
      .toast_info {
        font-size: 14px;
        color: #666666;
        line-height: 22px;
        margin-bottom: 8px;
      }
    }

    .upload_box {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 210px;
      height: 210px;
      background: #f7f7f7;
      & > img {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-bottom: 8px;
      }
      & > span {
        font-size: 12px;
        color: #999999;
        line-height: 20px;
      }
    }
    .detail_img_box {
      width: 210px;
      height: 140px;
    }
  }
  .addBtn {
    display: flex;
    justify-content: center;
    width: 35%;
    border: 1px dashed #929292;
    border-radius: 5px;
    cursor: pointer;
  }
  .margin_bottom_16 {
    margin-bottom: 16px;
  }
  .max-width {
    width: 100%;
    .tab_box {
      width: auto;
      height: 38px;
      background: #f7f7f7;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px;
      box-sizing: border-box;
      cursor: pointer;
      .tab_li {
        width: 80px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
      .selected {
        background: #4c8af7;
        border-radius: 4px;
        color: #ffffff;
      }
      .tab_li:nth-child(2) {
        margin: 0 4rpx;
      }
    }
  }

  .input-box {
    position: relative;
    width: 100%;

    .btn-pos {
      position: absolute;
      top: -35px;
      right: 0;
      z-index: 1;
      padding: 0;

      &:hover {
        background: transparent;
      }
    }
  }
</style>
