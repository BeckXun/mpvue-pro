import Vue from 'vue';
import store from '@/store';
import minxins from '@/minxins';
import MyDate from '@/filters/date';
import App from './App';
import request from './utils/request';

Vue.use(minxins);

Vue.prototype.$req = request(wx);
Vue.prototype.$store = store;

Vue.component('MyDate', MyDate);

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

// export default {
//     config: {
//         pages: [
//             'pages/index',
//             'pages/logs',
//             'pages/counter',
//         ],
//         window: {
//             backgroundTextStyle: 'light',
//             navigationBarBackgroundColor: '#fff',
//             navigationBarTitleText: 'WeChat',
//             navigationBarTextStyle: 'black',
//         },
//         tabBar: {
//             color: '#999',
//             backgroundColor: '#fafafa',
//             selectedColor: '#333',
//             borderStyle: 'white',

//             list: [{
//                 text: '首页',
//                 pagePath: 'pages/index',
//                 iconPath: 'static/tabs/home.png',
//                 selectedIconPath: 'static/tabs/home-active.png',
//             }, {
//                 text: '订单',
//                 pagePath: 'pages/logs',
//                 iconPath: 'static/tabs/orders.png',
//                 selectedIconPath: 'static/tabs/orders-active.png',
//             }],

//             items: [{
//                 name: '首页',
//                 pagePath: 'pages/index',
//                 icon: 'static/tabs/home.png',
//                 activeIcon: 'static/tabs/home-active.png',
//             }, {
//                 name: '订单',
//                 pagePath: 'pages/logs',
//                 icon: 'static/tabs/orders.png',
//                 activeIcon: 'static/tabs/orders-active.png',
//             }],
//             position: 'bottom',
//         },
//     },
//     networkTimeout: {
//         request: 5000,
//         downloadFile: 5000,
//     },
//     debug: true,
// };

