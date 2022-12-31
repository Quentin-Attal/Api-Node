import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './assets/main.css'
import { createPinia } from 'pinia'
import BootstrapVue3 from 'bootstrap-vue-3'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(BootstrapVue3)

app.mount('#app')
