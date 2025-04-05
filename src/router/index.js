import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import AboutView from '../views/AboutView.vue'
import ProfilePortfolio from '../views/ProfilePortfolio.vue'
import ContactView from '../views/ContactView.vue'
import AddPhotoView from '../views/AddPhotoView.vue'
import ContactAdminView from '@/views/ContactAdminView.vue'
import ApplicationAdminView from '../views/ApplicationAdminView.vue'
import AdminView from '../views/AdminView.vue'

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
      title: 'Add Photo - VERSA Spotting',
      requiresAuth: true
    }
  },
  {
    path: '/contactadmin',
    name: 'contactadmin',
    component: ContactAdminView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/applicationadmin',
    name: 'applicationadmin',
    component: ApplicationAdminView,
    meta: { 
      requiresAuth: true,
      title: 'Applications - VERSA Spotting'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { 
      requiresAuth: true,
      title: 'Admin Dashboard - VERSA Spotting'
    }
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

// Authentication check function
const checkAuth = () => {
  const username = localStorage.getItem('adminUsername')
  const password = localStorage.getItem('adminPassword')
  return username === 'VERSAadmin' && password === 'adminw8492$@'
}

// Update document title and handle authentication
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'VERSA Spotting'

  // Handle authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!checkAuth()) {
      // Store the attempted URL for redirect after login
      localStorage.setItem('redirectAfterLogin', to.fullPath)
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 