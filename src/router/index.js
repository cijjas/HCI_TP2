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
    /* Para acceder a rutinas en particular y ver las acciones dentro de esa misma*/
    {
      path: '/routines/:routineName',
      name: 'routineview',
      component: () => import('../views/RoutineActionsView.vue')
    },
    {
      path: '/Settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/Settings/Profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/AddRoom',
      name: 'AddRoom',
      component: () => import('../views/AddRoomView.vue')
    },
    {
      path: '/AddRoutine',
      name: 'AddRoutine',
      component: () => import('../views/AddRoutineView.vue')
    },
    {
      path: '/AddDevice',
      name: 'AddDevice',
      component: () => import('../views/AddDeviceView.vue')
    },
    {
      path: '/CreationView', // pruebas
      name: 'CreationView',
      component: () => import('../views/CreationView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    /* Este routing deberia ser dinamico o sea que segun cuantos rooms tiene deberia poder acceder a la view general de cada uno */
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../views/RoomsView.vue')
    },
    /* Para acceder a cuartos en particular y ver los devices dentro de ese mismo*/
    {
      path: '/rooms/:roomName',
      name: 'roomview',
      component: () => import('../views/RoomDevicesView.vue')
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }

  ]
})

export default router
