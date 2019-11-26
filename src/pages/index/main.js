import Vue from 'vue';
import App from './index';

// add this to handle exception
Vue.config.errorHandler = (err) => {
    if (console && console.error) {
        console.error(err);
    }
};

const app = new Vue(App);
app.$mount();
