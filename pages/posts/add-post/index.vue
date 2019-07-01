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

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="editor__content">
      <div class="flex mb-4">
        <button class="tiptap-btn" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
          H1
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
          H2
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
          H3
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph()">
          P
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          Bold
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          Italic
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
          Strike
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
          Underline
        </button>
        <button
          class="tiptap-btn"
          @click="showImagePrompt(commands.image)"
        >
          Image
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
          Bullet List
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">
          Block Quote
        </button>
        <button class="tiptap-btn" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
          Code Block
        </button>
        <button class="tiptap-btn ml-auto"  @click="commands.code_block">
          Send New Post
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content max-w-lg mx-auto" :editor="editor" />

  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold, Italic, Strike, Underline, Image, HardBreak, Heading, BulletList, ListItem, Blockquote, CodeBlock } from 'tiptap-extensions'

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
          new Strike(),
          new Underline(),
          new Image(),
          new HardBreak(),
          new ListItem(),
          new BulletList(),
          new Blockquote(),
          new CodeBlock(),
          new Heading({ levels: [1, 2, 3] })
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
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
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
    this.editor.destroy()
  },
}
</script>


<style>

</style>
