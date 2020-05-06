<template>
  <div>
    <form @submit.prevent="register">
      <h3>Register</h3>
      <div>
        <label for="register.name">Name</label>
      <input v-model="name" type="text" name="name" id="register.name">
      </div>
      <div>
        <label for="register.email">Email</label>
        <input v-model="email" type="text" name="email" id="register.email">
      </div>
      
      <div>
        <label for="register.password">Password</label>
        <input v-model="password" type="text" name="password" id="register.password">
      </div>
      
      <div>
        <label for="register.passwordConfirmation">Password Confirmation</label>
        <input v-model="passwordConfirmation" type="text" name="passwordConfirmation" id="register.passwordConfirmation">
      </div>
      
      <button :disabled="$auth.isLoggedIn">Register</button>
    </form>
    
    <form @submit.prevent="login">
      <h3>Login</h3>
      <div>
        <label for="login.email">Email</label>
        <input v-model="email" type="text" name="email" id="login.email">
      </div>
      
      <div>
        <label for="login.password">Password</label>
        <input v-model="password" type="text" name="password" id="login.password">
      </div>
      <button :disabled="$auth.isLoggedIn">
        Login
      </button>
    </form>
    
    
    <div>
      <h3>Logout</h3>
      <button
        @click="logout"
        :disabled="!$auth.isLoggedIn"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
  	name: 'TestUser',
  	email: 'test@user.mail',
  	password: 'secret',
  	passwordConfirmation: 'secret',
  }),
  
  methods: {
  	register () {
  		if (this.$auth.isLoggedIn) return
      this.$auth.register(this.$data)
    },
    login () {
	    if (this.$auth.isLoggedIn) return
	    this.$auth.login(this.$data)
    },
    logout () {
	    this.$auth.logout()
    }
  }
}
</script>
