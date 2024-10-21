import { createApp } from 'vue'
import './style.css'
import './index.scss'
import App from './App.vue'
// import Button from './components/button'
import NiceUI from '../build/'

createApp(App).use(NiceUI).mount('#app')
