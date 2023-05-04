// Composables
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/*
Faltan muchos routings dinamicos que deberian pasar info a los componentes, por ejemplo Scenes te muestra todas las escenas, pero cuando
se clickea en una se deberia poder entrar a /Scenes/{SceneId} y esa scene probablemente necesite alguna informacion adicional
*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/routines',
      name: 'routines',
      component: () => import('../views/RoutinesView.vue')
    },
    {
      path: '/scenes',
      name: 'scenes',
      component: () => import('../views/ScenesView.vue')
    },
    {
      path: '/Settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    /* Este routing deberia ser dinamico o sea que segun cuantos rooms tiene deberia poder acceder a la view general de cada uno */
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../views/RoomsView.vue')
    },
    /* ----------------------------- */
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }

  ]
})

export default router
