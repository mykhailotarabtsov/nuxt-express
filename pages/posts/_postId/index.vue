<template>
  <div class="bg-indigo-lightest py-10">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl mb-4 text-purple text-center">{{ post.title }}</h2>
      <div :style="'background-image: url(' + post.imageUrl +')'" class="post__image"></div>
      <p class="max-w-lg mx-auto text-center text-purple-darker mb-8 leading-relaxed">{{ post.description }}</p>
      <div class="flex justify-between text-sm text-purple-darkest">
        <p><span class="font-bold">Author:</span> {{ post.author }}</p>
        <p><span class="font-bold">Last Update:</span> {{ post.updatedDate | date }}</p>
      </div>
      <nuxt-link :to="'/posts/edit/' + post._id" tag="button" class="btn ml-auto mt-4">Edit</nuxt-link>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    post () {
      return this.$store.getters.getPost(this.$route.params.postId)
    }
  }
}
</script>

<style>

</style>
