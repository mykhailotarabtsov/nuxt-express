<template>
  <nuxt-link :to="'/posts/' + post._id" class="post bg-indigo-lightest border border-indigo-lighter p-2 rounded mb-4 mx-2 shadow-md">
    <h2 class="text-2xl mb-4 text-purple text-center">{{ post.title }}</h2>
    <div :style="'background-image: url(' + post.imageUrl + ')'" class="post__image mb-4"></div>
    <p class="text-purple-darker mb-8">{{ post.previewText }}</p>
    <div class="flex justify-between text-sm text-purple-darkest">
      <p><span class="font-bold">Author:</span> {{ post.author }}</p>
      <p><span class="font-bold">Last Update:</span> {{ post.updatedDate | date }}</p>
    </div>
    <div class="flex justify-center">
      <button class="btn mt-4 mx-4">Read...</button>
      <nuxt-link :to="'/posts/edit/' + post._id" tag="button" class="btn mt-4 mx-4">Edit</nuxt-link>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['post']
}
</script>

