import Vue from 'vue'

import App from './App.vue'
import router from './router/router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

// Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
