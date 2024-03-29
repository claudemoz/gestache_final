import _ from 'lodash';
import { createApp } from 'vue'

import router from './router/index.js'
import store from './store/index.js'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
