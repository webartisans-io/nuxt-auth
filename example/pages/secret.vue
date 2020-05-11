<template>
  <div>
    
    <nuxt-link :to="{path:'/'}">Home</nuxt-link>
    <nuxt-link :to="{path:'/secret'}">Secret</nuxt-link>
    <nuxt-link :to="{path:'/login'}">Login</nuxt-link>
    <nuxt-link :to="{path:'/register'}">Register</nuxt-link>
    <div>
      <h3>Logout</h3>
      <div
        v-for="error in logoutForm.errors"
        :key="JSON.stringify(error)"
        style="color: red;"
      >
        {{ error[0] }}
      </div>
      <button
        :disabled="isGuest"
        @click="logout"
      >
        Logout
      </button>
    </div>
    <div>
      <h3>Refresh Token</h3>
      <div
        v-for="error in logoutForm.errors"
        :key="JSON.stringify(error)"
        style="color: red;"
      >
        {{ error[0] }}
      </div>
      <button
        :disabled="isGuest"
        @click="refresh"
      >
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
export default {
	middleware: 'auth',
  
  data: () => ({
    logoutForm: {
      errors: null
    },
    refreshForm: {
      errors: null
    }
  }),
  computed: {
    isLoggedIn () {
      return this.$auth.isLoggedIn
    },
    isGuest () {
      return this.$auth.isGuest
    }
  },

  methods: {
    logout () {
      this.logoutForm.errors = null
      this.$auth.logout()
        .catch((e) => {
          if (e.name === 'ValidationError') {
            this.logoutForm.errors = e.getErrors()
          }
        })
    },

    refresh () {
      this.refreshForm.errors = null
      this.$auth.refreshToken()
        .catch((e) => {
          if (e.name === 'ValidationError') {
            this.refreshForm.errors = e.getErrors()
          }
        })
    }
  }
}
</script>
