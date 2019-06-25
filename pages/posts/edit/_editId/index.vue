<template>
  <main class="p-4 mt-4">
    <h1 class="text-center mb-6 text-purple-dark">Add new Post</h1>
    <form class="flex flex-col w-1/2 mx-auto">
      <input class="mb-4 p-2" type="text" name="title" placeholder="Title" v-model="post.title">
      <input class="mb-4 p-2" type="text" name="imageUrl" placeholder="image" v-model="post.imageUrl">
      <textarea class="mb-4 resize-none" name="description" cols="30" rows="10" placeholder="Description" v-model="post.description"></textarea>
      <textarea class="mb-4 resize-none" name="previewText" cols="30" rows="10" placeholder="Preview Text" v-model="post.previewText"></textarea>
      <input class="mb-4 p-2" type="text" name="author" placeholder="Author" v-model="post.author">
      <button class="btn" @click.prevent="updatePost">Update Post</button>
    </form>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      post: {
        title: '',
        imageUrl: '',
        description: '',
        previewText: '',
        author: '',
        updatedDate: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'editPost'
    ]
    ),
    async updatePost () {
      await this.$axios.$post('/posts/edit-post', {editId: this.$route.params.editId, ...this.post})
        .then(result => {
          this.editPost({_id: this.$route.params.editId, ...this.post})
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
