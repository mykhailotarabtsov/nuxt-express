<template>
  <main class="p-4 mt-4">
    <h1 class="text-center mb-6 text-purple-dark">Add new Post</h1>
    <form action="/posts/add-post" method="POST" class="flex flex-col w-1/2 mx-auto">
      <input class="mb-4 p-2" type="text" name="title" placeholder="Title">
      <input class="mb-4 p-2" type="text" name="imageUrl" placeholder="image">
      <textarea class="mb-4 resize-none" name="description" cols="30" rows="10" placeholder="Description"></textarea>
      <input class="mb-4 p-2" type="text" name="author" placeholder="Author">
      <button class="btn" type="submit">Add Post</button>
    </form>
  </main>
</template>

<style>

</style>
