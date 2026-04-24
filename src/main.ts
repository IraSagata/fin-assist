import './styles/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import App from './App.vue'
import Home from './Home.vue'
import About from './About.vue'
import Time from './Time.vue'

//  Type-safe routes
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/time', name: 'time', component: Time },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
