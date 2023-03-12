import Vue from 'vue'
import RebateOverlayComponent from './RebateOverlay.vue'

let RebateOverlayConstructor = Vue.extend(RebateOverlayComponent);

function showRebateOverlay(rebateObj) {
    return new Promise((res,rej) => {
        let RebateOverlayDom = new RebateOverlayConstructor({
            el: document.createElement('div'),
            data() {
                return {
                    show: true,
                    rebate: rebateObj
                }
            }
        });
        document.body.appendChild(RebateOverlayDom.$el);
    });
}

let RebateOverlay = new Object();
RebateOverlay.show = showRebateOverlay;

export default RebateOverlay;