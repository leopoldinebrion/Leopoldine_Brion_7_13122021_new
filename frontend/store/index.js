import axios from 'axios';
import Auth from "../services/auth";

export const state = () => ({
    user: {},
    post: {},
    posts: [],
    users: [],
})

export const getters = {
    user(state) {
        return state.user;
    },

    posts(state) {
        return state.posts;
    },

    post(state) {
      return state.post;
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },

  GET_USER(state, user) {
      state.user = user;
  },

  UPDATE_ACCOUNT(state, id, user) {
      Object.assign(
          state.user.find((elt) => elt.id === id),
          user
      );
  },

  LOG_OUT(state) {
    localStorage.removeItem('token');
    state.user = null;
  },

  CREATE_POST(state, post) {
      state.posts = [post, ...state.posts];
  },

  GET_POSTS(state, posts) {
        state.posts = posts;
  },

  GET_POST(state, post) {
    state.post = post;
  },

  UPDATE_POST(state, postId, post) {
    Object.assign(
      state.posts.find((elt) => elt.id === postId),
      post
    );
  },

  DELETE_POST (state, postId) {
    state.posts = state.posts.filter(post => post.id !== postId)
  },
}

export const actions = {

    setUser({ commit }, user) {
        commit("SET_USER", user);
    },

    getUser({ commit }) {
        const id = this.state.user.userId;
        Auth.getUser(id).then((res) => {
            const user = res.data;
            commit("GET_USER", user);
        })
    },

     updateAccount({ commit }, data) {
      const id = this.state.user.userId
      const userToken = this.state.user.token;
      if(id) {
      axios
        .put(`http://localhost:4200/api/user/account/${id}`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },       
         })
        .then((res) => {
          console.log(res)
          const newUser = res.data.user
          console.log(newUser)
          commit("SET_USER", newUser)
        })
      }
    },

    logout({ commit }) {
        commit("LOG_OUT");
    },

    createPost({ commit }, post) {
        Auth.createPost(post)
          .then((response) => {
            const post = response.data;
            commit("CREATE_POST", post);
          })
          .then(() => {
            Auth.getPosts().then((response) => {
              const posts = response.data;
              commit("GET_POSTS", posts);
            });
          });
      },

      getPosts({ commit }) {
        Auth.getPosts().then((response) => {
          const posts = response.data;
          commit("GET_POSTS", posts);
        });
      },

      getPost({ commit }, id) {
            axios.get(`http://localhost:4200/api/post/${id}`)
                .then((response) => {
                    commit('GET_POST', response.data);
                })
    },

      updatePost({commit}, postId, data) {
        const userToken = this.state.user.token;
        axios
          .put(`http://localhost:4200/api/post/${postId}`, data, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },       
           })
          .then((response) => {
            console.log(response.data)
            commit('GET_POST', response.data)
          })
      },

      deletePost({commit}, postId) {
        Auth.delete().then(() => {
          commit("DELETE_POST", postId);
        })
      },
}