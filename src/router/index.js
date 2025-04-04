import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import AboutView from '../views/AboutView.vue'
import ProfilePortfolio from '../views/ProfilePortfolio.vue'
import ContactView from '../views/ContactView.vue'
import AddPhotoView from '../views/AddPhotoView.vue'

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
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'VERSA Spotting'
  next()
})

export default router 