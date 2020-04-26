import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from "./routes.js"
import VuePageTransition from 'vue-page-transition'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faSpinner, faSearch, faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner,faPlusCircle,faSearch,faBars,faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon) 

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.use(VuePageTransition)

export const bus = new Vue();

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
