<template>
  <a-layout class="layout-section">
    <a-layout-sider class="group-panel" :width="266">
      <template v-for="(item, index) in menuList" :key="index">
        <h4 class="title">{{ item.title }}</h4>
        <draggable
          class="group"
          :group="{ name: 'default', pull: 'clone', put: false }"
          :sort="false"
          item-key="name"
          :list="item.list"
        >
          <template #item="{ element }">
            <div class="group-item">
              <i class="fc-icon icon" :class="element.icon || 'icon-input'" />
              <span class="name">{{ element.label }}</span>
            </div>
          </template>
        </draggable>
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="m-tools" height="45">
        <a-space>
          <slot name="handle"></slot>
          <a-button type="primary" size="small" @click="onSave">保存</a-button>
          <a-button type="primary" size="small" @click="previewFc">
            预览
          </a-button>
          <a-popconfirm
            content="清空后将不能恢复，确定要清空吗？"
            width="200px"
            confirm-button-text="清空"
            cancel-button-text="取消"
            @ok="clearDragRule"
          >
            <a-button size="small">清空</a-button>
          </a-popconfirm>
        </a-space>
      </a-layout-header>
      <a-layout-content>
        <div class="main">
          <DragForm
            v-model:api="dragForm.api"
            class="main-content"
            :rule="dragForm.rule"
            :option="form.value"
          />
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider :width="320">
      <a-layout class="config-panel">
        <a-layout-header height="40px" class="tabs">
          <a-radio-group v-model="activeTab" type="button" class="tab">
            <a-radio v-if="!!activeRule" value="props">组件配置</a-radio>
            <a-radio value="form">表单配置</a-radio>
          </a-radio-group>
        </a-layout-header>
        <div class="form-panel">
          <div v-show="activeTab === 'form'">
            <!--ElMain-->
            <DragForm
              v-model="form.value.form"
              :rule="form.rule"
              :option="form.option"
            />
          </div>
          <!--ElMain-->
          <div v-show="activeTab === 'props'">
            <a-divider v-if="showBaseRule">基础配置</a-divider>
            <DragForm
              v-show="showBaseRule"
              v-model:api="baseForm.api"
              :rule="baseForm.rule"
              :option="baseForm.options"
              @change="baseChange"
            />
            <a-divider>属性配置</a-divider>
            <DragForm
              v-model:api="propsForm.api"
              :rule="propsForm.rule"
              :option="propsForm.options"
              @change="propChange"
              @remove-field="propRemoveField"
            />
            <!-- <a-divider v-if="showBaseRule">验证规则</a-divider>
            <DragForm
              v-show="showBaseRule"
              v-model:api="validateForm.api"
              :rule="validateForm.rule"
              :option="validateForm.options"
              @update:modelValue="validateChange"
            /> -->
          </div>
        </div>
      </a-layout>
    </a-layout-sider>
    <a-modal v-model:visible="preview.state" title="预览" width="800px">
      <ViewForm
        v-if="preview.state"
        :rule="preview.rule"
        :option="preview.option"
      />
    </a-modal>
  </a-layout>
</template>

<script lang="ts" setup name="FcDesigner">
  // @ts-nocheck
  import formOptions from '../config/base/form';
  import field from '../config/base/field';
  import validate from '../config/base/validate';
  import { deepCopy } from '@form-create/utils/lib/deepextend';
  import is, { hasProperty } from '@form-create/utils/lib/type';
  import { lower } from '@form-create/utils/lib/tocase';
  import ruleList from '../config/rule';
  import draggable from 'vuedraggable/src/vuedraggable';
  import createMenu from '../config/menu';
  import { upper } from '../utils/index';
  import formCreate, { designerForm, formConfig } from '../utils/form';
  import { projectComponent, buildingComponent } from '../utils/config';
  import { reactive, ref, provide, nextTick, watch } from 'vue';

  const DragForm = designerForm.$form();
  const ViewForm = formCreate.$form();

  const emits = defineEmits(['save']);

  const menuList = ref(createMenu());

  const cacheProps = ref({});
  const moveRule = ref();
  const addRule = ref();
  const added = ref();
  const activeTab = ref('form');
  const activeRule = ref();
  const children = ref([]);
  const showBaseRule = ref(false);
  const preview = reactive({
    state: false,
    rule: [],
    option: {}
  });
  const dragForm = reactive<any>({
    rule: [],
    api: {
      rule: []
    }
  });
  const form = ref({
    rule: formOptions(),
    option: {
      form: formConfig,
      submitBtn: false
    },
    value: {
      form: {
        inline: false,
        hideRequiredAsterisk: false,
        labelPosition: 'right',
        size: 'small',
        formCreateSubmitBtn: false,
        formCreateResetBtn: false
      },
      submitBtn: false
    }
  });
  const baseForm = reactive<any>({
    rule: field(),
    api: {},
    options: {
      form: formConfig,
      submitBtn: false,
      mounted: (fapi) => {
        fapi.activeRule = activeRule.value;
        fapi.setValue(fapi.options.formData || {});
      }
    }
  });
  const validateForm = reactive<any>({
    rule: validate(),
    api: {},
    options: {
      formData: {},
      form: formConfig,
      submitBtn: false,
      mounted: (fapi) => {
        fapi.activeRule = activeRule.value;
        fapi.setValue(fapi.options.formData || {});
      }
    }
  });
  const propsForm = reactive<any>({
    rule: [],
    api: {},
    options: {
      form: formConfig,
      submitBtn: false,
      mounted: (fapi) => {
        fapi.activeRule = activeRule.value;
        fapi.setValue(fapi.options.formData || {});
      }
    }
  });

  watch(
    () => preview.state,
    (n) => {
      if (!n) {
        nextTick(() => {
          preview.rule = [];
          preview.option = [];
        });
      }
    }
  );

  function makeChildren(children) {
    return reactive({ children }).children;
  }

  function getParent(rule) {
    let parent = rule.__fc__.parent.rule;
    const config = parent.config;
    if (config && config.config.inside) {
      rule = parent;
      parent = parent.__fc__.parent.rule;
    }
    return { root: parent, parent: rule };
  }

  function makeDrag(group, tag, children, on) {
    return {
      type: 'DragBox',
      wrap: {
        show: false
      },
      col: {
        show: false
      },
      inject: true,
      props: {
        rule: {
          props: {
            tag: 'a-col',
            group: group === true ? 'default' : group,
            ghostClass: 'ghost',
            animation: 150,
            handle: '.drag-btn',
            emptyInsertThreshold: 0,
            direction: 'vertical',
            itemKey: 'type'
          }
        },
        tag
      },
      children,
      on
    };
  }

  function clearDragRule() {
    // setRule([]);
    // setRule([projectComponent]);
    // console.log(dragForm.rule);
    dragForm.rule = [
      projectComponent,
      buildingComponent,
      ...makeDragRule(makeChildren([]))
    ];
  }

  function makeDragRule(children) {
    return makeChildren([
      makeDrag(true, 'draggable', children, {
        add: (inject, evt) => dragAdd(children, evt),
        end: (inject, evt) => dragEnd(children, evt),
        start: () => dragStart(children),
        unchoose: (inject, evt) => dragUnchoose(children, evt)
      })
    ]);
  }

  function previewFc() {
    preview.state = true;
    preview.rule = getRule() as [];
    preview.option = getOption();
    // console.log('preview.option: ', preview.option);
  }

  function getRule() {
    const option = parseRule(deepCopy(dragForm.api.rule[2].children)) as any;
    option.unshift(buildingComponent);
    option.unshift(projectComponent);
    return option;
  }

  function getOption() {
    const option = deepCopy(form.value.value);
    option.submitBtn = option.form.formCreateSubmitBtn;
    option.resetBtn = option.form.formCreateResetBtn;
    delete option.form.formCreateSubmitBtn;
    delete option.form.formCreateResetBtn;

    return option;
  }

  function setRule(rules) {
    if (rules && rules.length > 0) {
      const configRule = rules.slice(2);
      children.value = makeChildren(loadRule(configRule));
    } else {
      children.value = [];
    }
    clearActiveRule();
    dragForm.rule = [
      projectComponent,
      buildingComponent,
      ...makeDragRule(children.value)
    ];
  }

  function clearActiveRule() {
    activeRule.value = null;
    activeTab.value = 'form';
  }

  function setOption(opt) {
    const option = { ...opt };
    option.form.formCreateSubmitBtn = !!option.submitBtn;
    option.form.formCreateResetBtn = !!option.resetBtn;
    option.submitBtn = false;
    delete option.resetBtn;
    form.value.value = option;
  }

  function loadRule(rules) {
    console.log(rules);
    const arr: any = [];
    rules.forEach((rule) => {
      if (is.String(rule)) {
        return arr.push(rule);
      }
      const config: any = ruleList[rule._fc_drag_tag] || ruleList[rule.type];
      const _children = rule.children;
      rule.children = [];
      if (rule.control) {
        rule._control = rule.control;
        delete rule.control;
      }
      if (config) {
        rule = makeRule(config, rule);
        if (_children) {
          let children = rule.children[0].children;

          if (config.drag) {
            children = children[0].children;
          }
          children.push(...loadRule(_children));
        }
      } else if (_children) {
        rule.children = loadRule(_children);
      }
      arr.push(rule);
    });
    return arr;
  }

  function parseRule(children) {
    return [...new Set(children)].reduce((initial: any, rule: any) => {
      if (!rule) return initial;
      if (is.String(rule)) {
        initial.push(rule);
        return initial;
      } else if (rule.type === 'DragBox') {
        // @ts-ignore
        initial.push(...parseRule(rule.children));
        return initial;
      } else if (rule.type === 'DragTool') {
        rule = rule.children[0];
        if (rule.type === 'DragBox') {
          // @ts-ignore
          initial.push(...parseRule(rule.children));
          return initial;
        }
      }
      rule = { ...rule };
      if (rule.children.length) {
        rule.children = parseRule(rule.children);
      }

      delete rule._id;
      if (rule.config) {
        delete rule.config.config;
      }
      if (rule.effect) {
        delete rule.effect._fc;
        delete rule.effect._fc_tool;
      }
      if (rule._control) {
        rule.control = rule._control;
        delete rule._control;
      }
      Object.keys(rule)
        .filter(
          (k) =>
            (Array.isArray(rule[k]) && rule[k].length === 0) ||
            (is.Object(rule[k]) && Object.keys(rule[k]).length === 0)
        )
        .forEach((k) => {
          delete rule[k];
        });
      initial.push(rule);
      return initial;
    }, [] as any);
  }

  function baseChange(field, value, _, fapi) {
    if (activeRule.value && fapi[activeRule.value._id] === activeRule.value) {
      activeRule.value[field] = value;
    }
  }

  function propRemoveField(field, _, fapi) {
    if (activeRule.value && fapi[activeRule.value._id] === activeRule.value) {
      dragForm.api.sync(activeRule.value);
      if (field.indexOf('formCreate') === 0) {
        field = field.replace('formCreate', '');
        if (!field) return;
        field = lower(field);
        if (field.indexOf('effect') === 0 && field.indexOf('>') > -1) {
          delete activeRule.value.effect[field.split('>')[1]];
        } else if (field.indexOf('props') === 0 && field.indexOf('>') > -1) {
          delete activeRule.value.props[field.split('>')[1]];
        } else if (field === 'child') {
          delete activeRule.value.children[0];
        } else if (field) {
          activeRule.value[field] = undefined;
        }
      } else {
        delete activeRule.value.props[field];
      }
    }
  }

  function propChange(field, value, _, fapi) {
    if (activeRule.value && fapi[activeRule.value._id] === activeRule.value) {
      if (field.indexOf('formCreate') === 0) {
        field = field.replace('formCreate', '');
        if (!field) return;
        field = lower(field);
        if (field.indexOf('effect') === 0 && field.indexOf('>') > -1) {
          activeRule.value.effect[field.split('>')[1]] = value;
        } else if (field.indexOf('props') === 0 && field.indexOf('>') > -1) {
          activeRule.value.props[field.split('>')[1]] = value;
        } else if (field === 'child') {
          activeRule.value.children[0] = value;
        } else {
          activeRule.value[field] = value;
        }
      } else if (field === 'required') {
        if (value) {
          activeRule.value.validate = [
            { required: true, message: `${activeRule.value.title}不能为空` }
          ];
        } else {
          activeRule.value.validate = null;
        }
        // activeRule.value.effect.required = `${activeRule.value.title}不能为空`;
        // activeRule.value.validate = [
        //   { required: true, message: `${activeRule.value.title}不能为空` }
        // ];
      } else {
        activeRule.value.props[field] = value;
      }
    }
  }

  function validateChange(formData) {
    if (
      !activeRule.value ||
      validateForm.api[activeRule.value._id] !== activeRule.value
    )
      return;
    activeRule.value.validate = formData.validate || [];
    dragForm.api.refreshValidate();
    dragForm.api.nextTick(() => {
      dragForm.api.clearValidateState(activeRule.value.field);
    });
  }

  function toolActive(rule) {
    if (activeRule.value) {
      delete propsForm.api[activeRule.value._id];
      delete baseForm.api[activeRule.value._id];
      delete validateForm.api[activeRule.value._id];
    }
    activeRule.value = rule;

    nextTick(() => {
      activeTab.value = 'props';
      nextTick(() => {
        propsForm.api[activeRule.value._id] = activeRule.value;
        baseForm.api[activeRule.value._id] = activeRule.value;
        validateForm.api[activeRule.value._id] = activeRule.value;
      });
    });

    if (!cacheProps.value[rule._id]) {
      const arr = rule.config.config.props(rule);
      arr.forEach((item) => {
        // console.log(item, rule.props);
        if (rule.props[item.field]) {
          item.value = rule.props[item.field];
        }
      });
      cacheProps.value[rule._id] = arr;
    }

    propsForm.rule = cacheProps.value[rule._id];

    const formData = { ...rule.props, formCreateChild: rule.children[0] };
    Object.keys(rule).forEach((k) => {
      if (['effect', 'config', 'payload', 'id', 'type'].indexOf(k) < 0)
        formData['formCreate' + upper(k)] = rule[k];
    });
    ['props', 'effect'].forEach((name) => {
      rule[name] &&
        Object.keys(rule[name]).forEach((k) => {
          formData['formCreate' + upper(name) + '>' + k] = rule[name][k];
        });
    });
    propsForm.options.formData = formData;

    showBaseRule.value = hasProperty(rule, 'field') && rule.input !== false;

    if (showBaseRule.value) {
      baseForm.options.formData = {
        field: rule.field,
        title: rule.title || '',
        info: rule.info,
        _control: rule._control
      };

      validateForm.options.formData = {
        validate: rule.validate ? [...rule.validate] : []
      };
    }
  }

  function dragStart(children) {
    console.log('dragStart');
    moveRule.value = children;
    added.value = false;
  }

  function dragUnchoose(children, evt) {
    console.log('dragUnchoose');
    addRule.value = {
      children,
      oldIndex: evt.oldIndex
    };
  }

  function dragAdd(children, evt) {
    const newIndex = evt.newIndex;
    const menu = evt.item._underlying_vm_;
    if (!menu || menu.__fc__) {
      if (addRule.value) {
        const rule = addRule.value.children.splice(addRule.value.oldIndex, 1);
        // console.log('dragAdd', menu, rule);
        children.splice(newIndex, 0, rule[0]);
      }
    } else {
      const rule = makeRule(ruleList[menu.name]);
      // 系统组件名称替换
      if (['formSys', 'formTreeSys'].includes(menu.name)) {
        rule.children[0].title = menu.label;
        rule.children[0].field = menu.field;
      }
      //
      children.splice(newIndex, 0, rule);
    }
    added.value = true;
  }

  function dragEnd(children, { newIndex, oldIndex }) {
    console.log('dragEnd');
    if (
      !added.value &&
      !(moveRule.value === children && newIndex === oldIndex)
    ) {
      const rule = moveRule.value.splice(oldIndex, 1);
      children.splice(newIndex, 0, rule[0]);
    }
    moveRule.value = null;
    addRule.value = null;
    added.value = false;
  }

  function makeRule(config, _rule?: []) {
    if (!config) return;
    // console.log(config, _rule);
    const rule = _rule || config.rule();
    rule.config = { config };
    if (!rule.effect) rule.effect = {};
    rule.effect._fc = true;
    rule._fc_drag_tag = config.name;

    let drag;

    if (config.drag) {
      rule.children.push(
        (drag = makeDrag(config.drag, rule.type, makeChildren([]), {
          end: (inject, evt) => dragEnd(inject.self.children, evt),
          add: (inject, evt) => dragAdd(inject.self.children, evt),
          start: (inject) => dragStart(inject.self.children),
          unchoose: (inject, evt) => dragUnchoose(inject.self.children, evt)
        }))
      );
    }

    if (config.children && !_rule) {
      const child = makeRule(ruleList[config.children]);
      (drag || rule).children.push(child);
    }

    const dragMask = config.mask !== false;

    if (config.inside) {
      rule.children = makeChildren([
        {
          type: 'DragTool',
          props: {
            dragBtn: config.dragBtn !== false,
            children: config.children,
            mask: dragMask
          },
          effect: {
            _fc_tool: true
          },
          inject: true,
          on: {
            delete: ({ self }) => {
              const parent = getParent(self).parent;
              parent.__fc__.rm();
              clearActiveRule();
            },
            create: ({ self }) => {
              const top = getParent(self);
              top.root.children.splice(
                top.root.children.indexOf(top.parent) + 1,
                0,
                makeRule(top.parent.config.config)
              );
            },
            addChild: ({ self }) => {
              const top = getParent(self);
              const config = top.parent.config.config;
              const item = ruleList[config.children];
              if (!item) return;
              (!config.drag
                ? top.parent
                : top.parent.children[0]
              ).children[0].children.push(makeRule(item));
            },
            copy: ({ self }) => {
              const top = getParent(self);
              top.root.children.splice(
                top.root.children.indexOf(top.parent) + 1,
                0,
                designerForm.copyRule(top.parent)
              );
            },
            active: ({ self }) => {
              const top = getParent(self);
              toolActive(top.parent);
            }
          },
          children: rule.children
        }
      ]);
      return rule;
    } else {
      return {
        type: 'DragTool',
        props: {
          dragBtn: config.dragBtn !== false,
          children: config.children,
          mask: dragMask
        },
        effect: {
          _fc_tool: true
        },
        inject: true,
        on: {
          delete: ({ self }) => {
            self.__fc__.rm();
            clearActiveRule();
          },
          create: ({ self }) => {
            const top = getParent(self);
            top.root.children.splice(
              top.root.children.indexOf(top.parent) + 1,
              0,
              makeRule(self.children[0].config.config)
            );
          },
          addChild: ({ self }) => {
            const config = self.children[0].config.config;
            const item = ruleList[config.children];
            if (!item) return;
            (!config.drag ? self : self.children[0]).children[0].children.push(
              makeRule(item)
            );
          },
          copy: ({ self }) => {
            const top = getParent(self);
            top.root.children.splice(
              top.root.children.indexOf(top.parent) + 1,
              0,
              designerForm.copyRule(top.parent)
            );
          },
          active: ({ self }) => {
            toolActive(self.children[0]);
          }
        },
        children: makeChildren([rule])
      };
    }
  }

  // setRule([projectComponent]);
  // dragForm.rule = makeDragRule(makeChildren(children.value));
  dragForm.rule = [
    projectComponent,
    buildingComponent,
    ...makeDragRule(makeChildren([]))
  ];
  // dragForm.rule = makeDragRule(makeChildren(children.value));

  document.body.ondrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function onSave() {
    emits('save', {
      form: getOption(),
      rule: getRule()
    });
  }

  const provideDesignerData = {
    getRule,
    getOption,
    setOption,
    clearDragRule,
    makeRule,
    makeDragRule,
    loadRule,
    setRule,
    parseRule,
    dragForm,
    dragStart,
    dragUnchoose,
    dragAdd,
    dragEnd,
    addRule,
    added,
    form,
    showBaseRule,
    toolActive,
    propChange,
    validateChange,
    validateForm
  };

  provide('fcx', ref({ active: null }));
  provide('designer', provideDesignerData);

  defineExpose(provideDesignerData);
</script>

<style lang="less" scoped>
  .padded {
    padding: 15px;
    box-sizing: border-box;
  }

  .layout-section {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .main:extend(.padded) {
    height: 100%;
    padding-bottom: 0;
    overflow: hidden auto;
    background-color: #f5f5f5;

    .main-content {
      padding: 15px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: #fff;

      :deep(& > .arco-row-justify-start) {
        width: 100%;
        height: 100%;

        & > .drag-box {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .group-panel:extend(.padded) {
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      margin: 0 0 15px;
    }

    .group {
      display: flex;
      flex-wrap: wrap;

      & + .title {
        margin-top: 15px;
      }
    }

    .group-item {
      color: #333;
      min-width: 70px;
      display: flex;
      flex-direction: column;
      width: calc(100% / 3);
      height: 70px;
      text-align: center;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: #2e73ff;
        color: #fff;
      }
    }

    .icon {
      font-size: 20px;
      margin: 10px 0;
    }

    .name {
      color: inherit;
      font-size: 12px;
    }
  }

  .m-tools {
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding: 0 15px;
    background-color: #fff;
  }

  .config-panel:extend(.padded) {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .tab {
      width: 100%;
      display: flex;

      :deep(.arco-radio-button) {
        flex: 1;
        .arco-radio-button-content {
          text-align: center;
        }
      }
    }

    .form-panel {
      flex: 1;
      padding: 15px 0;
      box-sizing: border-box;
      overflow: hidden auto;
    }
  }

  :deep(.arco-layout-has-sider) {
    overflow: hidden;
  }

  // :deep(.form-create.main-content) {
  //   background-color: #fff;
  // }
</style>
