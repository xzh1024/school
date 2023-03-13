import { ref, watch, unref, nextTick } from 'vue';
import type {
  BasicFormProps,
  ModalFormProps,
  FormActionType
} from '../typings/form';
export function useForm<T = BasicFormProps, M = Recordable>(props?: T) {
  type ActionType = FormActionType<T> & M;
  const formRef = ref<Nullable<ActionType>>();
  // const methods = ref<ActionType>();
  const loaded = ref(false);
  function getForm() {
    const form = unref(formRef);
    if (!form) {
      throw new Error('未找到当前表单实例，请在调用时确定表单是否已经创建');
    }
    return nextTick().then(() => form);
  }
  function register(formInstance: ActionType) {
    if (loaded.value) return;
    loaded.value = true;
    formRef.value = formInstance;
    if (!props) return;
    let Initialized = false;
    watch(
      () => unref(props),
      (val) => {
        if (props) {
          methods.setProps(val);
          if (Initialized) return;
          Initialized = true;
          methods.initDefault();
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
  }

  const methods = {
    getFieldsValue: async () => {
      const form = await getForm();
      return form.getFieldsValue();
    },
    setFieldsValue: <T = Recordable>(values: T) => {
      getForm().then((form) => {
        form.setFieldsValue(values);
      });
    },
    resetFields: () => {
      getForm().then((form) => form.resetFields());
    },
    setProps(formProps: Partial<T>) {
      getForm().then((form) => form.setProps(formProps));
    },
    clearValidate: (field?: string | string[]) => {
      getForm().then((form) => form.clearValidate(field));
    },
    validate: async (field: string | string[]) => {
      const form = await getForm();
      return form.validate(field);
    },
    submit: async () => {
      const form = await getForm();
      return form.submit();
    },
    initDefault: () => {
      getForm().then((form) => form.initDefault());
    }
  };
  return [register, methods, getForm] as const;
}

export function useModalForm<T = ModalFormProps>(props?: T) {
  const [register, m, getForm] = useForm<
    T,
    {
      show: () => void;
      hide: () => void;
    }
  >(props);
  const methods = {
    ...m,
    show() {
      getForm().then((form) => {
        form.show();
      });
    },
    hide() {
      getForm().then((form) => {
        form.hide();
      });
    }
  };
  return [register, methods] as const;
}
