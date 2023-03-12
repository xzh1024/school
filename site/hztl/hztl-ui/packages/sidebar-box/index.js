import SidebarBox from "./src/main.vue";
SidebarBox.install = function(Vue) {
    Vue.component(SidebarBox.name, SidebarBox);
};
export default SidebarBox;
