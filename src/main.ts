import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./assets/css/main.css";
import App from './App.vue'
import router from './router'
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const app = createApp(App)
const notyf = new Notyf();
app.use(createPinia())
app.use(router)

app.mount('#app')
