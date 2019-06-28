<template>
  <nuxt-link :to="'/posts/' + post._id" class="relative post bg-indigo-lightest border border-indigo-lighter p-2 rounded mb-4 mx-2 shadow-md" :class="{'error': error}">
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
  </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['post'],
  data () {
    return {
      error: false
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
        this.error = true;
        setTimeout(() => {
          this.error = false
        }, 500)
      }
    }
  }
}
</script>

