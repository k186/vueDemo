import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

/* eslint-disable no-new */
Vue.use(VueRouter)
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
document.body.addEventListener('touchstart', function () {});
