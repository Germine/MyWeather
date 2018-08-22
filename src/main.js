// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Vue-resource
import  VueResource  from 'vue-resource'
Vue.use(VueResource) 

// MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// YDUI
import YDUI from 'vue-ydui'; 
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
