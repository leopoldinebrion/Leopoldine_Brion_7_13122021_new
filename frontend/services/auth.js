import api from "../services/api";

export default {
  signup(data) {
    return api().post("/user/signup", data);
  },
  login(data) {
    return api().post("user/login", data);
  },
  deleteAccount(id) {
    return api().delete("user/account/" + id);
  },

  getUsers() {
    return api().get("user/account");
  },
  getUser(id) {
    return api().get("user/account/" + id);
  },

  createPost(data) {
    return api().post("post", data);
  },

  getPosts() {
    return api().get("post");
  },

  getPost(postId) {
    return api().get("post/" + postId);
  },

  updatePost(postId) {
    return api().put("post/" + postId)
  },

  delete(postId) {
    return api().delete("post/" + postId);
  },
};