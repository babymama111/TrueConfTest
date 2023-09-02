import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: () => import('../components/WelcomeItem.vue')
    },
    {
      path: '/lift',
      name: 'lift',
      component: () => import('../components/Lift.vue')
    }
  ]
})

export default router
