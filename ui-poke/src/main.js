import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from "./routes.js"
import VuePageTransition from 'vue-page-transition'
 

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.use(VuePageTransition)

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
