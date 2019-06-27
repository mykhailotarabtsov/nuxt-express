<template>
  <main class="py- px-5 mt-4">
    <h1 class="text-center mb-6 text-purple-dark">Add new Post</h1>
    <form class="flex flex-col md:w-1/2 mx-auto">
      <input class="mb-4 p-2" type="text" name="title" placeholder="Title" v-model="post.title">
      <input class="mb-4 p-2" type="text" name="imageUrl" placeholder="image" v-model="post.imageUrl">
      <textarea class="mb-4 resize-none" name="description" cols="30" rows="10" placeholder="Description" v-model="post.description"></textarea>
      <textarea class="mb-4 resize-none" name="previewText" cols="30" rows="10" placeholder="Preview Text" v-model="post.previewText"></textarea>
      <button class="btn" @click.prevent="updatePost">Update Post</button>
    </form>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  middleware: 'protect',
  data () {
    return {
      post: {
        title: '',
        imageUrl: '',
        description: '',
        previewText: '',
        updatedDate: ''
      }
    }
  },
  computed: {
    ...mapState({
      userName: state => state.userName
    })
  },
  methods: {
    ...mapMutations([
      'editPost'
    ]),
    async updatePost () {
      this.post.author = this.userName
      await this.$axios.$post('/posts/edit-post', {editId: this.$route.params.editId, ...this.post})
        .then(result => {
          this.editPost({editId: this.$route.params.editId, ...this.post})
          this.$router.push({ path: '/posts' })
        })
    }
  },
  created () {
    this.post = this.$store.getters.getPost(this.$route.params.editId)
  }
}
</script>

<style>

</style>
