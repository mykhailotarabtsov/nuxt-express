<template>
  <nuxt-link :to="'/posts/' + post._id" class="relative post bg-indigo-lightest border border-indigo-lighter p-2 rounded mb-4 mx-2 shadow-md">
    <h2 class="text-2xl mb-4 text-purple text-center">{{ post.title }}</h2>
    <div :style="'background-image: url(' + post.imageUrl + ')'" class="post__image mb-4"></div>
    <p class="text-purple-darker mb-8">{{ post.previewText }}</p>
    <div class="flex justify-between text-sm text-purple-darkest">
      <p class="text-left"><span class="font-bold">Author:</span> {{ post.author }}</p>
      <p class="text-right"><span class="font-bold">Last Update:</span> {{ post.updatedDate | date }}</p>
    </div>
    <div class="flex justify-center">
      <button class="btn mt-4 mx-4">Read...</button>
      <button @click.stop.prevent="edit" class="btn mt-4 mx-4">Edit</button>
    </div>
    <Error :error="error" />
  </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'
import Error from '@/components/Error/Error'

export default {
  props: ['post'],
  components: {
    Error
  },
  data () {
    return {
      error: ''
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  methods: {
    edit () {
      if (this.userId === this.post.userId) {
        this.$router.push({ path: '/posts/edit/' + this.post._id })
      } else {
        this.error = '[Error] - You are not author of this post!'
        setTimeout(() => {
          this.error = ''
        }, 2000)
      }
    }
  }
}
</script>

