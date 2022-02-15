// 引入vue
import Vue from 'vue';
import App from './App.vue';
// 引入axios
import axios from 'axios';
// 引入懒加载
import VueLazyload from 'vue-lazyload';


Vue.config.productionTip = false;

Vue.use(VueLazyload);
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/error.png',
  loading: './assets/loading.gif',
  attempt: 1
});

// step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = axios;

// step3：使每次请求都会带一个 /api 前缀 
// axios.defaults.baseURL = '/api';
axios.defaults.baseURL = 'https://musicapi-five.vercel.app/';

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
}).$mount('#app');
