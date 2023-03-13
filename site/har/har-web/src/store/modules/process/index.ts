import { defineStore } from 'pinia';

type OptionsType = {
  actions: ActionTypes;
  title: string;
  id: any;
};

type ActionTypes = {
  edit?: Function;

  revoke: Function;
  reject: Function;
  transfer: Function;
  sign: Function;
  agree: Function;
};

const useCheckProcessStore = defineStore('check-process', {
  state: () => ({
    visible: false,
    title: '',
    id: '',
    actions: {
      edit: function () {},

      revoke: function () {},
      reject: function () {},
      transfer: function () {},
      sign: function () {},
      agree: function () {}
    }
  }),
  actions: {
    open(data: { [key: string]: unknown }, options: OptionsType) {
      this.visible = true;
      // @ts-ignore
      this.actions = { ...options.actions };
      this.title = options.title;
      this.id = options.id;
    },
    close() {
      this.visible = false;
    }
  }
});

export default useCheckProcessStore;
