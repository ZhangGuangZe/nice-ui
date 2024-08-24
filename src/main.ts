import { createApp } from 'vue'
import './style.css'
import './index.scss'
import App from './App.vue'
import Button from './components/button'

createApp(App).use(Button).mount('#app')
