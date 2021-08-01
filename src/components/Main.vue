<template lang="pug">
.bp-main-continer
  section.main-top-section
    p Spring Social Login
    p(v-if='isLoggedIn') username {{ username }}
    p(v-if='isLoggedIn') role: {{ roleType }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  computed: {
    ...mapGetters(['token', 'user']),
    isLoggedIn () {
      return this.token != null
    },
    isAdmin () {
      return this.user && this.user.roleType === 'ADMIN'
    },
    username () {
      if (!this.user) return ''
      return this.user.username
    },
    roleType () {
      if (!this.user) return ''
      return this.user.roleType
    }
  }
}
</script>

<style scoped>
.bp-main-continer .main-top-section {
  width: 100%;
  height: 320px;
  padding-top: 5rem;
}

@media screen and (min-width: 768px) {
  .bp-main-continer .main-top-section .slogan-container {
    padding-top: 70px;
  }
}
</style>
