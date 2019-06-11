<template>
  <div class="bg-indigo-lightest p-4">
    <h2 class="text-2xl mb-4 text-purple text-center">{{ post.title }}</h2>
    <div :style="'background-image: url(' + post.imageUrl +')'" class="post__image mb-4"></div>
    <p class="text-purple-darker mb-8 leading-relaxed">{{ post.description }}</p>
    <div class="flex justify-between text-sm text-purple-darkest">
      <p><span class="font-bold">Author:</span> {{ post.author }}</p>
      <p><span class="font-bold">Last Update:</span> {{ post.updatedDate | date }}</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      // post: []
    }
  },
  computed: {
    post () {
      return this.$store.getters.getPost(this.$route.params.postId)
    }
  },
  // methods: {
  //   ...mapGetters([
  //     'getPost'
  //   ]),
  //   getPostFromState () {
  //     // console.log(this.$store.getters.loadedPosts);
  //     // console.log(this.$route.params.postId)
  //     this.post = this.getPost(this.$route.params.postId)
  //     console.log(this.post);
  //   }
  // },
  // created () {
  //   this.getPostFromState()
  // }
}
</script>

<style>

</style>
