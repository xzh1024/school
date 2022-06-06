import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/router/permission';
import * as ELIcons from '@element-plus/icons-vue';
import i18n from '@/i18n';

const app = createApp(App);
for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName]);
}

// createApp(App).use(ElementPlus).use(store).use(router).use(i18n).mount('#app');
app.use(ElementPlus).use(store).use(router).use(i18n).mount('#app');
