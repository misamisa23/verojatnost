import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import VueGtag from "vue-gtag";


Vue.config.productionTip = false
const routes = [
  { path: '/', component: Home }
]
const router = new VueRouter({
  mode: 'history',
  routes,
})

Vue.use(VueGtag, {
  config: { id: "G-8Z6VGRCB9T" }
});


Vue.use( {
  router}
)


new Vue({
  render: h => h(App),
}).$mount('#app')


// Vue.use(require('vue-cookies'))