<template>
  <nav class="bg-orange">
    <ul style="list-style: none;" class=" max-w-2xl mx-auto flex px-4">
      <li><nuxt-link to="/" class="block py-4 px-2 text-sm md:text-base md:px-3">Home</nuxt-link></li>
      <li><nuxt-link to="/posts" class="block py-4 px-2 text-sm md:text-base md:px-3">Posts</nuxt-link></li>
      <li><nuxt-link to="/posts/add-post" class="block py-4 px-2 text-sm md:text-base md:px-3">Add Post</nuxt-link></li>
      <li class="ml-auto"><nuxt-link to="/login" class="block py-4 px-2 text-sm md:text-base md:px-3">Login/Signin</nuxt-link></li>
    </ul>
  </nav>
</template>
