import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useMainStore } from './stores/mainStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize store and load data
const mainStore = useMainStore()
mainStore.loadFromLocalStorage()

app.mount('#app') 