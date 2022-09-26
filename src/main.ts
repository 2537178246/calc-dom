import { createApp } from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '../public/live2/jQuery'
import '../public/live2/waifu.css'
import '../public/live2/waifu-tips'
import '../public/live2/live2d'
import '../public/live2/autoload'

createApp(App)
  .use(ElementPlus)
  .mount('#app')
