import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    store: {
      userId: null,
      userName: '',
      userEmail: '',
      loadedPosts: []
    },
    mutations: {
      setPosts (state, posts) {
        state.loadedPosts = posts
      },
      setUser (state, user) {
        state.userId = user._id
        state.userName = user.firstName + ' ' + user.lastName
        state.userEmail = user.email
      },
      addPost (state, post) {
        state.loadedPosts.push(post)
      },
      editPost (state, newPost) {
        const postId = newPost._id
        state.loadedPosts.map(post => {
          if (post._id === postId) {
            post.title = newPost.title
            post.description = newPost.description
            post.previewText = newPost.previexText
            post.author = newPost.author
            post.updatedDate = newPost.updatedDate || new Date()
          }
        })
      },
      deletePostFromStore (state, postId) {
        let newPosts = state.loadedPosts.filter(post => {
          return post._id !== postId
        })
        state.loadedPosts = newPosts
      }
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        return context.$axios.$get('/get-posts')
          .then(res => {
            vuexContext.commit('setPosts', res.posts)
            // vuexContext.commit('setUser', res.user)
          })
          .catch(err => context.error(err))
      },
      setUser (vuexContext, user) {
        vuexContext.commit('setUser', user)
      }
    },
    getters: {
      getError (state) {
        return state.error
      },
      loadedPosts (state) {
        return state.loadedPosts
      },
      getPost (state) {
        return (postId) => {
          return state.loadedPosts.find(post => post._id === postId)
        }
      }
    }
  })
}

export default createStore
