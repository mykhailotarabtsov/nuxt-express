import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    store: {
      loadedPosts: []
    },
    mutations: {
      setPosts (state, posts) {
        state.loadedPosts = posts
      }
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        // return context.$axios.$get('/api/posts')
        return context.$axios.$get('/get-posts')
          .then(res => {
            vuexContext.commit('setPosts', res.posts)
          })
          .catch(err => context.error(err))
      },
    },
    getters: {
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
