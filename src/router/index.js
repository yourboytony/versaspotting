import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import AboutView from '../views/AboutView.vue'
import ProfilePortfolio from '../views/ProfilePortfolio.vue'
import ContactView from '../views/ContactView.vue'
import AddPhotoView from '../views/AddPhotoView.vue'
import ContactAdminView from '@/views/ContactAdminView.vue'
import ApplicationAdminView from '../views/ApplicationAdminView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home - VERSA Spotting'
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView,
    meta: {
      title: 'Portfolio - VERSA Spotting'
    }
  },
  {
    path: '/portfolio/:id',
    name: 'profile-portfolio',
    component: ProfilePortfolio,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'About - VERSA Spotting'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: 'Contact - VERSA Spotting'
    }
  },
  {
    path: '/addphoto',
    name: 'add-photo',
    component: AddPhotoView,
    meta: {
      title: 'Add Photo - VERSA Spotting'
    }
  },
  {
    path: '/contactadmin',
    name: 'contactadmin',
    component: ContactAdminView
  },
  {
    path: '/applicationadmin',
    name: 'applicationadmin',
    component: ApplicationAdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'VERSA Spotting'
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This is a simple authentication check
    // In a real app, you would use a more secure method
    const isAuthenticated = prompt('Enter admin password:') === 'versaadmin123'
    
    if (!isAuthenticated) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 