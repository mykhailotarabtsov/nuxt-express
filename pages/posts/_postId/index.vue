<template>
  <div class="bg-indigo-lightest py-10 px-5">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl mb-4 text-purple text-center">{{ post.title }}</h2>
      <div :style="'background-image: url(' + post.imageUrl +')'" class="post__image"></div>
      <p class="max-w-lg mx-auto text-center text-purple-darker mb-8 leading-relaxed">{{ post.description }}</p>
      <div class="flex justify-between text-sm text-purple-darkest">
        <p><span class="font-bold">Author:</span> {{ post.author }}</p>
        <p><span class="font-bold">Last Update:</span> {{ post.updatedDate | date }}</p>
      </div>
      <div class="flex justify-center">
        <button @click="deletePost" class="btn mt-4 mx-2">Delete</button>
        <nuxt-link :to="'/posts/edit/' + post._id" tag="button" class="btn mt-4 mx-2">Edit</nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      post: []
    }
  },
  methods: {
    ...mapMutations (['deletePostFromStore']),
    async deletePost () {
      await this.$axios.$post('/posts/delete-one', { postId: this.$route.params.postId })
        .then(result => {
          this.deletePostFromStore (this.$route.params.postId)
          this.$router.push({ path: '/posts' })
        })
    }
  },
  created () {
    this.post = this.$store.getters.getPost(this.$route.params.postId)
  }
}
</script>

<style>

</style>
