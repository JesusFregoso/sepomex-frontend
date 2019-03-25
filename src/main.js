import Vue from "vue";
import App from "./App.vue";
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false;

import Vuetify from 'vuetify'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuetify)

Vue.use(axios,VueAxios)

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log({...publicPages});
  console.log({...authRequired});
  console.log({...loggedIn});
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
