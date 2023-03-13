import { createApp } from 'vue';
// import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import directive from './directive';
import App from './App.vue';
import '@arco-themes/vue-business-test-dev/css/arco.css';
import '@/styles/global.less';
import { Message } from '@arco-design/web-vue';

const app = createApp(App);
Message._context = app._context;

// app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(router);
app.use(store);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
