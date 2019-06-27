<template>
  <main class="py-20">
    <form @submit.prevent="login" class="bg-indigo-lightest max-w-sm mx-auto px-24 py-6 flex flex-col rounded shadow-md">
      <input v-if="!isLogin" type="text" name="firstName" placeholder="First Name" v-model="user.firstName">
      <input v-if="!isLogin" type="text" name="lastName" placeholder="Last Name" v-model="user.lastName">
      <input class="mb-4 p-1 text-sm" type="email" name="email" placeholder="Email" v-model="user.email">
      <input class="mb-4 p-1 text-sm" type="password" name="password" placeholder="Password" v-model="user.password">
      <button class="btn outline-none mb-4">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      <button class="btn outline-none" @click.prevent.stop="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</button>
    </form>
    <transition name="fade">
      <div v-if="error" style="bottom: 0;" class="absolute w-full p-6 bg-red-light">
        <p class='text-center text-red-darker'>{{ error }}</p>
      </div>
    </transition>

  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      error: '',
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
    ...mapActions(['setUser','setError']),
    // ...mapMutations(['setError']),
    setError (error) {
      this.error = error
      setTimeout(() => {
        this.error = ''
      }, 2000)
    },
    async login () {
      if (this.isLogin) {
        await this.$axios.$post('/login', { email: this.user.email, password: this.user.password })
          .then(result => {
            this.setUser(result)
            this.$router.push({ path: '/' })
          })
      } else {
        await this.$axios.$post('/signup', this.user)
          .then(result => {
            if (result.errorMessage) {
              this.setError(result.errorMessage)
            } else {
              console.log('not result message')
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
