import Vue from 'vue';
import App from 'c/App.vue';

import './css/main.pcss';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
