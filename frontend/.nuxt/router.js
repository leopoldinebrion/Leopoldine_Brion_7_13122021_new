import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9f3b56c0 = () => interopDefault(import('..\\pages\\Account.vue' /* webpackChunkName: "pages/Account" */))
const _072c1b70 = () => interopDefault(import('..\\pages\\Login-Page.vue' /* webpackChunkName: "pages/Login-Page" */))
const _9a4e4968 = () => interopDefault(import('..\\pages\\Signup-form.vue' /* webpackChunkName: "pages/Signup-form" */))
const _1cc9cce2 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _5fdee05e = () => interopDefault(import('..\\pages\\UserProfile.vue' /* webpackChunkName: "pages/UserProfile" */))
const _4d1d6ee7 = () => interopDefault(import('..\\pages\\Wall.vue' /* webpackChunkName: "pages/Wall" */))
const _5a9dd3a5 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Account",
    component: _9f3b56c0,
    name: "Account"
  }, {
    path: "/Login-Page",
    component: _072c1b70,
    name: "Login-Page"
  }, {
    path: "/Signup-form",
    component: _9a4e4968,
    name: "Signup-form"
  }, {
    path: "/test",
    component: _1cc9cce2,
    name: "test"
  }, {
    path: "/UserProfile/:id",
    component: _5fdee05e,
    name: "UserProfile"
  }, {
    path: "/Wall",
    component: _4d1d6ee7,
    name: "Wall"
  }, {
    path: "/",
    component: _5a9dd3a5,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
