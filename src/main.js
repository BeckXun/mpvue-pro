import Vue from 'vue';
import App from './App';
import request from './utils/request';

Vue.prototype.$req = request(wx);

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
