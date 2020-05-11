<template>
  <div>
    <nuxt-link :to="{path:'/'}">Home</nuxt-link>
    <nuxt-link :to="{path:'/secret'}">Secret</nuxt-link>
    <nuxt-link :to="{path:'/login'}">Login</nuxt-link>
    <nuxt-link :to="{path:'/register'}">Register</nuxt-link>
    
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
		}
	}
}
</script>
