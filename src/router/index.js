import { createRouter, createWebHistory } from 'vue-router'
import Lift from '../components/Lift.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/WelcomeItem.vue')
    },
    {
      path: '/',
      name: 'lift',
      component: Lift
    }
  ]
})

export default router
