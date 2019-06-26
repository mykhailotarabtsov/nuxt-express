<template>
  <main class="py-20">
    <form @submit.prevent class="bg-indigo-lightest max-w-sm mx-auto px-24 py-6 flex flex-col rounded shadow-md">
      <input class="mb-4 p-1 text-sm" type="email" name="email" placeholder="Email">
      <input class="mb-4 p-1 text-sm" type="password" name="password" placeholder="Password">
      <button class="btn outline-none mb-4">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      <button class="btn outline-none" @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</button>
    </form>
  </main>
</template>

<script>
export default {
  data () {
    return {
      isLogin: true
    }
  }
}
</script>

<style>

</style>
