<script lang="tsx">
  import {
    ref,
    Ref,
    computed,
    PropType,
    useSlots,
    Component,
    WatchStopHandle,
    defineComponent,
    ComponentPublicInstance,
    watch
  } from 'vue';
  import { merge } from 'lodash';
  import { Drawer, Message, Modal } from '@arco-design/web-vue';
  import { genUUID } from '@/utils';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';

  type FormComponentInstance = ComponentPublicInstance & {
    resetFields?(): void;
    validate?(): Promise<unknown>;
    getReactiveFormModel?(): undefined | Ref<Recordable>;
  };

  export default defineComponent({
    name: 'TestDialog',
    props: {
      drawer: {
        type: Boolean,
        default: true
      },
      formComponent: {
        required: true,
        // Vue组件
        type: Object as PropType<Component>
      },
      api: {
        type: [Function] as PropType<(data: any) => Promise<unknown>>
      },
      detailApi: {
        type: [Function] as PropType<(data: any) => Promise<unknown>>
      },
      autoRequsetDetail: {
        type: Boolean,
        default: true
      },
      width: String,
      successMsg: String,
      hideOk: Boolean,
      hideCancel: Boolean,
      okText: String,
      cancelText: String,
      okButtonProps: {
        type: Object,
        default: () => ({})
      },
      cancelButtonProps: {
        type: Object,
        default: () => ({})
      },
      background: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        // ADD DETAIL EDIT
        default: 'ADD'
      }
    },
    emits: ['success'],
    setup(props, { attrs, expose, emit }) {
      const formRef = ref<FormComponentInstance | undefined>();
      const formModel = ref<Recordable>({});
      const loadingOk = ref(false);
      const loadingDetail = ref(false);
      const currentVisible = ref(false);
      const openData = ref<Recordable>({});
      const openType = ref('ADD');
      const title = ref('');

      const slots = useSlots();
      const DialogComp = computed(() => (props.drawer ? Drawer : Modal));
      const loading = computed(() => loadingDetail.value || loadingOk.value);

      watch(
        () => openData.value,
        (val) => {
          formModel.value = val;
        },
        { immediate: true }
      );
      watch(
        () => props.type,
        (val) => {
          openType.value = val;
        },
        { immediate: true }
      );

      let fmWatcher: WatchStopHandle | undefined;
      watch(
        () => formRef.value,
        () => {
          if (formRef.value) {
            const fm = formRef.value?.getReactiveFormModel?.();
            if (fm) {
              fmWatcher && fmWatcher();
              fmWatcher = watch(
                () => fm.value,
                (val) => {
                  formModel.value = val;
                },
                { immediate: true }
              );
            } else {
              formModel.value = openData.value;
            }
          }
        },
        {
          immediate: true
        }
      );

      let openUid: string;
      const initData = ref<{
        config: OpenConfig;
        data?: OpenData;
      }>();

      async function getDetail() {
        if (!props.detailApi) return;
        try {
          loadingDetail.value = true;
          const recordOpenUid = openUid;
          const res = (await props.detailApi(
            initData.value?.data as Recordable
          )) as Recordable;
          if (recordOpenUid === openUid) {
            openData.value = res;
            openType.value = initData.value?.config.type as string;
          }
        } finally {
          loadingDetail.value = false;
        }
      }
      async function open(config: OpenConfig, data?: OpenData) {
        initData.value = {
          config,
          data
        };
        const uid = genUUID();
        currentVisible.value = true;
        openUid = uid;
        config = merge(
          {
            type: 'ADD',
            resetForm: true
          },
          config
        );
        data = data ?? {};

        // 重置一些状态
        loadingOk.value = false;
        if (config.resetForm === true) {
          formRef.value?.resetFields && formRef.value?.resetFields?.();
        }

        if ('title' in config) {
          title.value = config.title as string;
        } else {
          title.value =
            config.type === 'ADD'
              ? '新增'
              : config.type === 'EDIT'
              ? '编辑'
              : config.type === 'DETAIL'
              ? '详情'
              : '';
        }

        if (typeof props.detailApi === 'function') {
          await getDetail();
        } else {
          loadingDetail.value = false;
          openData.value = data as Recordable;
          openType.value = config.type as string;
        }
      }

      async function handleOk() {
        if (formRef.value?.validate) {
          const data = await formRef.value?.validate?.();
          const recordOpenUid = openUid;
          if (typeof props.api === 'function') {
            try {
              loadingOk.value = true;
              const res = await props.api(data);
              if (recordOpenUid === openUid) {
                currentVisible.value = false;
                // 重置表单
                formRef.value?.resetFields &&
                  (await formRef.value?.resetFields?.());
                if (props.successMsg) {
                  Message.success(props.successMsg);
                }
                emit('success', res);
              }
            } finally {
              if (recordOpenUid === openUid) {
                loadingOk.value = false;
              }
            }
          } else {
            currentVisible.value = false;
          }
        }
      }

      function close() {
        currentVisible.value = false;
      }

      function handleCancel() {
        close();
      }
      type ExecAsyncTaskConfig = {
        // 异步执行函数
        executor: () => Promise<unknown>;
        // 执行成功&是当前打开的窗口情况下，执行的回调
        completeCallback?: () => void;
        // 成功和失败都会执行的回调
        finallyCallback?: () => void;
      };
      /*
     async executor() {
       // 执行异步任务
       loading.value = true;
     },
     completeCallback() {
       // 执行完成关闭弹窗，emit成功事件
       dialogRef.value.close();
       emit('success');
     },
     finallyCallback() {
       // 关闭loading状态
       loading.value = false;
     }
      */
      async function execAsyncTask(
        executor: Function | ExecAsyncTaskConfig,
        completeCallback?: Function,
        finallyCallback?: Function
      ) {
        const executorFunc =
          typeof executor === 'function' ? executor : executor.executor;
        const completeCallbackFunc =
          typeof completeCallback === 'function'
            ? completeCallback
            : typeof executor !== 'function' && executor.completeCallback;
        const finallyCallbackFunc =
          typeof finallyCallback === 'function'
            ? finallyCallback
            : typeof executor !== 'function' && executor.finallyCallback;
        try {
          const recordOpenUid = openUid;
          await executorFunc();
          if (recordOpenUid === openUid) {
            completeCallbackFunc && completeCallbackFunc?.();
          }
        } finally {
          finallyCallbackFunc && finallyCallbackFunc?.();
        }
      }
      function getFormRef() {
        return formRef.value;
      }

      expose({
        open,
        close,
        getFormRef,
        execAsyncTask
      });

      return () => {
        const formComponent = props.formComponent as Component;
        const footerVNode =
          slots.footer?.({
            loading: loadingOk.value,
            disabled: loading.value,
            data: formModel.value,
            record: formModel.value
          }) ?? [];
        if (!props.hideOk) {
          footerVNode.unshift(
            <a-button
              data-sort="-10"
              type="primary"
              loading={loadingOk.value}
              disabled={loading.value}
              onClick={handleOk}
              {...props.okButtonProps}
            >
              {props.okText ? props.okText : '确定'}
            </a-button>
          );
        }
        if (!props.hideCancel) {
          footerVNode.unshift(
            <a-button
              data-sort="-20"
              onClick={handleCancel}
              {...props.cancelButtonProps}
            >
              {props.cancelText ? props.cancelText : '取消'}
            </a-button>
          );
        }

        const renderFooterVNode = footerVNode.sort((a, b) => {
          const tpl1 = Number(a.props?.['data-sort'] ?? a.props?.['dataSort']);
          const tpl2 = Number(b.props?.['data-sort'] ?? b.props?.['dataSort']);
          const sort1 = Number.isNaN(tpl1) ? 0 : tpl1;
          const sort2 = Number.isNaN(tpl2) ? 0 : tpl2;
          return sort1 - sort2;
        });
        return (
          <>
            <DialogComp.value
              {...attrs}
              width={props.width}
              visible={currentVisible.value}
              onCancel={() => (currentVisible.value = false)}
              v-slots={{
                header: () => (
                  <div>
                    <div>{title.value}</div>
                    <span class="icon-close" onClick={close.bind(this)}>
                      <icon-close />
                    </span>
                  </div>
                ),
                footer: () => <>{renderFooterVNode}</>
              }}
              class={`dialog ${
                props.background ? 'dialog--background' : undefined
              }`}
            >
              <div>
                <a-spin loading={loading.value} size={32} style="width: 100%">
                  <formComponent
                    ref={(v: unknown) =>
                      (formRef.value = v as FormComponentInstance)
                    }
                    type={openType.value}
                    data={openData.value}
                    visible={currentVisible.value}
                    {...(props.autoRequsetDetail
                      ? { onSuccess: getDetail }
                      : {})}
                  />
                </a-spin>
              </div>
            </DialogComp.value>
          </>
        );
      };
    }
  });
</script>

<style lang="less">
  .dialog--background {
    > .arco-drawer {
      > .arco-drawer-body {
        background-color: #f7f7f7;
      }
    }
  }
  .dialog {
    > .arco-drawer {
      overflow: visible;
      .icon-close {
        width: 46px;
        height: 46px;
        position: absolute;
        left: -46px;
        top: 0;
        z-index: 11;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px 0px 0px 4px;
        color: #fff;
        text-align: center;
        line-height: 46px;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
</style>
