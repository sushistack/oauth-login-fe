<template lang="pug">
.bp-content-container
  nav-bar(
    :stickyMode='stickyMode'
    @onOpenLoginModal='openLoginModal'
    @onLogout='logout'
  )
  router-view.router
  login-modal(
    v-if='isLoginModalOpen'
    :isOpen='isLoginModalOpen'
    @onCloseModal='isLoginModalOpen = false'
  )
</template>

<script>
import NavBar from './NavBar'
import LoginModal from './LoginModal'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { NavBar, LoginModal },
  data () {
    return {
      isLoginModalOpen: false,
      isScrollTop: true
    }
  },
  created () {
    window.addEventListener('scroll', e => { this.isScrollTop = window.scrollY === 0 })
  },
  methods: {
    ...mapMutations(['setToken', 'setUser']),
    openLoginModal () {
      this.isLoginModalOpen = true
    },
    logout () {
      this.setToken(null)
      this.setUser(null)
      alert('로그아웃되었습니다.')
      if (this.$route.path !== '/') this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['token']),
    stickyMode () {
      return !(this.isScrollTop && this.$route.path === '/')
    }
  }
}
</script>
