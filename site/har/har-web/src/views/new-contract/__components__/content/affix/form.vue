<template>
  <div class="contract-affix-container">
    <a-spin :loading="loading" style="width: 100%">
      <a-form
        ref="formRef"
        :model="formModel"
        layout="vertical"
        style="padding: 12px 16px; background: #fff"
      >
        <div class="contract-content">
          <a-form-item class="a-form-item--hide-label">
            <a-table
              :pagination="false"
              :data="formModel.misContractFileDetailVos"
              style="width: 100%"
            >
              <template #columns>
                <a-table-column title="序号" :width="160">
                  <template #cell="{ record, rowIndex }">
                    <a-form-item
                      :field="`misContractFileDetailVos.${rowIndex}.uploadRage`"
                      :rules="[
                        { required: true, validator: validateUpdateStatus }
                      ]"
                      :validate-trigger="['change', 'blur']"
                      class="a-form-item--hide-label a-form-item--inline-error"
                      required
                    >
                      <a-space>
                        <span>{{ rowIndex + 1 }}</span>
                        <a-tag
                          v-if="
                            record.uploadRage >= 0 && record.uploadRage < 100
                          "
                          color="blue"
                        >
                          上传中{{ record.uploadRage }}%
                        </a-tag>
                        <a-tag
                          v-else-if="record.uploadRage === 100"
                          color="green"
                        >
                          上传完成
                        </a-tag>
                        <a-tag v-else-if="record.uploadRage === -1" color="red">
                          上传失败
                        </a-tag>
                      </a-space>
                    </a-form-item>
                  </template>
                </a-table-column>
                <a-table-column title="附件名称">
                  <template #cell="{ record }">
                    <a-form-item
                      class="a-form-item--hide-label a-form-item--inline-error"
                    >
                      {{ record.fileName }}
                    </a-form-item>
                  </template>
                </a-table-column>
                <a-table-column title="说明">
                  <template #cell="{ record }">
                    <!--:rules="[{ required: true, message: '必填项' }]"-->
                    <!--:field="`misContractFileDetailVos.${rowIndex}.describe`"-->
                    <!--:validate-trigger="['change', 'blur']"-->
                    <a-form-item
                      class="a-form-item--hide-label a-form-item--inline-error"
                      required
                    >
                      <a-input
                        v-model="record.describe"
                        :max-length="200"
                      ></a-input>
                    </a-form-item>
                  </template>
                </a-table-column>
                <a-table-column title="操作" :width="120">
                  <template #cell="{ record, rowIndex }">
                    <a-space>
                      <a-popconfirm
                        content="确定要删除？"
                        @ok="
                          formModel.misContractFileDetailVos &&
                            formModel.misContractFileDetailVos.splice(
                              rowIndex,
                              1
                            )
                        "
                      >
                        <a-button type="text"> 删除 </a-button>
                      </a-popconfirm>
                      <a-button
                        :disabled="
                          record.uploadRage != null && record.uploadRage < 100
                        "
                        type="text"
                        @click="handlePreview(record)"
                      >
                        预览
                      </a-button>
                      <a-button
                        :disabled="
                          record.uploadRage != null && record.uploadRage < 100
                        "
                        type="text"
                        @click="handleDownload(record)"
                      >
                        下载
                      </a-button>
                    </a-space>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </a-form-item>
        </div>
        <div style="margin-top: 24px">
          <a-form-item class="a-form-item--hide-label" style="width: 100%">
            <choose-file @choose-files="handleChooseFiles" />
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
    <FooterBtn
      :need-pre="true"
      :need-left-btn="false"
      @on-pre="emit('on-pre')"
      @on-cancel="emit('on-cancel')"
      @on-update="emit('on-update')"
      @on-next="handleSave(2)"
      @on-save="handleSave(1)"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ContractAffix'
  };
</script>

<script setup lang="ts">
import {cloneDeep} from 'lodash';
import {onMounted, PropType, ref} from 'vue';

import {useApi} from './use-api';
import FooterBtn from '../../footer-btn.vue';
import ChooseFile from '@/components/choose-file/index.vue';
import {useContractStore} from '@/store/project/contract';
import {
  FileSaveReq,
  MisContractFileDetailVo,
  MisContractFileDetailVoType,
} from './interface';
import {customOssRequest, IProgressEvent} from '@/utils/oss-upload';
import {Message} from '@arco-design/web-vue';
import {useAsyncTasks} from '@/hooks/use-async-tasks';
import {
  FORM_VALIDATE_ERROR_TEXT,
  WAIT_LOADING_TEXT,
} from '@/config/message';
import {download, genUUID} from '@/utils';

const emit = defineEmits([
  'on-update',
  'on-pre',
  'on-save',
  'on-cancel',
  'on-next',
]);
const props = defineProps({
  isEdit: Boolean as PropType<boolean>,
    contractId: String as PropType<string>
  });

  const { contractInfo, drawerVisible, tableRefresh } = useContractStore();
  const { saveApi, detailApi } = useApi(contractInfo.contractType);
  const { loading, execAsyncTasks } = useAsyncTasks();

const formRef = ref();
const formModel = ref<FileSaveReq>(new FileSaveReq());

  function validateUpdateStatus(
    value: number | undefined | null,
    callback: Function
  ) {
    if (value === -1) {
      callback('该文件上传失败');
    } else if (typeof value === 'number' && value >= 0 && value < 100) {
      callback('该文件还在上传中');
    } else {
      callback();
    }
  }

  function handlePreview(row: MisContractFileDetailVo) {
    window.open(row.fileUrl);
  }

  function handleChooseFiles(files: Array<File>) {
    files.forEach(async (file) => {
      if (!file) {
        return;
      }
      const misContractFileDetailVo = new MisContractFileDetailVo();

      formModel.value.misContractFileDetailVos?.push(misContractFileDetailVo);
      misContractFileDetailVo.uploadRage = 0;
      misContractFileDetailVo.fileName = file.name;
      const res = await customOssRequest(file, undefined, undefined, {
        onUploadProgress(progressEvent: IProgressEvent) {
          const uploadRate = progressEvent.uploadRate as number;
          const rowIndex =
            formModel.value.misContractFileDetailVos?.findIndex(
              (itm) => itm.uid === misContractFileDetailVo.uid
            ) ?? -1;
          const row = formModel.value.misContractFileDetailVos?.[rowIndex];
          if (row) {
            row.uploadRage = uploadRate;
            if (uploadRate === 100) {
              formRef.value.clearValidate(
                `misContractFileDetailVos.${rowIndex}.uploadRage`,
              );
            }
          }
        }
      });
      const row = formModel.value.misContractFileDetailVos?.find(
        (itm) => itm.uid === misContractFileDetailVo.uid,
      );
      if (row) {
        row.fileId = res.key;
        row.fileUrl = res.url;
      }
    });
  }

  function handleDownload(row: MisContractFileDetailVo) {
    download(row.fileUrl, row.fileName, {
      'response-content-disposition': `attachment;filename=${encodeURIComponent(
        row.fileName,
      )}`,
    });
  }

  async function handleSave(type = 1) {
    if (loading.value && type === 2) {
      emit('on-next');
      return;
    }
    if (loading.value) {
      Message.warning(WAIT_LOADING_TEXT);
      return;
    }
    const error = await formRef.value.validate();
    if (error) {
      Message.error(FORM_VALIDATE_ERROR_TEXT);
      return;
    }
    const entity = cloneDeep(formModel.value);
    entity.contractId = contractInfo.contractId as number;
    // 提交类型1、保存2、下一步
    entity.type = type;
    await execAsyncTasks([saveApi(entity)]);
    type === 1 ? emit('on-save') : emit('on-next');
  }

  onMounted(async () => {
    const contractId = contractInfo.contractId as string;

    const tasks = [];
    if (props.isEdit) {
      tasks.push(
        detailApi({
          contractId: contractId
        }).then((res) => {
          formModel.value = res as FileSaveReq;
          formModel.value.misContractFileDetailVos?.forEach(
            (itm: MisContractFileDetailVoType) => {
              if ('coverPic' in itm) {
                itm.fileUrl = itm.coverPic?.[0]?.previewAddress ?? '';
              }
            },
          );
        })
      );
    }

    await execAsyncTasks(tasks);
  });
</script>

<style lang="less" scoped>
  ::v-deep .arco-upload-list-picture {
    display: none;
  }
  ::v-deep .i-card {
    padding: 0;
    margin: 0;
  }
  .contract-affix-container {
    margin: 16px;
  }
</style>
