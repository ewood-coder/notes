import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/event/:eventId',
    name: 'Event',
    component: loadPage('EventPage')
  },
  {
    path: '/create-event',
    name: 'Create Event',
    component: loadPage('CreateEventPage'),
    beforeEnter: authGuard
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: '',
  linkExactActiveClass: '',
  history: createWebHashHistory(),
  routes
})
