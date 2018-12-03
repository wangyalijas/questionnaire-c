import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './services/http/httpAxios';
import api from './services/api';
import 'element-ui/lib/theme-chalk/index.css';
import LoadingMixin from './mixins/loading';

Vue.prototype.$api = api;
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.mixin(LoadingMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
