<template>
  <drawer
    v-model="visible"
    show-log
    :mask-close="false"
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_energy_consumption_device'
    }"
    title="查看能耗设备"
    width="60%"
    @cancel="visible = false"
  >
    <div class="detail_box">
      <a-card :bordered="false">
        <div class="title">铺位信息</div>
        <a-descriptions
          title=""
          :label-style="{ color: '#999999' }"
          layout="vertical"
          :column="{ xs: 1, md: 3, lg: 4 }"
        >
          <a-descriptions-item label="归属项目">{{
            detail.projectName
          }}</a-descriptions-item>
        </a-descriptions>
        <a-table
          :data="berthData"
          :pagination="false"
          :summary="summary"
          style="margin-top: 16px"
        >
          <template #columns>
            <a-table-column
              v-for="(item, index) in columns"
              :key="index"
              :title="item.title"
              :width="item.width"
              :data-index="item.dataIndex"
            >
              <template #cell="{ record, rowIndex }">
                <span v-if="item.dataIndex === '_index'">{{
                  record.sum ? record.sum : rowIndex + 1
                }}</span>
                <span v-else>{{ record[item.dataIndex] }}</span>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-card>
      <a-card :bordered="false">
        <div class="title" style="margin-bottom: 8px">基本信息</div>
        <div class="info_ul">
          <div
            v-for="(item, index) in descripData"
            :key="index"
            class="info_li"
          >
            <span>{{ item.label }}</span>
            <div>{{ item.value }}</div>
          </div>
        </div>
      </a-card>
      <a-card :bordered="false">
        <div class="title">设备信息</div>
        <div class="codeBox">
          <vueQrCom
            :margin="0"
            :text="qrCodeInfo"
            :callback="getImageData"
          ></vueQrCom>
          <div class="btn_box flex justify-center">
            <a-button
              type="primary"
              style="margin-top: 10px; width: 80px; padding: 0"
              @click="onDownCode"
              >下载二维码</a-button
            >
          </div>
        </div>
      </a-card>
    </div>
    <template #footer>
      <a-button class="cancel_btn" @click="visible = false">取消</a-button>
      <a-button
        v-if="detail?.ecRecordState == 2"
        type="primary"
        @click="onUpdate"
        >修改</a-button
      >
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { ref, computed, watch } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import NP from 'number-precision';
  import vueQrCom from 'vue-qr/src/packages/vue-qr.vue';
  import {
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet,
    CbdApiProjectEstateEnergyConsumeDeviceInfoIdGetResponse as detailDataType
  } from '@/api';
  import type { berthDataType } from '../type/useAddModel';
  import {
    deviceTypeList,
    IntellectDeviceList,
    rateTypeList
  } from '@/utils/dic';
  import dayjs from 'dayjs';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: undefined
    }
  });
  const emits = defineEmits(['update:modelValue', 'update']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  type dataType = {
    acreage?: string;
    useAcreage?: string;
  };
  const summary = ({ data }: any) => {
    const countData = {
      floorage: 0,
      useArea: 0
    };
    data?.forEach((record: dataType) => {
      countData.floorage = NP.plus(countData.floorage, Number(record?.acreage));
      countData.useArea = NP.plus(
        countData.useArea,
        Number(record?.useAcreage)
      );
    });
    return [
      {
        sum: '合计',
        acreage: countData.floorage,
        useAcreage: countData.useArea
      }
    ];
  };
  const onUpdate = () => {
    emits('update', { id: props.id });
  };
  const qrCodeInfo = ref('');
  const base64_ImgUrl = ref('');
  const getImageData = (code: string) => {
    base64_ImgUrl.value = code;
  };
  function base64ToBlob(code: any) {
    const parts = code.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]); // 解码base64得到二进制字符串
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength); // 创建8位无符号整数值的类型化数组
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i); // 数组接收二进制字符串
    }
    return new Blob([uInt8Array], { type: contentType });
  }
  const onDownCode = () => {
    const aLink = document.createElement('a');
    const blob = base64ToBlob(base64_ImgUrl.value);
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = `二维码(${dayjs(new Date()).format(
      'YYYY-MM-DD HH-mm-ss'
    )})`;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
  };
  const descripData = computed(() => {
    return [
      {
        label: '设备类型',
        value: deviceTypeList.find(
          (item) => item.value == detail.value.deviceType
        )?.label
      },
      {
        label: '设备编号',
        value: detail.value.deviceCode
      },
      {
        label: '设备名称',
        value: detail.value.deviceName
      },
      {
        label: '是否智能设备',
        value: IntellectDeviceList.find(
          (item) => item.value == detail.value.intelligentDevice
        )?.label
      },
      {
        label: '费用项目',
        value: detail.value.expenseItemName
      },
      {
        label: '倍率',
        value: detail.value.rate
      },
      {
        label: '设备最大读数',
        value:
          detail.value.deviceType == 2
            ? `${detail.value.deviceMaxReadOut || 0}kwh`
            : `${detail.value.deviceMaxReadOut || 0}m³`
      },
      {
        label: '损耗率',
        value: `${detail.value.lossRate}%`
      },
      {
        label: '上期抄录日期',
        value: detail.value.previousMeterReadingDate
      },
      {
        label: '上期读数',
        value:
          detail.value.deviceType == 2
            ? `${detail.value.nowReadOutNum || 0}kwh`
            : `${detail.value.nowReadOutNum || 0}m³`
      },
      {
        label: '单价',
        value:
          detail.value.deviceType == 2
            ? `${detail.value.price || 0}元/kwh`
            : `${detail.value.price || 0}元/m³`
      },
      {
        label: '税率',
        value: `${
          rateTypeList.find((item) => item.value == detail.value.rateType)
            ?.label
        } ${detail.value.rateNum}%`
      },
      {
        label: '品牌',
        value: detail.value.brand || '--'
      },
      {
        label: '硬件编号',
        value: detail.value.hardwareCode || '--'
      }
    ];
  });
  const columns = [
    {
      title: '序号',
      dataIndex: '_index',
      width: 75,
      align: '' as any
    },
    {
      title: '楼宇',
      dataIndex: 'buildingName'
    },
    {
      title: '楼层',
      dataIndex: 'buildingFloorName'
    },
    {
      title: '铺位号',
      dataIndex: 'estateSnapshotName'
    },
    {
      title: '建筑面积(㎡)',
      dataIndex: 'acreage'
    },
    {
      title: '使用面积(㎡)',
      dataIndex: 'useAcreage'
    }
  ];
  const berthData = ref<berthDataType[]>([]);
  const detail = ref<detailDataType>({} as detailDataType);
  const [initEditInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet({
      id: String(props.id)
    });
    detail.value = { ...res };
    berthData.value = detail.value.estateSnapshotList || [];
    const currentQrcodeInfo = {
      deviceType: detail.value.deviceType,
      deviceId: detail.value.id
    };
    qrCodeInfo.value = JSON.stringify(currentQrcodeInfo);
  });
  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.id) {
        initEditInfo();
      }
    }
  );
  watch(
    () => props.refresh,
    (v) => {
      if (v && props.id) {
        initEditInfo();
      }
    }
  );
</script>
<style scoped lang="less">
  // .cancel_btn {
  //   width: 104px;
  //   height: 40px;
  //   color: #4c8af7;
  //   background: #dbe8fd;
  //   border-radius: 4px;
  // }
  .detail_box {
    width: 100%;
    height: 100%;
    overflow: auto;

    .info_ul {
      display: flex;
      flex-wrap: wrap;

      .info_li {
        width: 25%;
        display: flex;
        flex-direction: column;
        margin-top: 16px;

        & > span {
          font-size: 14px;
          font-family: PingFang SC-Medium, PingFang SC;
          color: #999999;
          line-height: 22px;
          margin-bottom: 8px;
        }

        & > div {
          font-size: 14px;
          font-family: PingFang SC-Medium, PingFang SC;
          color: #333333;
          line-height: 22px;
          word-break: break-all;
          padding-right: 10px;
        }
      }
    }

    .codeBox {
      display: flex;
      flex-direction: column;
      width: 120px;

      :deep(img) {
        width: 120px;
        height: 120px;
      }
    }

    .title {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
      margin-bottom: 16px;
    }
  }
</style>
