<template>
  <DragForm
    v-model="formValue"
    :rule="rule"
    :option="option"
    @update:model-value="onInput"
  />
</template>

<script setup lang="ts" name="Validate">
  import { designerForm } from '../utils/form';
  import { computed, inject, PropType, ref, watch } from 'vue';

  const designer = inject<any>('designer');
  const DragForm = designerForm.$form();

  const props = defineProps({
    modelValue: {
      type: Array as PropType<any>
    }
  });

  const emits = defineEmits(['update:modelValue']);

  const formValue = ref({});
  const option = ref({
    form: {
      'label-col-props': {
        span: 24
      },
      'label-align': 'left',
      'wrapper-col-props': {
        span: 24
      },
      'size': 'small'
    },
    submitBtn: false,
    formData: parseValue(props.modelValue)
  });

  const rule = computed(() => {
    return [
      {
        type: 'select',
        field: 'type',
        value: '',
        title: '字段类型',
        options: [
          { value: 'string', label: 'String' },
          { value: 'array', label: 'Array' },
          { value: 'number', label: 'Number' },
          { value: 'integer', label: 'Integer' },
          { value: 'float', label: 'Float' },
          { value: 'object', label: 'Object' },
          { value: 'date', label: 'Date' },
          { value: 'url', label: 'url' },
          { value: 'hex', label: 'hex' },
          { value: 'email', label: 'email' }
        ],
        props: {
          placeholder: '请选择字段类型',
          allowClear: true
        },
        control: [
          {
            handle: (v: string) => {
              return !!v;
            },
            rule: [
              {
                type: 'group',
                field: 'validate',
                props: {
                  expand: 1,
                  rule: [
                    {
                      type: 'select',
                      title: '触发方式',
                      field: 'trigger',
                      value: 'change',
                      options: [
                        { label: 'change', value: 'change' },
                        { label: 'submit', value: 'submit' },
                        { label: 'blur', value: 'blur' }
                      ]
                    },
                    {
                      type: 'select',
                      title: '验证方式',
                      field: 'mode',
                      options: [
                        { value: 'required', label: '必填' },
                        { value: 'pattern', label: '正则表达式' },
                        { value: 'min', label: '最小值' },
                        { value: 'max', label: '最大值' },
                        { value: 'len', label: '长度' }
                      ],
                      value: 'required',
                      control: [
                        {
                          value: 'required',
                          rule: [
                            {
                              type: 'hidden',
                              field: 'required',
                              value: true
                            }
                          ]
                        },
                        {
                          value: 'pattern',
                          rule: [
                            {
                              type: 'input',
                              field: 'pattern',
                              title: '正则表达式'
                            }
                          ]
                        },
                        {
                          value: 'min',
                          rule: [
                            {
                              type: 'inputNumber',
                              field: 'min',
                              title: '最小值'
                            }
                          ]
                        },
                        {
                          value: 'max',
                          rule: [
                            {
                              type: 'inputNumber',
                              field: 'max',
                              title: '最大值'
                            }
                          ]
                        },
                        {
                          value: 'len',
                          rule: [
                            {
                              type: 'inputNumber',
                              field: 'len',
                              title: '长度'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: 'input',
                      title: '错误信息',
                      field: 'message',
                      value: '',
                      children: [
                        {
                          type: 'span',
                          slot: 'append',
                          inject: true,
                          class: 'append-msg',
                          on: {
                            click: (inject: any) => {
                              if (designer.value.activeRule) {
                                let msg = '请输入';
                                if (inject.api.form.mode !== 'required') {
                                  msg += '正确的';
                                }
                                msg += designer.value.activeRule.title;
                                inject.api.setValue('message', msg);
                              }
                            }
                          },
                          children: ['自动获取']
                        }
                      ]
                    }
                  ]
                },
                value: []
              }
            ]
          }
        ]
      }
    ];
  });

  function onInput(formData: any) {
    let val: any = [];
    const { validate, type } = formData;
    if (type && (!validate || !validate.length)) return;
    if (type) {
      validate.forEach((v: { type: any }) => {
        v.type = type;
      });
      val = [...validate];
    }

    emits('update:modelValue', val);
  }

  function parseValue(n: string | any[]) {
    const val = {
      validate: n ? [...n] : [],
      type: n.length ? n[0].type : undefined
    };
    val.validate.forEach((v) => {
      if (!v.mode) {
        Object.keys(v).forEach((k) => {
          if (['message', 'type', 'trigger', 'mode'].indexOf(k) < 0) {
            v.mode = k;
          }
        });
      }
    });

    return val;
  }

  watch(
    () => props.modelValue,
    (v) => {
      formValue.value = parseValue(v);
    }
  );
</script>
