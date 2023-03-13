import Vue from 'vue'
import VehicleTypeSelectorComponent from './VehicleTypeSelector.vue'

let VehicleTypeSelectorConstructor = Vue.extend(VehicleTypeSelectorComponent);

function showVehicleTypeSelector(dataService) {
  return new Promise((res, rej) => {
    let vehicleTypeSelectorDom = new VehicleTypeSelectorConstructor({
      el: document.createElement('div'),
      data() {
        return {
          show: true,
          dataService,
          confirmFunc: function (selected) {
            res(selected);
          },
          cancelFunc: function () {
            rej({
              type: "cancel"
            });
          },
          failFunc: function (error) {
            rej({
              type: "fail",
              error: error
            });
          }
        }
      }
    });
    document.body.appendChild(vehicleTypeSelectorDom.$el);
  });
}

let VehicleTypeSelector = new Object();
VehicleTypeSelector.select = showVehicleTypeSelector;

export default VehicleTypeSelector;