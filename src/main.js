import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initializeDatabase } from './data/mongodb'

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import Font Awesome icons
import { 
  faBars,
  faArrowRight,
  faInfoCircle,
  faCamera,
  faUsers,
  faPlane,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

import { 
  faInstagram, 
  faTwitter, 
  faFacebook 
} from '@fortawesome/free-brands-svg-icons'

// Add icons to library
library.add(
  faBars,
  faArrowRight,
  faInfoCircle,
  faCamera,
  faUsers,
  faPlane,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faInstagram,
  faTwitter,
  faFacebook
)

// Initialize database
initializeDatabase()

// Create and mount the app
const app = createApp(App)

// Use router
app.use(router)

// Register Font Awesome component
app.component('font-awesome-icon', FontAwesomeIcon)

// Mount the app
app.mount('#app') 