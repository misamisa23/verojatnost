import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false
const routes = [
  { path: '/', component: Home }
]
const router = new VueRouter({
  mode: 'history',
  routes,
})

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(VueAnalytics, {
  id: 'UA-97223615-3',
  router
})