import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import IndexPage from '@/components/Index'
import OauthRedirect from '@/components/oauth/Redirect'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage,
      children: [
        {
          path: '/',
          name: 'Main',
          component: Main
        },
        {
          path: '/oauth/redirect',
          name: 'OauthRedrect',
          component: OauthRedirect
        }
      ]
    }
  ]
})
