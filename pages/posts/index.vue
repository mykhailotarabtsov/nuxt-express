<template>
  <main class="px-4">
    <posts-list :posts="loadedPosts" />
  </main>
</template>

<script>
import PostsList from '@/components/Posts/PostsList'

export default {
  components: {
    PostsList
  },
  computed: {
    loadedPosts () {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style>

</style>
