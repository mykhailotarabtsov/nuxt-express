<template>
  <transition name="fade">
    <div v-if="error" style="bottom: 0; left: 0;" class="absolute w-full p-6 bg-red-light">
      <p class='text-center text-red-darker'>{{ error }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['error']
}
</script>

