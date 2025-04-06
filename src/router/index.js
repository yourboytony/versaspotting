import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import PhotographerPortfolio from '../views/PhotographerPortfolio.vue'
import AdminView from '../views/AdminView.vue'
import AnnouncementsView from '../views/AnnouncementsView.vue'
import ApplicationsView from '../views/ApplicationsView.vue'
import NewsView from '../views/NewsView.vue'
import AboutView from '../views/AboutView.vue'
import AdminLogin from '../views/AdminLogin.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView
  },
  {
    path: '/photographer/:id',
    name: 'photographer',
    component: PhotographerPortfolio
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin
  },
  {
    path: '/announcements',
    name: 'announcements',
    component: AnnouncementsView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/apply',
    name: 'apply',
    component: ApplicationsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 