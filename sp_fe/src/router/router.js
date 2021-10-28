import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Authorization from '../views/Authorization'
import WorkSpace from '../views/WorkSpace'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: "history",
  // Роутеры - страницы приложения
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/home',
      component: Home,
      // component: () => import(/* webpackChunkName: "about" */ '../views/Catalogs.vue')
    },
    {
      path: '/authorization',
      name: 'authorization',
      alias: '/authorization',
      component: Authorization,
    },
    {
      path: '/work-space',
      name: 'work-space',
      alias: '/work-space',
      component: WorkSpace,

    },

  ]
});

export default router;




// const routes = [
  // {
  //   path: '/',
  //   name: 'Catalogs',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Catalogs.vue')
  // },
// ]

// const router = new VueRouter({
//   routes
// })

// export default router
