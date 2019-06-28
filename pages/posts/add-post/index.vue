<template>
  <main class="py-4 px-5 mt-4">
    <h1 class="text-center mb-6 text-purple-dark">Add new Post</h1>
    <!-- <form class="flex flex-col md:w-1/2 mx-auto">
      <input class="mb-4 p-2" type="text" name="title" placeholder="Title" v-model="post.title">
      <input class="mb-4 p-2" type="text" name="imageUrl" placeholder="image"  v-model="post.imageUrl">
      <textarea class="mb-4 resize-none" name="description" cols="30" rows="10" placeholder="Description" v-model="post.description"></textarea>
      <textarea class="mb-4 resize-none" name="previewText" cols="30" rows="10" placeholder="Preview Text" v-model="post.previewText"></textarea> -->
      <!-- <input class="mb-4 p-2" type="text" name="author" placeholder="Author" v-model="post.author"> -->
      <!-- <button class="btn" @click.prevent="sendForm">Add Post</button>
    </form> -->

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="flex mb-4">
        <button class="tiptap-btn" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          Bold
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          Italic
        </button>
      </div>
    </editor-menu-bar>

    <editor-content :editor="editor" />

  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold, Italic, Link, HardBreak, Heading } from 'tiptap-extensions'

export default {
  middleware: 'protect',
  components: {
    EditorContent,
    EditorMenuBar
  },
  data () {
    return {
      editor: new Editor({
        content: '<p>This is just a boring paragraph</p>',
        extensions: [
          new Bold(),
          new Italic(),
          new Link(),
          new HardBreak(),
          new Heading()
        ],
        onUpdate: ({ getHTML }) => {
          // get new content on update
          this.newPost = getHTML()
        },
      }),
      newPost: [],
      post: {
        title: '',
        imageUrl: '',
        description: '',
        previewText: '',
        author: '',
        _id: ''
      }
    }
  },
  computed: {
    ...mapState({
      userName: state => state.userName,
      userId: state => state.userId
    })
  },
  methods: {
    ...mapMutations(['addPost']),
    async sendForm () {
      this.post.author = this.userName
      this.post._id = this.userId
      await this.$axios.$post('/posts/add-post', this.post)
        .then(result => {
          this.addPost({...this.post, _id: result._id, updatedDate: new Date()})
          this.$router.push({ path: '/posts' })
        })

    }
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy()
  },
}
</script>


<style>

</style>
