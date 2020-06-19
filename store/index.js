import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

const state = () => ({
  loadedPost: [],
  token: null
});

const mutations = {
  setPosts(state, posts) {
    state.loadedPost = posts;
  },
  addPost(state, post) {
    state.loadedPost.unshift(post);
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPost.findIndex(
      post => post.id === editedPost.id
    );
    state.loadedPost[postIndex] = editedPost;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get("https://nuxt-blog-f6af5.firebaseio.com/posts.json")
      .then(res => {
        const postArray = [];
        for (const key in res.data) {
          postArray.push({ ...res.data[key], id: key });
        }
        vuexContext.commit("setPosts", postArray);
      })
      .catch(e => context.error(e));
  },
  setPosts({ commit }, posts) {
    commit("setPosts", posts);
  },
  addPost(vuexContext, post) {
    const createPost = {
      ...post,
      updateDate: new Date()
    };
    return axios
      .post(
        "https://nuxt-blog-f6af5.firebaseio.com/posts.json?auth=" +
          vuexContext.state.token,
        createPost
      )
      .then(res =>
        vuexContext.commit("addPost", { ...createPost, id: res.data.name })
      )
      .catch(e => console.log(e));
  },
  editPost(vuexContext, editedPost) {
    return axios
      .put(
        "https://nuxt-blog-f6af5.firebaseio.com/posts/" +
          editedPost.id +
          ".json?auth=" +
          vuexContext.state.token,
        editedPost
      )
      .then(res => vuexContext.commit("editPost", editedPost))
      .catch(e => console.log(e));
  },
  authenticateUser(vuexContext, authDate) {
    let authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.fbAPIKey;
    if (!authDate.isLogin) {
      authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.fbAPIKey;
    }
    return axios
      .post(authUrl, {
        email: authDate.email,
        password: authDate.password,
        returnSecureToken: true
      })
      .then(result => {
        vuexContext.commit("setToken", result.data.idToken);
        localStorage.setItem("token", result.data.idToken);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
        );
        Cookie.set("jwt", result.idToken);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
        );
        return axios.post("http://localhost:3000/api/trac-data", {
          data: "Authentocated!"
        });
      })
      .catch(e => console.log(e));
  },
  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    if (req) {
      if (!res.header.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(c => c.trim().startWith("expirationDate="))
        .split("=")[1];
    } else if (process.client) {
      token = localStorage.getItem("token");
      expirationDate = localStorage.getItem("tokenExpiraton");
    }
    if (new Date().getTime() > +expirationDate || !token) {
      // vuexContext.dispatch("logout");
      return;
    }
    vuexContext.commit("setToken", token);
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("exprationDate");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpriation");
    }
  }
};

const getters = {
  loadedPosts: state => state.loadedPost,
  isAuthenticated: state => state.token != null
};

export default {
  state,
  mutations,
  actions,
  getters,
  Vuex
};
