<template>
  <a-modal
    :visible="visible"
    width="50vw"
    title="新增banner"
    title-align="start"
    @cancel="visible = false"
    @ok="onOk"
  >
    <div style="max-height: 70vh">
      <i-form ref="BannerForm" v-model="page.form" :options="formOptions">
        <template #coverPicForm>
          <i-custom-upload
            v-model="page.form.coverPic"
            url-key="previewAddress"
            :options="{ limit: 1, accept: 'image/*' }"
          />
        </template>
        <template #detailTypeForm>
          <a-radio-group v-model="page.form.detailType" @change="changeType">
            <a-radio :value="1">店铺</a-radio>
            <a-radio :value="2">活动</a-radio>
          </a-radio-group>
        </template>
      </i-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, computed, onMounted, watch } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectBannerAddPost,
    cbdApiProjectBannerEditPost,
    cbdApiProjectBannerInfoIdGet,
    cbdApiProjectCommonActivityListGet,
    cbdApiProjectCommonStoreSelectGet
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import type { CbdApiProjectCommonActivityListGetResponse } from '@/api';
  import type { StoreSelectItem } from '@/utils/dic';
  type ActivityItem = CbdApiProjectCommonActivityListGetResponse[0];

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    bannerId: {
      type: [Number],
      required: true
    },
    projectId: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const tempDetailId = ref<number | undefined>(undefined);
  const tempType = ref<number | undefined>(1);
  const activityList = ref<Array<{ label: string; value: number }>>([]);
  const storeList = ref<Array<StoreSelectItem>>([]);
  const linkAddress = computed(() => {
    return page.form.detailType === 1 ? storeList.value : activityList.value;
  });
  const page = reactive<any>({
    form: {
      name: '',
      detailId: undefined,
      detailType: undefined,
      type: undefined,
      sequence: undefined,
      status: 0,
      coverPic: []
    }
  });
  const formOptions: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      columns: [
        {
          label: 'banner名称',
          prop: 'name',
          rules: [{ required: true, message: '请填写banner名称' }],
          span: 12
        },
        {
          label: '所属类型',
          prop: 'type',
          type: 'select',
          rules: [{ required: true, message: '请选择所属类型' }],
          span: 12,
          dic: [
            {
              label: '热门活动',
              value: 1
            },
            {
              label: '优质商家',
              value: 2
            },
            {
              label: '个人中心',
              value: 3
            }
          ]
        },
        {
          label: '跳转模块',
          prop: 'detailType',
          span: 12
        },
        {
          label: '跳转地址',
          prop: 'detailId',
          span: 12,
          type: 'select',
          dic: linkAddress.value,
          options: {
            disabled: !page.form.detailType
          }
        },
        {
          label: '展示顺序',
          prop: 'sequence',
          rules: [{ required: true, message: '请填写展示顺序' }],
          span: 12
        },
        {
          label: '上传活动封面图片',
          prop: 'coverPic',
          rules: [{ required: true, message: '请上传活动封面图片' }],
          span: 24
        }
      ]
    };
  });
  const BannerForm: Ref = ref(null);
  async function onOk() {
    const v = await BannerForm.value.submit();
    if (!v) {
      if (!props.bannerId) {
        await cbdApiProjectBannerAddPost({
          ...page.form,
          projectId: Number(props.projectId),
          coverPic: page.form.coverPic[0].key || page.form.coverPic[0].id
        });
      } else {
        await cbdApiProjectBannerEditPost({
          ...page.form,
          id: Number(props.bannerId),
          coverPic: page.form.coverPic[0].key || page.form.coverPic[0].id
        });
      }
      Message.success('操作成功');
      emits('refresh');
      visible.value = false;
    }
  }
  const [getData] = useFuncProxy(async () => {
    const res = await cbdApiProjectBannerInfoIdGet({
      id: String(props.bannerId)
    });
    page.form = {
      name: res?.name || '',
      detailId: res?.detailId || undefined,
      detailType: res?.detailType,
      type: res?.type || undefined,
      sequence: res?.sequence || 0,
      status: res?.sequence || 0,
      coverPic: res.coverPic || [{ previewAddress: '', type: 'image/' }]
    };
    tempDetailId.value = page.form.detailId;
    tempType.value = page.form.detailType;
  });

  function changeType(e: string | number | boolean) {
    if (e === tempType.value) {
      page.form.detailId = tempDetailId.value;
    } else {
      page.form.detailId = undefined;
    }
  }
  const [getStoreListData] = useFuncProxy(async () => {
    storeList.value = await cbdApiProjectCommonStoreSelectGet({});
  });
  const [getActivityListData] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonActivityListGet({});
    res.forEach((el: ActivityItem) => {
      activityList.value.push({ label: el.name || '', value: el.id || 0 });
    });
  });
  onMounted(() => {
    getStoreListData();
    getActivityListData();
  });
  watch(
    () => props.bannerId,
    (v) => {
      if (v) {
        getData();
      }
    },
    { immediate: true }
  );
</script>
<style scoped></style>
