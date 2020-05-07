<template>
  <div>
    <form @submit.prevent="register">
      <h3>Register</h3>
      <div
        v-for="error in registerForm.errors"
        :key="JSON.stringify(error)"
        style="color:red;"
      >
        {{ error[0] }}
      </div>
      <div>
        <label for="register.name">Name</label>
        <input
          id="register.name"
          v-model="registerForm.name"
          type="text"
          name="name"
        >
      </div>
      <div>
        <label for="register.email">Email</label>
        <input
          id="register.email"
          v-model="registerForm.email"
          type="text"
          name="email"
        >
      </div>

      <div>
        <label for="register.password">Password</label>
        <input
          id="register.password"
          v-model="registerForm.password"
          type="text"
          name="password"
        >
      </div>

      <div>
        <label for="register.passwordConfirmation">Password Confirmation</label>
        <input
          id="register.passwordConfirmation"
          v-model="registerForm.passwordConfirmation"
          type="text"
          name="passwordConfirmation"
        >
      </div>

      <button :disabled="isLoggedIn">
        Register
      </button>
    </form>

    <form @submit.prevent="login">
      <h3>Login</h3>
      <div
        v-for="error in loginForm.errors"
        :key="JSON.stringify(error)"
        style="color:red;"
      >
        {{ error[0] }}
      </div>

      <div>
        <label for="login.email">Email</label>
        <input
          id="login.email"
          v-model="loginForm.email"
          type="text"
          name="email"
        >
      </div>

      <div>
        <label for="login.password">Password</label>
        <input
          id="login.password"
          v-model="loginForm.password"
          type="text"
          name="password"
        >
      </div>
      <button :disabled="isLoggedIn">
        Login
      </button>
    </form>

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
  data: () => ({
    registerForm: {
      errors: null,
      name: 'TestUser',
      email: 'test@user.mail',
      password: 'secret',
      passwordConfirmation: 'secret'
    },
    loginForm: {
      errors: null,
      email: 'test@user.mail',
      password: 'secret'
    },
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
    register () {
      if (this.$auth.isLoggedIn) { return }
      this.registerForm.errors = null
      this.$auth.register(this.registerForm)
        .catch((e) => {
          if (e.name === 'ValidationError') {
            this.registerForm.errors = e.getErrors()
          }
        })
    },

    login () {
      if (this.$auth.isLoggedIn) { return }
      this.loginForm.errors = null
      this.$auth.login(this.loginForm)
        .catch((e) => {
          if (e.name === 'ValidationError') {
            this.loginForm.errors = e.getErrors()
          }
        })
    },

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
