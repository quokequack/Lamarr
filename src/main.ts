import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { vuetify } from './theme'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles/main.css'

const app = createApp(App)
app.use(createPinia()).use(router).use(vuetify).mount('#app')
