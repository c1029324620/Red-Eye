import path from 'path/posix'
import { createApp, VueElement } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import RequestHttpVue from './components/RequestHttp.vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'


createApp(HighchartsVue)
stockInit(Highcharts)

const app = createApp(App)
app.use(router)


app.mount('#app')
//createApp(RequestHttpVue).mount('#request')

//debounce
//manually input



