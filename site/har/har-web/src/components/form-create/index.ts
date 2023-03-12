import { App } from 'vue';
/* eslint-disable vue/multi-word-component-names */
import FcDesigner from './components/FcDesigner.vue';
import DragTool from './components/DragTool.vue';
import Struct from './components/Struct.vue';
// import Fetch from './components/Fetch.vue';
// import Validate from './components/Validate.vue';
import DragBox from './components/DragBox.vue';
import Required from './components/Required.vue';
import Date from './components/Date.vue';
// import Project from '@/components/sys/project.vue';
// import Floor from '@/components/sys/floor.vue';

// import TableOptions from './components/TableOptions.vue';
import formCreate, { designerForm } from './utils/form';
// import FcEditor from '@form-create/component-wangeditor';
import draggable from 'vuedraggable/src/vuedraggable';
import unique from '@form-create/utils/lib/unique';
import './style/index.css';
import AcroUI from './utils/components';
import FormSys from '@/components/sys/formSys.vue';
import FormTreeSys from '@/components/sys/formTreeSys.vue';
import IUpload from './components/Upload.vue';

designerForm.component('Draggable', draggable);
designerForm.component('DragTool', DragTool);
designerForm.component('DragBox', DragBox);
// designerForm.component('Validate', Validate);
designerForm.component('Struct', Struct);
// designerForm.component('Fetch', Fetch);
designerForm.component('Required', Required);
designerForm.component('Date', Date);
// designerForm.component('Project', Project);
// designerForm.component('Floor', Floor);
designerForm.component('FormSys', FormSys);
designerForm.component('FormTreeSys', FormTreeSys);
designerForm.component('IUpload', IUpload);
// designerForm.component('TableOptions', TableOptions);
// designerForm.component('FcEditor', FcEditor);
// formCreate.component('FcEditor', FcEditor);

designerForm.register('_fc', {
  init(fc, rule: any) {
    rule._id = unique();
    if (fc.repeat) rule.field = unique();
    if (fc.value) {
      rule.effect._fc = false;
    }
  }
});

designerForm.register('_fc_tool', {
  init(_, rule: any) {
    rule.props.unique = unique();
  }
});

function install(Vue: App) {
  Vue.use(AcroUI);
  Vue.component('FcDesigner', FcDesigner);
}

FcDesigner.install = install;
FcDesigner.formCreate = formCreate;
FcDesigner.designerForm = designerForm;

export default FcDesigner;

export { formCreate, designerForm, install };
