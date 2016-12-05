import Vue from 'vue'
import App from './App'
import VueTouch from 'vue-touch'
/* eslint-disable no-new */
Vue.use(VueTouch);
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
