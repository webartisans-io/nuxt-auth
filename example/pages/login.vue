<template>
  <div>
    <nuxt-link :to="{path:'/'}">Home</nuxt-link>
    <nuxt-link :to="{path:'/secret'}">Secret</nuxt-link>
    <nuxt-link :to="{path:'/login'}">Login</nuxt-link>
    <nuxt-link :to="{path:'/register'}">Register</nuxt-link>
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
  </div>
</template>

<script>
export default {
	middleware: 'auth',
  
  auth: 'guest',
 
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
