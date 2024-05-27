import Diagram from '../views/Diagram.vue'
import PeopleList from '../views/PeopleList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Persons',
      component: PeopleList
    },
    {
      path: '/about',
      name: 'Diagram',
      component: () => Diagram
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
