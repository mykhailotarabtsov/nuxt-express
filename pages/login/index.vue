<template>
  <main class="py-0 md:py-20 h-screen w-full md:h-auto flex items-center">
    <form @submit.prevent="login" class="bg-indigo-lightest max-w-sm w-4/5 mx-auto md:w-auto px-5 md:px-24 py-6 flex flex-col rounded shadow-md" :class="{'error': error}">
      <input v-if="!isLogin" type="text" name="firstName" placeholder="First Name" v-model="user.firstName">
      <input v-if="!isLogin" type="text" name="lastName" placeholder="Last Name" v-model="user.lastName">
      <input class="mb-4 p-1 text-sm" type="email" name="email" placeholder="Email" v-model="user.email">
      <input class="mb-4 p-1 text-sm" type="password" name="password" placeholder="Password" v-model="user.password">
      <button class="btn outline-none mb-4">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      <button class="btn outline-none" @click.prevent.stop="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</button>
    </form>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      error: false,
      isLogin: true,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['setUser']),
    setError (error) {
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 500)
    },
    async login () {
      if (this.isLogin) {
        await this.$axios.$post('/login', { email: this.user.email, password: this.user.password })
          .then(result => {
            if (result.errorMessage) {
              return this.setError(result.errorMessage)
            }
            this.setUser(result)
            this.$router.push({ path: '/' })
          })
      } else {
        await this.$axios.$post('/signup', this.user)
          .then(result => {
            if (result.errorMessage) {
              this.setError(result.errorMessage)
            } else {
              this.setUser({ ...this.user, _id: result })
              this.$router.push({ path: '/' })
            }
          })
      }
    }
  }
}
</script>

<style>

</style>
