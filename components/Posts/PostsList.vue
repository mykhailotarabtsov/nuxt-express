<template>
  <section class="flex py-4 justify-center flex-wrap">
    <Post v-for="post in posts" :key="post._id" :post="post" />
  </section>
</template>

<script>
import Post from '@/components/Posts/Post'
export default {
  props: ['posts'],
  components: {
    Post
  }
}
</script>

