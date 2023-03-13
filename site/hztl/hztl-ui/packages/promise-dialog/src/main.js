const defaults = {
    topClass: "",
    width: "600px",
    title: null,
    visible: false,
    sureText: "",
    isFocusCancel: false,
    disabledHotkeys: false,
    contentRender(){},
    model: {},
    beforeConfirm() {
        return true;
    },
    afterVisible() {}
};

import Vue from "vue";
import { merge, cloneDeep } from "lodash";
import msgboxVue from "./main.vue";

const PromiseDialogConstructor = Vue.extend(msgboxVue);

let currentMsg, instance;
let msgQueue = [];

const defaultCloseDialog = isSure => {
    if (currentMsg) {
        if (isSure) {
            currentMsg.resolve(instance.model);
        } else {
            currentMsg.reject(instance.model);
        }
    }
};

const initInstance = () => {
    instance = new PromiseDialogConstructor({
        el: document.createElement("div")
    });

    instance.closeDialog = defaultCloseDialog;
};

const showNextDialog = () => {
    if (!instance) {
        initInstance();
    }

    if (!instance.visible || instance.closeTimer) {
        if (msgQueue.length > 0) {
            currentMsg = msgQueue.shift();

            const options = currentMsg.options;
            for (const prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    instance[prop] = options[prop];
                }
            }
            if (options.closeDialog === undefined) {
                instance.closeDialog = defaultCloseDialog;
            }

            const oldCb = instance.closeDialog;
            instance.closeDialog = (isSure, instance) => {
                oldCb(isSure, instance);
                showNextDialog();
            };

            document.body.appendChild(instance.$el);

            Vue.nextTick(() => {
                instance.visible = true;
            });
        }
    }
};

const PromiseDialog = options => {
    if (Vue.prototype.$isServer) return;
    return new Promise((resolve, reject) => {
        msgQueue.push({
            options: merge({}, defaults, cloneDeep(options)),
            resolve: resolve,
            reject: reject
        });

        showNextDialog();
    });
};

PromiseDialog.close = () => {
    instance.doClose();
    instance.visible = false;
    msgQueue = [];
    currentMsg = null;
};

export default PromiseDialog;
