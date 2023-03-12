<template>
  <drawer v-model:model-value="visibleLess" title="顾客到访" @cancel="onCancel">
    <div class="form-warp">
      <i-form ref="visitFormRefs" v-model="pageForm" :options="formOptions">
        <template #memberIdForm>
          <div class="input-box">
            <a-select
              v-model="pageForm.memberId"
              placeholder="请选择"
              :multiple="false"
              :allow-search="true"
              :options="projectOptions"
              @change="getmakeTime"
            ></a-select>
            <a-button class="btn-pos" type="text">新增</a-button>
          </div>
        </template>
      </i-form>
    </div>
    <template #footer>
      <a-button @click="onCancel"> 取消</a-button>
      <a-button v-if="pageForm.mainStores != 1" type="primary" @click="submit"
        >确认</a-button
      >
      <a-button v-else type="primary" @click="visitsubmit">核销</a-button>
    </template>
  </drawer>
</template>
<script lang="ts" setup>
  import {
    GroundPcApiVisitRecordFindAppointmentTimeGetResponse,
    groundPcApiMerchantEmployeeListByStoreIdGet,
    groundPcApiVisitRecordAddPost,
    groundPcApiVisitRecordFindAppointmentTimeGet,
    groundPcApiVisitRecordVisitVerificationGet
  } from '@/api/ground-pc-api';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Ref, computed, ref } from 'vue';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  import { useStoreOptions } from '@/views/vms/hooks/useStore';

  const emits = defineEmits(['update:modelValue', 'reset']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const { getProjectOptions, projectOptions } = useProjectOptions();

  const { getStoreOptions, storeOptions } = useStoreOptions();
  const pageForm = ref<any>({});
  const formOptions: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '归属项目',
          prop: 'projectId',
          type: 'select',
          rules: [{ required: true, message: '请选择项目' }],
          options: {
            allowSearch: true,
            allowClear: false
          },
          on: {
            change() {
              pageForm.value.merchantId = '';
              pageForm.value.brandId = '';
              pageForm.value.storeId = '';
              getStoreOptions({ projectId: pageForm.value.projectId });
              getmakeTime();
            }
          },
          dic: projectOptions,
          span: 6
        },

        {
          label: '店铺名称',
          prop: 'storeId',
          type: 'select',
          rules: [{ required: true, message: '请输选择店铺' }],
          options: {
            maxLength: 50
          },
          dic: storeOptions,
          on: {
            change() {
              getmakeTime();
              searchVip(pageForm.value.storeId);
            }
          },
          span: 6
        },
        {
          label: '到达类型',
          type: 'select',
          prop: 'visitType',
          rules: [{ required: true, message: '请选择' }],
          dic: [
            {
              label: '临时到访',
              value: 0
            },
            {
              label: '预约到访',
              value: 1
            }
          ],
          span: 6
        },
        {
          label: '添加/核销预约',
          prop: 'mainStores',
          type: 'select',
          rules: [{ required: true, message: '请选择' }],
          dic: [
            {
              label: '添加',
              value: 0
            },
            {
              label: '核销',
              value: 1
            }
          ],
          display: pageForm.value.visitType === 1 ? true : false,
          span: 6
        },

        {
          label: '会员名称/电话',
          type: 'select',
          prop: 'memberId',
          rules: [{ required: true, message: '请选择' }],
          span: 6
        },
        {
          label: '预约时间',
          prop: 'visitTime',
          type: 'date',
          rules: [{ required: true, message: '请选择预约时间' }],
          display: pageForm.value.visitType === 1 ? true : false,
          span: 6
        },
        {
          label: '接待人员',
          prop: 'merchantEmployeeId',
          type: 'select',
          rules: [{ message: '请选择' }],
          dic: [
            {
              label: '是',
              value: 1
            },
            {
              label: '否',
              value: 0
            }
          ],
          span: 6
        }
      ]
    };
  });

  const makeOptions = ref<GroundPcApiVisitRecordFindAppointmentTimeGetResponse>(
    []
  );
  //查询预约时间
  const [getmakeTime] = useFuncProxy(async () => {
    const { projectId, storeId, memberId } = pageForm.value;
    if (!projectId || !storeId || !memberId) return false;
    makeOptions.value = await groundPcApiVisitRecordFindAppointmentTimeGet({
      projectId: projectId,
      storeId: storeId,
      memberId: memberId
    });
  });
  const visibleLess = computed({
    get() {
      if (props.modelValue) {
        getProjectOptions();
      }
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  function onCancel() {
    emits('update:modelValue', false);
  }
  const visitFormRefs = ref();
  //确认
  const submit = async () => {
    const res = await visitFormRefs.value.submit();
    if (!res) {
      try {
        await groundPcApiVisitRecordAddPost(pageForm.value);
        Message.success('操作成功');
        visibleLess.value = false;
      } finally {
        console.log(11111);
      }
    }
  };

  //会员查询
  const searchVip = async (storeId: string) => {
    const a = await groundPcApiMerchantEmployeeListByStoreIdGet({
      storeId: storeId
    });
    console.log(a, 5555555);
  };

  //核销
  const visitsubmit = async () => {
    const res = await visitFormRefs.value.submit();
    if (!res) {
      try {
        await groundPcApiVisitRecordVisitVerificationGet({
          visitRecordId: pageForm.value.memberId
        });
        Message.success('操作成功');
        visibleLess.value = false;
      } finally {
        console.log(11111);
      }
    }
  };
</script>

<style lang="less" scoped>
  .form-warp {
    background: #fff;
    border-radius: 8px;
    padding: 0 16px;
    padding-top: 16px;
    width: 100%;
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
  }
</style>
