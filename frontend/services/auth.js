import api from "../services/api";

export default {

  getUser(id) {
    return api().get("user/account/" + id);
  },

  createPost(data) {
    return api().post("post", data);
  },

  getPosts() {
    return api().get("post");
  },
};