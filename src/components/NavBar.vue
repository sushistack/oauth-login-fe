<template lang="pug">
.bp-header-container(:class='{ sticky: stickyMode }')
  header.bp-header
    a.logo-link(@click='go("/")')
    nav.bp-nav
      ul.nav-list
        li.nav-list-item(v-for='m in menu')
          a.nav-list-item-link(@click='go(m.path)') {{ m.name }}
    .bp-account
      button.account-button(
        v-if='!isLoggedIn'
        type='button'
        @click='$emit("onOpenLoginModal")'
      ) 로그인
      button.account-button.loggedin(
        v-else
        type='button'
        @click='logout'
      ) 로그아웃
</template>

<script>
import $ from '@/utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavBar',
  props: ['stickyMode'],
  data () {
    return {
      isOpenAccountDropdown: false,
      menu: []
    }
  },
  created () {
    this.isLoggedIn && this.fetchUser()
  },
  methods: {
    ...mapActions(['fetchUser']),
    go (path) {
      this.close()
      if (this.$route.path !== path) this.$router.push(path)
    },
    close () {
      this.isOpenAccountDropdown = false
    },
    logout () {
      this.close()
      this.$emit('onLogout')
    }
  },
  computed: {
    ...mapGetters(['token', 'user']),
    isLoggedIn () {
      return this.token != null
    },
    isAdmin () {
      return this.user && this.user.roleType === 'ROLE_ADMIN'
    }
  },
  directives: {
    'click-outside': $.clickOutside()
  }
}
</script>

<style scoped>
.bp-header-container {
  color: #fff;
  width: 100%;
  height: 50px;
  position: absolute;
  z-index: 1;
}
.bp-header-container .bp-header {
  height: 100%;
  display: flex;
}
.bp-header-container .bp-header .logo-link {
  cursor: pointer;
}
.bp-header-container .bp-header .bp-logo {
  flex: 0;
  height: 100%;
  margin: auto 10px;
}
.bp-header-container .bp-header .bp-nav {
  flex: 1;
  display: flex;
  height: 100%;
}
.bp-header-container .bp-header .bp-nav .nav-list {
  height: 100%;
  display: flex;
}
.bp-header-container .bp-header .bp-nav .nav-list .nav-list-item {
  height: 100%;
  display: flex;
}
.bp-header-container .bp-header .bp-nav .nav-list .nav-list-item .nav-list-item-link {
  margin: auto;
  line-height: 20px;
  padding: 15px;
  cursor: pointer;
}
.bp-header-container .bp-header .bp-nav .nav-list .nav-list-item .nav-list-item-link:hover {
  color: var(--theme-ui-colors-link-color, #8a4baf);
}
.bp-header-container .bp-header .bp-search {
  flex: 0;
  height: 100%;
}
.bp-header-container .bp-header .bp-search .search-button {
  background: transparent;
  cursor: pointer;
  padding: 11px 8px;
}
.bp-header-container .bp-header .bp-search .search-button:hover {
  color: #8a4baf;
}
.bp-header-container .bp-header .bp-account {
  height: 100%;
}
.bp-header-container .bp-header .bp-account .account-button {
  background: transparent;
  cursor: pointer;
  padding: 16.5px 8px;
  margin-right: 15px;
  width: 100px;
  border: 1px solid blueviolet;
  border-radius: 5px;
}
.bp-header-container .bp-header .bp-account .account-button:hover {
  color: #8a4baf;
}
.bp-header-container .account-dropdown {
  width: 100px;
  background: #fff;
  color: #000;
  border: 1px solid #000;
  position: absolute;
  top: 50px;
  right: 0;
}
.bp-header-container .account-dropdown ul li {
  height: 2rem;
}
.bp-header-container .account-dropdown ul li button {
  background: #fff;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.bp-header-container .account-dropdown ul li button:hover {
  background: rgba(0, 0, 0, .02);
}
.bp-header-container.sticky {
  top: 0;
  color: #000;
  position: fixed;
  background: #fff;
  border-bottom: 1px solid #d6d6d6;
  box-shadow: 0 6px 15px 0 rgba(0, 0, 0, .02);
}
@media screen and (min-width: 768px) {
  .bp-header-container {
    height: 70px;
  }
  .bp-header-container .bp-header .bp-nav .nav-list .nav-list-item .nav-list-item-link {
    padding: 25px;
  }
  .bp-header-container .bp-header .bp-search .search-button {
    padding: 21px 15px;
  }
  .bp-header-container .bp-header .bp-account .account-button {
    padding: 26.5px 15px;
  }
  .bp-header-container .bp-header .bp-account .account-button.loggedin {
    padding: 21px 15px;
  }
  .bp-header-container .account-dropdown {
    top: 70px;
  }
}
</style>

<style>
.bp-header-container .bp-header .logo-link .bp-logo svg {
  width: 48px;
  height: 48px;
  margin: .5px 0;
}
@media screen and (min-width: 768px) {
  .bp-header-container .bp-header .logo-link .bp-logo svg {
    width: 64px;
    height: 64px;
    margin: 2.5px 0;
  }
}
</style>
