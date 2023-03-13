<template>
  <drawer
    v-model="visible"
    title="打印机配置"
    :options="{
      okLoading: isLoading
    }"
    @before="onSubmit"
  >
    <div class="white-detail-box" style="height: auto">
      <a-divider orientation="left"
        >{{ typeHash[page.formData.type] }}打印设置</a-divider
      >
      <a-row>
        <a-col :span="12">
          <i-form
            v-if="[1, 2].includes(page.formData.type)"
            ref="leftForm"
            v-model="page.formData"
            :options="page.form"
          >
            <template #logoForm>
              <i-custom-upload
                v-model="page.formData.logo"
                url-key="previewAddress"
                :options="{
                  limit: 1,
                  tip: '请上传logo',
                  accept: 'image/*'
                }"
              />
              <div style="color: red; padding-left: 40px"
                >png格式的图片上传后，将会影响打印效果；</div
              >
            </template>
            <template #qrCodeForm>
              <i-custom-upload
                v-model="page.formData.qrCode"
                url-key="previewAddress"
                :options="{
                  limit: 1,
                  tip: '请上传logo',
                  accept: 'image/*'
                }"
              />
              <div style="color: red; padding-left: 40px"
                >png格式的图片上传后，将会影响打印效果；</div
              >
            </template>
          </i-form>
          <i-form
            v-else
            ref="leftForm"
            v-model="page.formData"
            :options="page.shift"
          ></i-form>
          <list-cell
            v-for="item in page.formData.columns"
            :key="item.id"
            :temp-type="page.formData.type"
            :info="item"
          />
        </a-col>
        <a-col :span="8" :offset="2">
          <div class="detail">
            <div class="top">
              <img
                v-if="[1, 2].includes(page.formData.type)"
                class="img"
                :src="logoUrl"
                alt=""
              />
              <h2 class="type">{{ typeHash[page.formData.type] }}</h2>
              <h2 class="type">仁和新城府城大道店</h2>
              <p v-if="page.formData.type !== 3" class="store-name"
                >仁和新城府城大道店</p
              >
            </div>
            <div class="middle">
              <img
                v-if="page.formData.type === 1"
                class="tip"
                src="@/assets/images/template-print.png"
                alt=""
              />
              <img
                v-else-if="page.formData.type === 2"
                class="tip"
                src="@/assets/images/temp-refund.png"
                alt=""
              />
              <img
                v-else-if="page.formData.type === 3"
                class="tip"
                src="@/assets/images/temp-shift.jpg"
                alt=""
              />
            </div>
            <div v-if="page.formData.type !== 3" class="bottom">
              <p v-if="show.terminal" class="bottom-each"
                ><span>终端号</span><span>343513543513535</span></p
              >
              <p v-if="show.flow" class="bottom-each"
                ><span>流水号</span><span>343513543513535</span></p
              >
              <p v-if="show.amount" class="bottom-each"
                ><span>交易金额</span><span>120.32</span></p
              >
              <p v-if="show.account" class="bottom-each"
                ><span>账户号</span><span>账户号</span></p
              >
              <p v-if="show.time" class="bottom-each"
                ><span>交易时间</span><span>2022年11月11日 11:11:11</span></p
              >
              <img v-if="qrCodeUrl" class="img" :src="qrCodeUrl" alt="" />
              <div class="remind">温馨提示</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import ListCell from './list-cell.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectPrintTemplateInfoIdGet,
    type CbdApiProjectPrintTemplateInfoIdGetResponse,
    cbdApiProjectPrintTemplateModifyPut
  } from '@/api';

  type EachColumn =
    Required<CbdApiProjectPrintTemplateInfoIdGetResponse>['columns'][0];
  interface Page {
    form: Recordable;
    shift: Recordable;
    formData: any;
  }
  const leftForm = ref<any>(null);
  const isLoading = ref(false);
  const typeHash: Recordable = {
    1: '结账单',
    2: '退款单',
    3: '交班单'
  };
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const page = reactive<Page>({
    formData: {
      logo: [],
      qrCode: [],
      qrCodePreUrl: '',
      logoUrl: ''
    },
    form: {
      menuForm: false,
      formCard: false,
      columns: [
        {
          label: 'logo上传',
          prop: 'logo',
          span: 18,
          rules: [{ required: true, message: 'logo必传' }]
        },
        {
          label: '打印联数',
          prop: 'printCopies',
          type: 'select',
          span: 18,
          props: {
            label: 'label',
            value: 'value'
          },
          dic: [
            {
              label: '一式一联',
              value: 1
            },
            {
              label: '一式二联',
              value: 2
            },
            {
              label: '一式三联',
              value: 3
            }
          ],
          rules: [{ required: true, message: '打印联数必选' }]
        },
        {
          label: '温馨提示',
          prop: 'reminder',
          type: 'textarea',
          maxLength: 500,
          span: 18,
          rules: [{ required: true, message: '请输入温馨提示' }]
        },
        {
          label: '二维码上传',
          prop: 'qrCode',
          span: 18,
          rules: [{ required: true, message: '二维码必传' }]
        }
      ]
    },
    shift: {
      menuForm: false,
      formCard: false,
      columns: [
        {
          label: '打印联数',
          prop: 'printCopies',
          type: 'select',
          span: 18,
          props: {
            label: 'label',
            value: 'value'
          },
          dic: [
            {
              label: '一式一联',
              value: 1
            },
            {
              label: '一式二联',
              value: 2
            },
            {
              label: '一式三联',
              value: 3
            }
          ],
          rules: [{ required: true, message: '打印联数必选' }]
        }
      ]
    }
  });
  const logoUrl = computed(() => {
    const logo = page.formData.logo[0] || {};
    return logo.previewAddress || logo.url;
  });
  const qrCodeUrl = computed(() => {
    const qrCode = page.formData.qrCode[0] || {};
    return qrCode.previewAddress || qrCode.url;
  });
  const [getData] = useFuncProxy(async () => {
    page.formData = await cbdApiProjectPrintTemplateInfoIdGet({
      id: String(props.id!)
    });
    if ([1, 2].includes(page.formData.type)) {
      page.formData.logo =
        page.formData.logoResource && page.formData.logoResource.resourceId
          ? [page.formData.logoResource]
          : [];
      page.formData.qrCode =
        page.formData.qrCodeResource && page.formData.qrCodeResource.resourceId
          ? [page.formData.qrCodeResource]
          : [];
    }
    page.formData.columns.forEach((el: EachColumn) => {
      el.children!.forEach((each: Recordable) => {
        each.checked = each.checked === 1;
      });
    });
  });

  const onSubmit = async () => {
    const e = await leftForm.value.submit();
    if (!e) {
      const arrTemp: number[] = [];
      const temp: {
        logoPreBatchCode?: string;
        logoResourceId?: string;
        qrCodePreBatchCode?: string;
        qrCodeResourceId?: string;
      } = {};
      // 交班单要传 columns = []
      if (page.formData.type !== 3) {
        const { logo, qrCode } = page.formData;
        page.formData.columns.forEach((el: EachColumn) => {
          el.children!.forEach((each: Recordable) => {
            if (each.checked === true && each.requireState === 2) {
              arrTemp.push(each.id);
            }
          });
        });
        temp.logoResourceId = logo[0].key || logo[0].resourceId;
        temp.logoPreBatchCode = page.formData.logoPreBatchCode;
        temp.qrCodeResourceId = qrCode[0].key || qrCode[0].resourceId;
        temp.qrCodePreBatchCode = page.formData.qrCodePreBatchCode;
      }
      // const {
      //   logo = [],
      //   qrCode = [],
      //   logoResource = {},
      //   qrCodeResource = {},
      //   ...data
      // } = {
      //   ...page.formData,
      //   ...temp,
      //   columns: arrTemp
      // };
      const data = {
        ...page.formData,
        ...temp,
        columns: arrTemp
      };
      delete data.logo;
      delete data.qrCode;
      delete data.logoResource;
      delete data.qrCodeResource;
      try {
        isLoading.value = true;
        await cbdApiProjectPrintTemplateModifyPut(data);
        emits('refresh');
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }
  };
  // 处理勾选后详情显示问题
  const show = computed(() => {
    const show = {
      terminal: false,
      flow: false,
      amount: false,
      account: false,
      time: false
    };
    page.formData.columns?.forEach((el: EachColumn) => {
      el.children!.forEach((each: Recordable) => {
        if (each.columnName === '终端号' && each.checked) {
          show.terminal = true;
        }
        if (each.columnName === '流水号' && each.checked) {
          show.flow = true;
        }
        if (each.columnName === '交易金额' && each.checked) {
          show.amount = true;
        }
        if (each.columnName === '账户号' && each.checked) {
          show.account = true;
        }
        if (each.columnName === '交易时间' && each.checked) {
          show.time = true;
        }
      });
    });
    return show;
  });
  onMounted(() => {
    if (props.id) getData();
  });
</script>

<style scoped lang="less">
  .detail {
    width: 320px;
    padding: 0 10px;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #dddddd;
    .top {
      padding-top: 20px;
      text-align: center;
      .img {
        display: block;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 50%;
      }
      .type {
        font-size: 20px;
        color: #666666;
        margin-bottom: 0;
      }
      .store-name {
        color: #383840;
        font-size: 15px;
        position: relative;
        text-align: left;
        padding-left: 16px;
        margin-bottom: -10px;
        z-index: 2;
        filter: blur(0.5px);
      }
    }
    .middle {
      width: 100%;
      text-align: center;
      .tip {
        width: 100%;
      }
    }
    .bottom {
      margin-top: -15px;
      padding: 0 16px;
      text-align: center;
      .bottom-each {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #383840;
        font-size: 15px;
        margin: 10px 0;
        font-weight: 500;
        filter: blur(0.5px);
      }
      .img {
        width: 160px;
        height: 160px;
        margin-top: 10px;
      }
      .remind {
        color: #383840;
        font-size: 14px;
        font-weight: 500;
        filter: blur(0.5px);
        padding: 12px 16px 50px;
      }
    }
  }
</style>
