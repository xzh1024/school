import Vue from 'vue';
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({ 

     locale: 'cn', // 定义默认语言为中文 

     messages: {   

        'cn': require('./languages/cn.json'),   

        'en': require('./languages/en.json') 

      }

});

export default i18n;